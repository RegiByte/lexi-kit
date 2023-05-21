# Shared Context

This package exports a context object that can be used to control and observe the history state of the editor.

Note that you are not required to use the history context to build your editor,
you can use it as a reference or as a starting point for your own logic.



## Features

- [x] `SharedHistoryProvider` - A provider that wraps your editor and exposes the history context automatically.
- [x] `SharedHistoryPlugin` - A plugin that uses the native plugin LexicalHistoryPlugin to control the history context and bind to the SharedHistoryProvider.
- [x] `RawHistoryProvider` - You can obviously provide your own context to control the history however you want.
- [x] `useSharedHistoryContext` -  A hook to access the history context state. This is useful if you need to do some
  manual history manipulation or observation.

## Installation

```sh
$ yarn add @lexi-kit/shared-context
# or
$ npm install @lexi-kit/shared-context
# or
$ pnpm add @lexi-kit/shared-context
```

## Usage

```tsx
import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { SharedHistoryProvider, SharedHistoryPlugin } from "@lexi-kit/shared-context";

function MyEditor() {
  return (
    <LexicalComposer initialConfig={{ /* your config here */ }}>
      <SharedHistoryProvider>
        <div className="my-editor">
          <RichTextPlugin
            contentEditable={<div contentEditable />}
            placeholder={<span>Type something...</span>}
          />

          {/* This plugin will automatically bind the history to the SharedHistoryProvider */}
          <SharedHistoryPlugin />
        </div>
      </SharedHistoryProvider>
    </LexicalComposer>
  );
}
```
