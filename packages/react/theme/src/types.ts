import { EditorThemeClasses } from "lexical";

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

export type MakeTheme<T extends Array<Record<string, object>>, Base = EditorThemeClasses> = Base &
  UnionToIntersection<T[number]>;
