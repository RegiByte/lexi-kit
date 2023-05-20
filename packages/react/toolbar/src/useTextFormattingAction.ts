import { useCallback } from "react";
import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical";
import { TextFormattingState } from "./types";

type CALLBACK = () => void;
const DEFAULT_CALLBACK = () => null;

export function useTextFormattingAction(
  formatting: TextFormattingState,
  editor: LexicalEditor,
  callback: CALLBACK = DEFAULT_CALLBACK,
) {
  return useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatting);
    callback();
  }, [formatting, editor]);
}
