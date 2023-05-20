import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $patchStyleText } from "@lexical/selection";

const DEFAULT_CALLBACK = () => null;

export function useTextColorAction(
  color: string,
  editor: LexicalEditor,
  callback: () => void = DEFAULT_CALLBACK,
) {
  const [activeEditor, setActiveEditor] = useState<LexicalEditor | null>(null);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_HIGH,
    );
  }, []);

  return useCallback(() => {
    activeEditor?.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { color });
        callback();
      }
    });
  }, [color, activeEditor]);
}
