# Markdown Reference Guide for Excalidraw

This guide shows all supported markdown features and how to use them in Excalidraw text boxes.

## Inline Text Formatting

### Bold Text
**Syntax:** `**text**` or `__text__`

**Examples:**
```
This is **bold text**
This is __also bold__
Mix **bold** and normal text
```

**Rendered:**
- This is **bold text**
- This is __also bold__
- Mix **bold** and normal text

---

### Italic Text
**Syntax:** `*text*` or `_text_`

**Examples:**
```
This is *italic text*
This is _also italic_
Mix *italic* and normal text
```

**Rendered:**
- This is *italic text*
- This is _also italic_
- Mix *italic* and normal text

---

### Strikethrough
**Syntax:** `~~text~~`

**Examples:**
```
This is ~~strikethrough text~~
~~Delete this~~ and keep this
Price: ~~$100~~ $50
```

**Rendered:**
- This is ~~strikethrough text~~
- ~~Delete this~~ and keep this
- Price: ~~$100~~ $50

---

### Underline
**Syntax:** `<u>text</u>`

**Examples:**
```
This is <u>underlined text</u>
<u>Important</u> information
Links look like <u>this</u>
```

**Rendered:**
- This is <u>underlined text</u>
- <u>Important</u> information
- Links look like <u>this</u>

---

## Headings

**Syntax:** `#` through `######` (1-6 hash symbols)

### Examples:
```markdown
# Heading 1 (Largest)
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6 (Smallest)
```

**Size Scale:**
- H1: 200% of base font size
- H2: 180% of base font size
- H3: 160% of base font size
- H4: 140% of base font size
- H5: 120% of base font size
- H6: 100% of base font size

---

## Lists

### Unordered Lists
**Syntax:** `-`, `*`, or `+` at the start of a line

**Examples:**
```markdown
- First item
- Second item
- Third item

* Apple
* Orange
* Banana

+ Todo item 1
+ Todo item 2
```

---

### Ordered Lists
**Syntax:** `1.`, `2.`, `3.`, etc.

**Examples:**
```markdown
1. First step
2. Second step
3. Third step

1. Introduction
2. Main content
3. Conclusion
```

---

### Nested Lists
**Syntax:** Add 2 spaces before the marker for each level of nesting

**Examples:**
```markdown
- Main item 1
  - Sub item 1.1
  - Sub item 1.2
    - Sub-sub item 1.2.1
- Main item 2
  - Sub item 2.1

1. First level
   1. Second level
   2. Second level
      1. Third level
```

**Visual:**
```
• Main item 1
  • Sub item 1.1
  • Sub item 1.2
    • Sub-sub item 1.2.1
• Main item 2
  • Sub item 2.1
```

---

## Combined Formatting

You can combine multiple formatting styles:

### Bold + Italic
```markdown
***Bold and italic***
**Bold with *italic* inside**
*Italic with **bold** inside*
```

### Complex Combinations
```markdown
# **Bold Heading**
## *Italic Heading*
- **Bold list item**
- *Italic list item*
- ~~Strikethrough list item~~

1. **Step one** - important
2. *Step two* - note
3. ~~Step three~~ - cancelled
```

---

## Common Use Cases

### Documentation
```markdown
# Project Documentation

## Installation
1. Clone the repository
2. Run **npm install**
3. Start with **npm start**

## Features
- **Authentication** - Secure login
- **Dashboard** - Real-time analytics
- **API** - RESTful endpoints
```

### Meeting Notes
```markdown
# Team Meeting - 2024-01-15

## Agenda
1. Project updates
2. Timeline review
3. Next steps

## Action Items
- **John**: Update documentation
- **Sarah**: Review PR #123
- ~~**Mike**: Fix bug #456~~ (Done)
```

### Task Lists
```markdown
# Sprint Tasks

## In Progress
- **User Authentication**
  - Implement login
  - Add logout
  - Session management

## Completed
- ~~Design homepage~~
- ~~Setup database~~

## Blocked
- API integration
  - <u>Waiting for API key</u>
```

### Diagrams and Annotations
```markdown
# System Architecture

## Components
1. **Frontend** - React application
   - User interface
   - State management
2. **Backend** - Node.js server
   - API endpoints
   - Authentication
3. **Database** - PostgreSQL
   - User data
   - Application state

## Notes
- Use **HTTPS** for all connections
- Implement *rate limiting*
- ~~Old architecture~~ deprecated
```

---

## Tips and Best Practices

### ✅ Do's
- Use headings to organize content hierarchically
- Use bold for emphasis on important terms
- Use lists for step-by-step instructions
- Combine formatting for better clarity
- Keep nesting levels reasonable (max 2-3 levels)

### ❌ Don'ts
- Don't mix markdown and plain formatting inconsistently
- Don't overuse formatting (keep it readable)
- Don't nest lists too deeply (becomes hard to read)
- Don't forget spaces after markers (`#`, `-`, `1.`)

---

## Keyboard Shortcuts (Proposed)

While typing in a text box:
- `Ctrl/Cmd + B` - Wrap selection in `**bold**`
- `Ctrl/Cmd + I` - Wrap selection in `*italic*`
- `Ctrl/Cmd + U` - Wrap selection in `<u>underline</u>`
- `Ctrl/Cmd + Shift + X` - Wrap selection in `~~strikethrough~~`

*(Note: These shortcuts are not implemented yet but could be added in future)*

---

## Limitations

Current implementation has these limitations:

1. **No inline code**: `` `code` `` not supported yet
2. **No links**: `[text](url)` not supported yet
3. **No images**: `![alt](url)` not supported yet
4. **No blockquotes**: `> quote` not supported yet
5. **No tables**: Markdown tables not supported yet
6. **No code blocks**: ` ```code``` ` not supported yet

These features may be added in future updates.

---

## Examples in Context

### Wireframe Annotation
```markdown
# Homepage Layout

## Header
- **Logo** - Top left
- *Navigation* - Top right
- ~~Search bar~~ - Removed

## Main Content
1. Hero section
2. Features grid
3. Call-to-action

## Footer
- Copyright info
- <u>Privacy Policy</u>
- <u>Terms of Service</u>
```

### Architecture Diagram Label
```markdown
# API Layer

## Endpoints
- **/auth** - Authentication
- **/users** - User management
- **/data** - Data operations

**Status**: In production
~~Old API~~ - Deprecated
```

### Flowchart Annotations
```markdown
# User Flow

1. **Landing Page**
   - View content
   - Click *Sign Up*
2. **Registration**
   - Fill form
   - Verify email
3. **Dashboard**
   - ~~Tutorial~~ Skip
   - Start using app
```

---

## Quick Reference Card

| Feature | Syntax | Example |
|---------|--------|---------|
| Bold | `**text**` | **bold** |
| Italic | `*text*` | *italic* |
| Underline | `<u>text</u>` | <u>underline</u> |
| Strike | `~~text~~` | ~~strike~~ |
| H1 | `# text` | Large |
| H2 | `## text` | Medium |
| H3-H6 | `###-######` | Small |
| List | `- item` | • item |
| Ordered | `1. item` | 1. item |
| Nested | `  - item` | ◦ item |

---

## Troubleshooting

### Markdown Not Rendering?
- Check that you're using the correct syntax
- Ensure there's a space after markers (`#`, `-`, `1.`)
- Verify the file has been saved
- Try closing and reopening the file

### Formatting Looks Wrong?
- Make sure opening and closing markers match
- Check for overlapping or nested formatting
- Verify indentation for nested lists (2 spaces per level)

### Special Characters?
- Use escape if needed (though not implemented yet)
- Stick to basic ASCII characters for best results

---

## Version History

- **v1.0** (Current)
  - Bold, italic, underline, strikethrough
  - Headings (H1-H6)
  - Unordered and ordered lists
  - Nested lists
  - Combined formatting

- **Future Versions** (Planned)
  - Code blocks and inline code
  - Links and images
  - Blockquotes
  - Tables
  - Escape sequences
  - More list styles

---

## Feedback

Found a bug or have a suggestion?
- Open an issue on GitHub
- Describe the markdown that's not working
- Include a screenshot if possible
- Suggest improvements

---

## Related Documentation

- [Implementation Notes](./IMPLEMENTATION_NOTES.md) - Technical details
- [Summary](./SUMMARY.md) - Implementation overview
- [Tests](./packages/excalidraw/markdown.test.ts) - Test suite

---

*This markdown implementation makes Excalidraw text boxes more powerful and expressive while maintaining the simple, intuitive drawing experience.*
