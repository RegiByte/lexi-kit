# Floating Toolbar

[//]: # (TODO: finish docs)

This floating toolbar component is a basic implementation of a toolbar that you can use to build
your own interactions, note that the toolbar is not a part of the editor itself, it's just a component 
that gets rendered under the LexicalComposerContext and triggers commands/transformations to the editor state.

Again, note that you are not required to use this floating toolbar,
it exists only as a convenience component. More complex cases may be better-off building their own toolbar to deal with collisions and other advanced situations.

I wish we could provide a great experience out of the box but there is a thin line between
a good experience out-of-the-box and a fully fledged floating toolbar that is heavy and hard to customize.

If needed you can use something like `@radix-ui/toolbar` to implement your own version
with more accessibility and customization options.

## Features

- [x] `FloatingToolbar` - The core toolbar floating toolbar component.
- [x] `FormattingButton` - Re-export of `Toolbar.Button` with the theme integrated to the `floatingToolbar` namespace.
- [x] `FloatingToolbarContainer` - Internal component that re-calculates it's own position when the mouse moves and only displays its children when there is text selected.
- [x] `useFloatingToolbar` - A hook to create a floating toolbar that is attached to the editor. You need to provide an `anchorElement` that will be used to calculate where to position the toolbar. You can also use this hook as an example to create your own with any library.


## Installation

```sh
$ npm install @lexi-kit/floating-toolbar
# or
$ yarn add @lexi-kit/floating-toolbar
# or
$ pnpm add @lexi-kit/floating-toolbar
```

## Usage

```tsx
import React from "react";
import * as FloatingToolbar from "@lexi-kit/floating-toolbar";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function MyToolbar() {
  const [editor] = useLexicalComposerContext();
  const onClickRed = useTextColorAction("red", editor);
  return (
    <FloatingToolbar.Root>
      <FloatingToolbar.Button
        onClick={() => {
          // Do something
          alert("Clicked!");
        }}
      >
        <ClickIcon />
        Click me
      </FloatingToolbar.Button>
      <FloatingToolbar.Button
        onClick={onClickRed}
      >
        Red text
      </FloatingToolbar.Button>
      <FloatingToolbar.Separator />
      <FloatingToolbar.FormattingButton
        format="bold"
      >
        <BoldIcon />
      </FloatingToolbar.FormattingButton>
      <FloatingToolbar.FormattingButton
        format="italic"
      >
        <ItalicIcon />
      </FloatingToolbar.FormattingButton>
      <FloatingToolbar.FormattingButton
        format="underline"
      >
        <UnderlineIcon />
      </FloatingToolbar.FormattingButton>

    </FloatingToolbar.Root>
  );
}

function MyEditor() {
  return (
    <LexicalComposer>
      <MyToolbar />
      <RichTextPlugin />
      {/** Other configurations as required... */}
    </LexicalComposer>
  );
}
```

## API

### `FloatingToolbar.Root`

The root component of the toolbar, it should be used as a wrapper for all toolbar components.

```tsx
<FloatingToolbar.Root>
  <FloatingToolbar.Button>Click me</FloatingToolbar.Button>
</FloatingToolbar.Root>
```

### `FloatingToolbar.Button`

A button that can be used in the toolbar. It's just a regular button
that inherits the theme from the toolbar.

```tsx
<FloatingToolbar.Button
  onClick={() => {
    // Do something
    alert('Clicked!')
  }}
>
    Click me
</FloatingToolbar.Button>
```

### `FloatingToolbar.FormattingButton`

A button that can be used in the toolbar to toggle formatting options.

```tsx
<FloatingToolbar.FormattingButton
  format="bold"
>
  <BoldIcon />
</FloatingToolbar.FormattingButton>
```

Accepted formatting states are:
- bold
- underline
- strikethrough
- italic
- highlight
- code
- subscript
- superscript

### `FloatingToolbar.Separator`

A separator that can be used in the toolbar.

Styling has to be done manually.

```tsx
<FloatingToolbar.Separator/>
```
