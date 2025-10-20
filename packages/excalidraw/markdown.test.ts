import { describe, it, expect } from "vitest";
import {
  parseInlineMarkdown,
  parseLineMarkdown,
  hasMarkdownFormatting,
} from "./markdown";

describe("Markdown utilities", () => {
  describe("hasMarkdownFormatting", () => {
    it("should detect bold formatting", () => {
      expect(hasMarkdownFormatting("**bold text**")).toBe(true);
      expect(hasMarkdownFormatting("__bold text__")).toBe(true);
    });

    it("should detect italic formatting", () => {
      expect(hasMarkdownFormatting("*italic text*")).toBe(true);
      expect(hasMarkdownFormatting("_italic text_")).toBe(true);
    });

    it("should detect strikethrough formatting", () => {
      expect(hasMarkdownFormatting("~~strikethrough~~")).toBe(true);
    });

    it("should detect underline formatting", () => {
      expect(hasMarkdownFormatting("<u>underline</u>")).toBe(true);
    });

    it("should detect headings", () => {
      expect(hasMarkdownFormatting("# Heading 1")).toBe(true);
      expect(hasMarkdownFormatting("## Heading 2")).toBe(true);
    });

    it("should detect lists", () => {
      expect(hasMarkdownFormatting("- List item")).toBe(true);
      expect(hasMarkdownFormatting("* List item")).toBe(true);
      expect(hasMarkdownFormatting("+ List item")).toBe(true);
      expect(hasMarkdownFormatting("1. List item")).toBe(true);
    });

    it("should return false for plain text", () => {
      expect(hasMarkdownFormatting("plain text")).toBe(false);
    });
  });

  describe("parseInlineMarkdown", () => {
    it("should parse bold text", () => {
      const segments = parseInlineMarkdown("This is **bold** text");
      expect(segments).toHaveLength(3);
      expect(segments[0].text).toBe("This is ");
      expect(segments[1].text).toBe("bold");
      expect(segments[1].bold).toBe(true);
      expect(segments[2].text).toBe(" text");
    });

    it("should parse italic text", () => {
      const segments = parseInlineMarkdown("This is *italic* text");
      expect(segments).toHaveLength(3);
      expect(segments[1].text).toBe("italic");
      expect(segments[1].italic).toBe(true);
    });

    it("should parse strikethrough text", () => {
      const segments = parseInlineMarkdown("This is ~~strikethrough~~ text");
      expect(segments).toHaveLength(3);
      expect(segments[1].text).toBe("strikethrough");
      expect(segments[1].strikethrough).toBe(true);
    });

    it("should parse underline text", () => {
      const segments = parseInlineMarkdown("This is <u>underlined</u> text");
      expect(segments).toHaveLength(3);
      expect(segments[1].text).toBe("underlined");
      expect(segments[1].underline).toBe(true);
    });

    it("should parse multiple formats", () => {
      const segments = parseInlineMarkdown("Some **bold text** and some *italic text*");
      expect(segments.length).toBeGreaterThan(0);
      // Find bold segment
      const boldSegment = segments.find((s) => s.bold);
      expect(boldSegment).toBeDefined();
      expect(boldSegment?.text).toBe("bold text");
      // Find italic segment  
      const italicSegment = segments.find((s) => s.italic);
      expect(italicSegment).toBeDefined();
      expect(italicSegment?.text).toBe("italic text");
    });

    it("should return single segment for plain text", () => {
      const segments = parseInlineMarkdown("plain text");
      expect(segments).toHaveLength(1);
      expect(segments[0].text).toBe("plain text");
      expect(segments[0].bold).toBeUndefined();
      expect(segments[0].italic).toBeUndefined();
    });
  });

  describe("parseLineMarkdown", () => {
    it("should parse headings", () => {
      const result = parseLineMarkdown("# Heading 1");
      expect(result.heading).toBe(1);
      expect(result.segments[0].text).toBe("Heading 1");
      expect(result.segments[0].heading).toBe(1);
    });

    it("should parse multiple levels of headings", () => {
      const result1 = parseLineMarkdown("## Heading 2");
      expect(result1.heading).toBe(2);

      const result2 = parseLineMarkdown("###### Heading 6");
      expect(result2.heading).toBe(6);
    });

    it("should parse unordered lists", () => {
      const result = parseLineMarkdown("- List item");
      expect(result.listItem).toBe(true);
      expect(result.listLevel).toBe(0);
      expect(result.segments[0].text).toBe("List item");
      expect(result.segments[0].listItem).toBe(true);
    });

    it("should parse ordered lists", () => {
      const result = parseLineMarkdown("1. List item");
      expect(result.listItem).toBe(true);
      expect(result.segments[0].text).toBe("List item");
    });

    it("should parse nested lists", () => {
      const result = parseLineMarkdown("  - Nested list item");
      expect(result.listItem).toBe(true);
      expect(result.listLevel).toBe(1);
    });

    it("should parse heading with inline formatting", () => {
      const result = parseLineMarkdown("# **Bold** heading");
      expect(result.heading).toBe(1);
      expect(result.segments).toHaveLength(2);
      expect(result.segments[0].text).toBe("Bold");
      expect(result.segments[0].bold).toBe(true);
      expect(result.segments[0].heading).toBe(1);
    });

    it("should parse list with inline formatting", () => {
      const result = parseLineMarkdown("- *Italic* item");
      expect(result.listItem).toBe(true);
      expect(result.segments[0].text).toBe("Italic");
      expect(result.segments[0].italic).toBe(true);
      expect(result.segments[0].listItem).toBe(true);
    });
  });
});
