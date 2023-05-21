# Toolbar

The core toolbar component that provides basic formatting buttons 
that you can use on your own toolbar, please note that you are not required to use this toolbar,
it exists only as a convenience component. More complex cases may be better-off building their own toolbar.

## Features

- [x] `Toolbar` - The core toolbar component that provides basic formatting buttons
- [x] `ToolbarButton` - A button that can be used in the toolbar
- [x] `ToolbarFormattingButton` - A button that can be used in the toolbar to toggle formatting options
- [x] `ToolbarSeparator` - A separator that can be used in the toolbar
- [x] `useTextColorAction` - A hook to apply color styling to the selected text
- [x] `useTextFormattingAction` - A hook to apply text formatting to the selected text
- [x] `useTextFormattingStates` - A hook that keeps track of active formatting states for the selected text


## Installation

```sh
$ npm install @lexi-kit/toolbar
# or
$ yarn add @lexi-kit/toolbar
# or
$ pnpm add @lexi-kit/toolbar
```

## Usage

```tsx
import React from "react";
import * as Toolbar from "@lexi-kit/toolbar";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function MyToolbar() {
  const [editor] = useLexicalComposerContext();
  const onClickRed = useTextColorAction("red", editor);
  return (
    <Toolbar.Root>
      <Toolbar.Button
        onClick={() => {
          // Do something
          alert("Clicked!");
        }}
      >
        <ClickIcon />
        Click me
      </Toolbar.Button>
      <Toolbar.Button
        onClick={onClickRed}
      >
        Red text
      </Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.FormattingButton
        format="bold"
      >
        <BoldIcon />
      </Toolbar.FormattingButton>
      <Toolbar.FormattingButton
        format="italic"
      >
        <ItalicIcon />
      </Toolbar.FormattingButton>
      <Toolbar.FormattingButton
        format="underline"
      >
        <UnderlineIcon />
      </Toolbar.FormattingButton>

    </Toolbar.Root>
  );
}
```

## API

### `Toolbar.Root`

The root component of the toolbar, it should be used as a wrapper for all toolbar components.

```tsx
<Toolbar.Root>
  <Toolbar.Button>Click me</Toolbar.Button>
</Toolbar.Root>
```

### `Toolbar.Button`

A button that can be used in the toolbar. It's just a regular button
that inherits the theme from the toolbar.

```tsx
<Toolbar.Button
  onClick={() => {
    // Do something
    alert('Clicked!')
  }}
>
    Click me
</Toolbar.Button>
```

### `Toolbar.FormattingButton`

A button that can be used in the toolbar to toggle formatting options.

```tsx
<Toolbar.FormattingButton
  format="bold"
  icon={<BoldIcon />}
/>
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

### `Toolbar.Separator`

A separator that can be used in the toolbar.

Styling has to be done manually.

```tsx
<Toolbar.Separator/>
```

### `useTextColorAction`

A hook to apply color styling to the selected text.

```tsx
const onClickRed = useTextColorAction('red', editor)
// ...
return (
  <Toolbar.Button
    onClick={onClickRed}
  >
    Red text
  </Toolbar.Button>
)
```

### `useTextFormattingAction`

A hook to apply text formatting to the selected text.

This hook exposes the behavior of the `Toolbar.FormattingButton` component.
so you can use it to create your own custom formatting buttons.

```tsx
const onClickBold = useTextFormattingAction("bold", editor);
// ...
return (
  <Toolbar.Button
    onClick={onClickBold}
  >
    Bold text
  </Toolbar.Button>
);
```

### `useTextFormattingStates`

A hook that keeps track of active formatting states for the selected text.

This hook is also part of the behavior of the `Toolbar.FormattingButton` component.

```tsx
const [formattingStates, activeFormattingStates] = useTextFormattingStates(editor)
console.log(formattingStates) // isBold: true, isItalic: false, isUnderline: true
console.log(activeFormattingStates) // ['bold', 'underline']
```
