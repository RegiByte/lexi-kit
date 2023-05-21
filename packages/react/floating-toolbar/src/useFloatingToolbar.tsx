import React from "react";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FloatingToolbarContainer } from "./FloatingToolbarContainer";

/** A hook to create a portal inside the anchorElement that will then re-calculate it's position and visibility
 *  whenever the selection changes.
 *  Also see ./FloatingToolbarContainer.tsx
 *
 *  @param child - the child to render inside the portal
 *  @param anchorElem the element to render the portal inside of
 *  @returns null|ReactPortal
 */
export const useFloatingToolbar = (child: React.ReactNode, anchorElem: HTMLElement | null) => {
  const [editor, ctx] = useLexicalComposerContext();
  const theme = ctx.getTheme();

  if (!anchorElem) {
    return null;
  }

  return createPortal(
    <FloatingToolbarContainer editor={editor} theme={theme!} anchorElem={anchorElem}>
      {child}
    </FloatingToolbarContainer>,
    anchorElem,
  );
};
