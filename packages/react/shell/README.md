# Shell

This package exports primitives for dealing with the shell of a text editor.

You can consider as the shell the most inner part of the editor before the actual
**contenteditable** itself.

In a way, the shell is the editor without the contenteditable.

Note that you are not required to use the shell primitives to build your editor,
you can use them as a reference or as a starting point and there are tons of
ways of getting away without using them.

## Features

- [x] `ContentView` - The root component that wraps the contenteditable.
- [x] `ContentEditable` - The contenteditable itself, this component is the same as the one exported
  at `@lexical/react/LexicalContentEditable` with the
  exception that this one automatically connects itself with the editor theme.
- [x] `ContentViewProvider` - You can wrap your editor with this provider to make sure that the ContentView
  automatically binds the ContentView HTML element to the context state.
- [x] `useContentViewContext` - A hook to access the ContentView context state. This is useful if you need to do some
  manual DOM manipulation or positioning elements.

## Installation

```sh
$ yarn add @lexi-kit/shell
# or
$ npm install @lexi-kit/shell
# or
$ pnpm add @lexi-kit/shell
```

## Usage

```tsx
import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import * as Shell from "@lexi-kit/shell";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

function MyEditor() {
  return (
    <LexicalComposer initialConfig={{ /* your config here */ }}>
      <Shell.ContentViewProvider>
        <div className="my-editor">
          {/*  other plugins here... */}
          {/*  A toolbar maybe? */}
          
          <RichTextPlugin
            {/* This Shell.ContentView will automatically bind the view element 
             to the ContentViewProvider and after that the element will be available anywhere in the editor. 
             */}
            contentEditable={
              <Shell.ContentView>
                <Shell.ContentEditable />
              </Shell.ContentView>
            }
            placeholder={<span>Type something...</span>}
          />
          {/*  other plugins here... */}
        </div>
      </Shell.ContentViewProvider>
    </LexicalComposer>
  );
}
```

You can also obviously keep track of the ContentView element yourself.

We expose a prop on the ContentView component named `onSetupView` that you can use to get the element in a callback.

```tsx
// imports...
import { useState } from "react";

function MyEditor() {
  const [viewElement, setViewElement] = useState<HTMLElement | null>(null);
  return (
    <LexicalComposer initialConfig={{ /* your config here */ }}>
      <Shell.RawContentViewProvider value={{ contentView: viewElement, setView: setViewElement }}>
        <div className="my-editor">
          {/*  other plugins here... */}
          {/*  A toolbar maybe? */}

          <RichTextPlugin
            {/* This Shell.ContentView will automatically bind the view element 
             to the ContentViewProvider and after that the element will be available anywhere in the editor. 
             */}
            contentEditable={
              <Shell.ContentView onSetupView={(viewEl: HTMLElement) => {
                setViewElement(viewEl);
                // Note that you don't need this callback here
                // if you are using the RawContentViewProvider
                // because it will automatically set the element
                // for you in the context.
                // but you can still use it if you want to do.
              }}>
                <Shell.ContentEditable />
              </Shell.ContentView>
            }
            placeholder={<span>Type something...</span>}
          />
          {/*  other plugins here... */}
        </div>
      </Shell.RawContentViewProvider>
    </LexicalComposer>
  );
}
```
