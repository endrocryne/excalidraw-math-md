# Implementation Notes: Markdown Support and Autosave

## Summary

This implementation adds two major features to Excalidraw:

1. **Markdown support in text boxes** - Basic markdown formatting (bold, italic, underline, strikethrough, headings, lists)
2. **Autosave every 5 seconds** - Using File System Access API

## Implementation Details

### 1. Markdown Support

#### Files Added:
- `packages/excalidraw/markdown.ts` - Parser for markdown syntax
- `packages/excalidraw/markdownRenderer.ts` - Canvas renderer for formatted text
- `packages/excalidraw/markdown.test.ts` - Comprehensive test suite (20 tests)

#### Files Modified:
- `packages/excalidraw/renderer/renderElement.ts` - Integrated markdown rendering

#### Supported Markdown Syntax:

**Bold Text:**
```markdown
**bold text**
__bold text__
```

**Italic Text:**
```markdown
*italic text*
_italic text_
```

**Strikethrough:**
```markdown
~~strikethrough text~~
```

**Underline:**
```markdown
<u>underlined text</u>
```

**Headings:**
```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

**Lists:**
```markdown
- Unordered list item
* Another list item
+ Yet another item
  - Nested item (2 spaces for indent)
    - Deeper nesting (4 spaces)

1. Ordered list item
2. Second item
3. Third item
```

#### How It Works:

1. When rendering a text element, the renderer checks if the text contains markdown patterns
2. If markdown is detected, the text is parsed into segments with formatting flags
3. Each segment is rendered with appropriate canvas styling
4. Original markdown text is preserved in the element's `text` property for persistence

#### Technical Implementation:

- Uses regex patterns with negative lookahead/lookbehind to correctly distinguish between bold (`**`) and italic (`*`)
- Overlap detection ensures higher-priority patterns (bold, strikethrough) take precedence over lower-priority ones (italic)
- Rendering is done purely on canvas (no DOM manipulation) for security and performance
- All formatting is stored as plain text with markdown syntax, making files portable and readable

### 2. Autosave Feature

#### Files Added:
- `packages/excalidraw/autosave.ts` - Autosave logic using File System Access API

#### Files Modified:
- `excalidraw-app/App.tsx` - Integration of autosave timer

#### How It Works:

1. When the Excalidraw component mounts and the API is ready, autosave is started
2. A timer runs every 5 seconds (configurable via `AUTOSAVE_INTERVAL`)
3. On each tick:
   - Checks if a file handle exists in `appState.fileHandle`
   - If a file handle exists (user has opened or saved a file), performs autosave
   - Serializes the current scene using existing `serializeAsJSON`
   - Writes to the file using File System Access API's `createWritable()`
   - Handles errors gracefully (e.g., permission denied)
4. Timer is cleaned up when component unmounts

#### Security Considerations:

- Only saves when user has explicitly granted file access (via open/save dialog)
- Uses existing serialization logic which sanitizes data
- Errors are caught and logged but don't interrupt the user's workflow
- No user input is executed or evaluated

## Testing

### Unit Tests:
- **Markdown**: 20 comprehensive tests covering all formatting types
  - Detection of markdown patterns
  - Parsing of inline formatting (bold, italic, underline, strikethrough)
  - Parsing of line-level formatting (headings, lists)
  - Nested and combined formatting
  
### Build:
- ✅ Build successful with no errors
- ✅ No linting errors in new files
- ✅ TypeScript compilation successful

### Existing Tests:
- ✅ No regressions introduced
- ⚠️ 5 pre-existing test failures in `subtypes.test.tsx` (unrelated to our changes)

## Usage Guide

### Using Markdown in Text Boxes:

1. Create a text element in Excalidraw
2. Type markdown syntax directly in the text box
3. The formatting will be applied when the text is rendered on the canvas
4. Save the file - markdown is preserved in the `.excalidraw` file

**Example:**
```
# My Drawing

This is **bold** and this is *italic*.

Here's a list:
- Item 1
- Item 2
  - Nested item

And ~~crossed out~~ text with <u>underline</u>.
```

### Using Autosave:

Autosave is automatic and requires no user action:

1. Open or save a file to establish a file handle
2. Continue working - the file will automatically save every 5 seconds
3. No save dialog appears (uses existing file handle)
4. If permission is denied, autosave silently fails and will retry next interval

## Future Enhancements

Potential improvements that could be added:

1. **Visual feedback**: Show a small indicator when autosave completes
2. **Markdown toolbar**: Add buttons for inserting markdown syntax
3. **Live preview**: Show rendered markdown in the text editor
4. **More markdown features**: 
   - Links
   - Code blocks with syntax highlighting
   - Tables
   - Blockquotes
   - Horizontal rules
5. **Configurable autosave interval**: Let users choose autosave frequency
6. **Autosave toggle**: Allow users to enable/disable autosave

## Known Limitations

1. **Browser Support**: File System Access API is not available in all browsers
   - Chrome/Edge: Full support
   - Firefox: Behind a flag
   - Safari: Partial support
   
2. **Markdown Rendering**: Some edge cases with nested/combined formatting may not render perfectly due to canvas text rendering limitations

3. **Performance**: For very large files, autosave every 5 seconds might be aggressive. The interval can be adjusted in `autosave.ts`.

## Security Review

Manual security audit completed:

### Autosave:
- ✅ User consent required (file handle only exists after user opens/saves)
- ✅ Uses existing sanitization
- ✅ No injection vulnerabilities
- ✅ Error handling doesn't leak sensitive data

### Markdown:
- ✅ Canvas-only rendering (no XSS risk)
- ✅ No code execution
- ✅ Safe parameter handling
- ✅ No DOM manipulation

## Files Changed

```
New files:
├── packages/excalidraw/markdown.ts (165 lines)
├── packages/excalidraw/markdownRenderer.ts (123 lines)
├── packages/excalidraw/markdown.test.ts (152 lines)
└── packages/excalidraw/autosave.ts (85 lines)

Modified files:
├── packages/excalidraw/renderer/renderElement.ts (+6 lines, modified text rendering)
└── excalidraw-app/App.tsx (+17 lines, autosave integration)
```

Total: 4 new files, 2 modified files, ~542 lines added
