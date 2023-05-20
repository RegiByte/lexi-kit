import { useCallback, useEffect, useMemo, useState } from "react";
import {
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
} from "lexical";
import { $isLinkNode } from "@lexical/link";
import { $isCodeHighlightNode } from "@lexical/code";
import { $isHeadingNode } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
import { getSelectedNode } from "@lexi-kit/utils";
import { TextFormattingState, TextFormattingStateKeys } from "./types";

// Create a record type from the keys of the activeTextFormattingStatesAtom.
type AllTextFormattingStates = Record<TextFormattingStateKeys, boolean> & {
  isLink: boolean;
  isText: boolean;
};
// Create a list of the keys of the activeTextFormattingStatesAtom.
type ActiveTextFormattingStatesList = TextFormattingState[];

export function useTextFormattingStates(
  editor: LexicalEditor,
): [AllTextFormattingStates, ActiveTextFormattingStatesList] {
  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);

  const updateTextFormattingStates = useCallback(() => {
    editor.getEditorState().read(() => {
      if (editor.isComposing()) return;

      const selection = $getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        setIsText(false);
        return;
      }

      if (!$isRangeSelection(selection)) {
        setIsText(false);
        return;
      }

      const node = getSelectedNode(selection);

      if (node === null) {
        setIsText(false);
        return;
      }

      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsHighlight(selection.hasFormat("highlight"));

      // Update links
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (!$isCodeHighlightNode(selection.anchor.getNode()) && selection.getTextContent() !== "") {
        setIsText($isTextNode(node) || $isParagraphNode(node) || $isHeadingNode(node));
      } else {
        setIsText(false);
      }

      const rawTextContent = selection.getTextContent().replace(/\n/g, "");
      if (!selection.isCollapsed() && rawTextContent === "") {
        setIsText(false);
        return;
      }
    });
  }, [
    editor,
    setIsBold,
    setIsCode,
    setIsItalic,
    setIsStrikethrough,
    setIsSubscript,
    setIsSuperscript,
    setIsText,
    setIsUnderline,
    setIsLink,
    setIsHighlight,
  ]);

  useEffect(() => {
    // Update the text formatting states when the selection changes.
    document.addEventListener("selectionchange", updateTextFormattingStates);

    return () => {
      document.removeEventListener("selectionchange", updateTextFormattingStates);
    };
  }, [updateTextFormattingStates]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updateTextFormattingStates();
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          setIsText(false);
        }
      }),
    );
  }, []);

  const activeStates = useMemo(() => {
    return {
      isBold,
      isCode,
      isItalic,
      isStrikethrough,
      isSubscript,
      isSuperscript,
      isText,
      isUnderline,
      isLink,
      isHighlight,
    };
  }, [
    isBold,
    isCode,
    isItalic,
    isStrikethrough,
    isSubscript,
    isSuperscript,
    isText,
    isUnderline,
    isLink,
    isHighlight,
  ]);

  const activeStatesList = useMemo(() => {
    return Object.keys(activeStates)
      .filter((key) => activeStates[key as keyof typeof activeStates])
      .map(
        (key) => key.slice(2).toLowerCase() as TextFormattingState,
      ) as ActiveTextFormattingStatesList;
  }, [activeStates]);

  return [activeStates, activeStatesList];
}
