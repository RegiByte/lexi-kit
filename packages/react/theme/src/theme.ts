// Next I want to create a typescript type that will be used to create the theme object.
// it receives a list of theme object types and returns a union of all the types

import { ShellTheme } from "@lexi-kit/shell";
import { ToolbarTheme } from "@lexi-kit/toolbar";
import { MakeTheme } from "./types";

export type FullTheme = MakeTheme<[
  { shells: ShellTheme },
  { toolbar: ToolbarTheme },
]>
