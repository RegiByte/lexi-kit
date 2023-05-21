# Lexi-Kit - A collection of useful tools for Lexical framework.

<img src="./assets/logo-animated-3.svg" alt="Logo" width="200"/>

## About

Lexi-kit is a growing collection of useful tools for the [Lexical](https://lexical.dev) framework.

The goal is to provide a set of tools that can be used to build rich text editors with Lexical without having to
reinvent
the wheel every time.

Please note that this is a work in progress and the API is not stable yet.
If you have any suggestions or feedback, please open an issue.

Also remember to come back and check again in a couple of weeks, we are working hard to make this a great library.

All components that you can find in this library are meant to be used with the [Lexical](https://lexical.dev) framework.

We try to follow the coding standards found in the [Lexical](https://lexical.dev) framework, so if you are familiar with
it, you should feel right at home.

## Installation

Installation is done via NPM, Yarn or PNPM.
Individual packages can be installed by specifying the package name after the `@lexi-kit/` prefix.

All packages in the `@lexi-kit` scope are published as ES modules and can be used in both Node.js and browser
environments.
In addition, packages can be installed and used separately so you don't have to worry about increasing your bundle size,
you only pay for what you use.

```bash
$ npm install @lexi-kit/utils @lexi-kit/toolbar
# or
$ yarn add @lexi-kit/utils @lexi-kit/toolbar
# or
$ pnpm add @lexi-kit/utils @lexi-kit/toolbar
```

## Packages

- [x] `Toolbar` - The core toolbar package provides basic formatting buttons and a good foundation for creating an
  accessible formatting toolbar.
- [x] `Floating-Toolbar` - A toolbar component that can be used to create floating toolbars that appear when the user
  selects some text.
- [x] `Utils` - A collection of utility functions that are used across the Lexi-kit library.
- [x] `Shared-context` - A context to share the history state across the editor plugins.
- [x] `Shell` - A package that exports primitives for dealing with the shell of a text editor.
- [x] `Theme` - Utility types and functions to deal with the editor theme. You can compose your own theme or use the
  default one.

## Documentation

I hope to have a proper documentation website soon, in the meantime you can find the documentation for each package in
the packages/**package-name** folder.

- [Toolbar](./packages/react/toolbar/README.md)
- [Floating-Toolbar](./packages/react/floating-toolbar/README.md)
- [Utils](./packages/react/utils/README.md)
- [Shared-context](./packages/react/shared-context/README.md)
- [Shell](./packages/react/shell/README.md)
- [Theme](./packages/react/theme/README.md)


## Contributing

Contributions are welcome, we don't have a strict contributing guide yet but we will soon.
In the meantime, feel free to open an issue or a pull request.
