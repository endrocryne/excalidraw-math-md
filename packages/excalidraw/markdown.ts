/**
 * Markdown utilities for text element rendering
 * Supports: bold, italic, underline, strikethrough, headings, and lists
 */

export interface MarkdownSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  heading?: number; // 1-6 for h1-h6
  listItem?: boolean;
  listLevel?: number;
}

/**
 * Parse inline markdown formatting (bold, italic, underline, strikethrough)
 * Returns an array of text segments with their formatting flags
 */
export const parseInlineMarkdown = (text: string): MarkdownSegment[] => {
  const segments: MarkdownSegment[] = [];
  let currentPos = 0;

  // Regular expressions for inline markdown
  // Bold: **text** or __text__
  // Italic: *text* or _text_
  // Strikethrough: ~~text~~
  // Underline: <u>text</u> (HTML-style, as markdown doesn't have native underline)

  const patterns = [
    { regex: /\*\*(.+?)\*\*/g, format: "bold" },
    { regex: /__(.+?)__/g, format: "bold" },
    { regex: /\*(.+?)\*/g, format: "italic" },
    { regex: /_(.+?)_/g, format: "italic" },
    { regex: /~~(.+?)~~/g, format: "strikethrough" },
    { regex: /<u>(.+?)<\/u>/g, format: "underline" },
  ];

  // Find all matches across all patterns
  const allMatches: Array<{
    index: number;
    length: number;
    text: string;
    format: string;
  }> = [];

  patterns.forEach(({ regex, format }) => {
    let match;
    const r = new RegExp(regex.source, regex.flags);
    while ((match = r.exec(text)) !== null) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        text: match[1],
        format,
      });
    }
  });

  // Sort matches by position
  allMatches.sort((a, b) => a.index - b.index);

  // Build segments
  allMatches.forEach((match) => {
    // Add plain text before this match
    if (match.index > currentPos) {
      segments.push({
        text: text.substring(currentPos, match.index),
      });
    }

    // Add formatted text
    const segment: MarkdownSegment = { text: match.text };
    if (match.format === "bold") {
      segment.bold = true;
    }
    if (match.format === "italic") {
      segment.italic = true;
    }
    if (match.format === "underline") {
      segment.underline = true;
    }
    if (match.format === "strikethrough") {
      segment.strikethrough = true;
    }
    segments.push(segment);

    currentPos = match.index + match.length;
  });

  // Add remaining plain text
  if (currentPos < text.length) {
    segments.push({
      text: text.substring(currentPos),
    });
  }

  return segments.length > 0 ? segments : [{ text }];
};

/**
 * Parse a line of text for markdown features including headings and lists
 */
export const parseLineMarkdown = (
  line: string,
): {
  segments: MarkdownSegment[];
  heading?: number;
  listItem?: boolean;
  listLevel?: number;
} => {
  let processedLine = line;
  let heading: number | undefined;
  let listItem = false;
  let listLevel = 0;

  // Check for headings (# to ######)
  const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
  if (headingMatch) {
    heading = headingMatch[1].length;
    processedLine = headingMatch[2];
  }

  // Check for unordered lists (-, *, +)
  const unorderedListMatch = line.match(/^(\s*)[-*+]\s+(.+)$/);
  if (unorderedListMatch) {
    listItem = true;
    listLevel = Math.floor(unorderedListMatch[1].length / 2);
    processedLine = unorderedListMatch[2];
  }

  // Check for ordered lists (1., 2., etc.)
  const orderedListMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
  if (orderedListMatch) {
    listItem = true;
    listLevel = Math.floor(orderedListMatch[1].length / 2);
    processedLine = orderedListMatch[2];
  }

  const segments = parseInlineMarkdown(processedLine);

  // Apply line-level formatting to all segments
  if (heading || listItem) {
    segments.forEach((segment) => {
      if (heading) {
        segment.heading = heading;
      }
      if (listItem) {
        segment.listItem = true;
        segment.listLevel = listLevel;
      }
    });
  }

  return { segments, heading, listItem, listLevel };
};

/**
 * Check if text contains markdown formatting
 */
export const hasMarkdownFormatting = (text: string): boolean => {
  // Quick check for common markdown patterns
  return (
    /\*\*.*?\*\*/.test(text) || // Bold
    /__.*?__/.test(text) || // Bold
    /\*.*?\*/.test(text) || // Italic
    /_.*?_/.test(text) || // Italic
    /~~.*?~~/.test(text) || // Strikethrough
    /<u>.*?<\/u>/.test(text) || // Underline
    /^#{1,6}\s/.test(text) || // Heading
    /^\s*[-*+]\s/.test(text) || // Unordered list
    /^\s*\d+\.\s/.test(text) // Ordered list
  );
};
