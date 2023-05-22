import { ShellTheme } from "@lexi-kit/shell";
import { ToolbarTheme } from "@lexi-kit/toolbar";
import { MakeTheme } from "./types";

export type FullTheme = MakeTheme<[
  { shell?: ShellTheme },
  { toolbar?: ToolbarTheme },
]>
