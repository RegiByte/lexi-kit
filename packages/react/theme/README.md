# Theme

This package exports primitives and utilities for theming lexical components.

You can use it to create your own theme object or to extend the default theme.

Internally this package is used to export a FullTheme that contains all the themeable classes for
the lexi-kit primitives.


## Installation

```sh
$ yarn add @lexi-kit/theme
# or
$ npm install @lexi-kit/theme
# or
$ pnpm add @lexi-kit/theme
```

## Usage

```ts
import type { MakeTheme } from "@lexi-kit/theme";

type MyComponentTheme = {
  root: string;
  button: string;
  icon: string;
};

type MyTheme = MakeTheme<[
  { myComponent: MyComponentTheme }
]>;

const myTheme: MyTheme = {
  myComponent: { // Autocomplete hints for myComponent
    root: "myComponent",
    button: "myComponent-button",
    icon: "myComponent-icon",
  },
};
```

Note that the theme object is not validated, so you can add any property you want to it.

Also keep in mind that by default the MakeTheme type uses the default EditorClassNames exported
by lexical, if you want to use another object as a BaseTheme you can pass it as a second generic

```ts
type MyTheme = MakeTheme<[
  { myComponent: MyComponentTheme }
], MyOtherTheme>;
```
