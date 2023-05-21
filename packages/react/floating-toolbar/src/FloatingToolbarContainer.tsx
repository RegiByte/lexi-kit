import React, { useCallback, useEffect, useRef } from "react";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  COMMAND_PRIORITY_NORMAL,
  EditorThemeClasses,
  KEY_ESCAPE_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { getDOMRangeRect, setFloatingElementPosition } from "@lexi-kit/utils";
import { mergeRegister } from "@lexical/utils";
import { CLOSE_FLOATING_TOOLBAR_COMMAND } from "./commands";

interface FloatingToolbarContainerProps<Theme = EditorThemeClasses>
  extends React.HTMLAttributes<HTMLDivElement> {
  anchorElem: HTMLElement;
  editor: LexicalEditor;
  theme: Theme;
  toolbarId?: string;
}

const FloatingToolbarContainer: React.FC<FloatingToolbarContainerProps> = (
  props: FloatingToolbarContainerProps,
) => {
  const { anchorElem, editor, theme, toolbarId, children, ...divProps } = props;
  const popupRef = useRef<HTMLDivElement | null>(null);
  const movementThreshold = 6; // Set a threshold for minimum movement in pixels
  let initialPosition = { x: 0, y: 0 };

  useEffect(() => {
    if (popupRef?.current) {
      // The callbacks are defined here to avoid creating new functions on every render.
      function mouseDownListener(e: MouseEvent) {
        initialPosition = { x: e.clientX, y: e.clientY };
      }

      function mouseMoveListener(e: MouseEvent) {
        if (popupRef?.current && (e.buttons === 1 || e.buttons === 3)) {
          const distanceMoved = Math.sqrt(
            Math.pow(e.clientX - initialPosition.x, 2) + Math.pow(e.clientY - initialPosition.y, 2),
          );

          if (distanceMoved > movementThreshold) {
            popupRef.current.style.pointerEvents = "none";
          }
        }
      }

      function mouseUpListener(e: MouseEvent) {
        if (popupRef?.current) {
          popupRef.current.style.pointerEvents = "auto";
        }
      }

      document.addEventListener("mousedown", mouseDownListener);
      document.addEventListener("mousemove", mouseMoveListener);
      document.addEventListener("mouseup", mouseUpListener);

      return () => {
        document.removeEventListener("mousedown", mouseDownListener);
        document.removeEventListener("mousemove", mouseMoveListener);
        document.removeEventListener("mouseup", mouseUpListener);
      };
    }
  }, [popupRef]);

  const closeFloatingToolbar = useCallback(() => {
    setFloatingElementPosition(null, popupRef.current!, anchorElem);
  }, []);

  const updateFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const popupContainerEl = popupRef.current;
    const nativeSelection = window.getSelection();

    if (!popupContainerEl) return;
    if (!$isRangeSelection(selection)) {
      closeFloatingToolbar();
      return;
    }

    if ($isRangeSelection(selection)) {
      const isCollapsed = selection.isCollapsed();
      const rawTextContent = selection.getTextContent().replace(/\n/g, "");
      const textContent = rawTextContent.trim();
      const hasTextSelected = textContent.length > 0;

      if (!hasTextSelected || isCollapsed) {
        closeFloatingToolbar();
        return;
      }
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

      setFloatingElementPosition(rangeRect, popupContainerEl, anchorElem);
    }
  }, [editor, anchorElem, closeFloatingToolbar]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        updateFloatingToolbar();
      });
    };

    window.addEventListener("resize", update);
    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update);
    }

    return () => {
      window.removeEventListener("resize", update);
      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update);
      }
    };
  }, []);

  useEffect(() => {
    editor.getEditorState().read(() => updateFloatingToolbar());
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => updateFloatingToolbar());
      }),

      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          closeFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),

      editor.registerCommand(
        CLOSE_FLOATING_TOOLBAR_COMMAND,
        (closeToolbarId) => {
          if (!toolbarId) {
            closeFloatingToolbar();
            return true;
          }
          if (toolbarId === closeToolbarId) {
            closeFloatingToolbar();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_NORMAL,
      ),
    );
  }, [editor, updateFloatingToolbar, closeFloatingToolbar]);

  return (
    <div
      {...divProps}
      ref={popupRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        ...divProps.style,
      }}>
      {editor.isEditable() && !editor.isComposing() && <>{children}</>}
    </div>
  );
};

export { FloatingToolbarContainer };
export type { FloatingToolbarContainerProps };
