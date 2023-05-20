export type TextFormattingState =
  | "bold"
  | "underline"
  | "strikethrough"
  | "italic"
  | "highlight"
  | "code"
  | "subscript"
  | "superscript";

// Simple utility type to create a string union of the keys of the activeTextFormattingStatesAtom.
export type IsTextFormattingState<T> = T extends TextFormattingState ? `is${Capitalize<T>}` : never;
// Create a union of the keys of the activeTextFormattingStatesAtom.
export type TextFormattingStateKeys = IsTextFormattingState<TextFormattingState>;
