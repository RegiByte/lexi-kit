import { TextFormattingState } from "@lexi-kit/toolbar";

export interface FloatingToolbarTheme {
  /**
   * Styles applied to the root element containing the toolbar.
   */
  root?: string;
  /**
   * Styles applied to separator elements.
   */
  separator?: {
    vertical?: string;
    horizontal?: string;
  };
  /**
   * Styles applied to button elements.
   */
  button?: {
    default?: string; // default styles for all buttons
    formatting?: string; // styles for formatting buttons
  } & Partial<Record<TextFormattingState, string>>; // styles for each formatting button
}
