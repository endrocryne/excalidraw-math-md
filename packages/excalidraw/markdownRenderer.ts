/**
 * Canvas markdown renderer for text elements
 */

import type { ExcalidrawTextElement } from "./element/types";
import { getFontString } from "./utils";
import { getLineHeightInPx } from "./element/textElement";
import { parseLineMarkdown, hasMarkdownFormatting } from "./markdown";

/**
 * Render text with markdown formatting on a canvas
 */
export const renderMarkdownText = (
  context: CanvasRenderingContext2D,
  element: ExcalidrawTextElement,
  horizontalOffset: number,
  verticalOffset: number,
): void => {
  const lines = element.text.replace(/\r\n?/g, "\n").split("\n");
  const lineHeightPx = getLineHeightInPx(element.fontSize, element.lineHeight);
  const baseFontSize = element.fontSize;
  const baseFontFamily = element.fontFamily;

  lines.forEach((line, lineIndex) => {
    const lineY = lineIndex * lineHeightPx + verticalOffset;

    // Check if line has markdown
    if (!hasMarkdownFormatting(line)) {
      // No markdown, render normally
      context.fillText(line, horizontalOffset, lineY);
      return;
    }

    // Parse markdown for this line
    const { segments, listItem, listLevel } = parseLineMarkdown(line);

    let currentX = horizontalOffset;

    // Add list bullet/number offset
    if (listItem) {
      const indent = (listLevel || 0) * 20;
      currentX += indent;

      // Draw bullet point
      const bulletText = "• ";
      context.fillText(bulletText, currentX - 10, lineY);
    }

    segments.forEach((segment) => {
      // Apply formatting
      let fontSize = baseFontSize;
      let fontWeight = "normal";
      let fontStyle = "normal";

      // Heading size
      if (segment.heading) {
        fontSize = baseFontSize * (2 - (segment.heading - 1) * 0.2);
      }

      // Bold
      if (segment.bold) {
        fontWeight = "bold";
      }

      // Italic
      if (segment.italic) {
        fontStyle = "italic";
      }

      // Build font string
      const fontString = `${fontStyle} ${fontWeight} ${fontSize}px ${baseFontFamily}`;
      context.font = fontString;

      // Measure text width for positioning
      const metrics = context.measureText(segment.text);
      const textWidth = metrics.width;

      // Draw the text
      context.fillText(segment.text, currentX, lineY);

      // Apply underline
      if (segment.underline) {
        context.save();
        context.beginPath();
        context.moveTo(currentX, lineY + 2);
        context.lineTo(currentX + textWidth, lineY + 2);
        context.strokeStyle = context.fillStyle;
        context.lineWidth = Math.max(1, fontSize / 16);
        context.stroke();
        context.restore();
      }

      // Apply strikethrough
      if (segment.strikethrough) {
        context.save();
        context.beginPath();
        const strikeY = lineY - fontSize * 0.3;
        context.moveTo(currentX, strikeY);
        context.lineTo(currentX + textWidth, strikeY);
        context.strokeStyle = context.fillStyle;
        context.lineWidth = Math.max(1, fontSize / 16);
        context.stroke();
        context.restore();
      }

      // Move x position for next segment
      currentX += textWidth;

      // Reset font for next iteration
      context.font = getFontString(element);
    });
  });
};

/**
 * Check if we should use markdown rendering for this element
 */
export const shouldRenderMarkdown = (
  element: ExcalidrawTextElement,
): boolean => {
  return hasMarkdownFormatting(element.text);
};
