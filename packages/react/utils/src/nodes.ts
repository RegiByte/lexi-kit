import { ElementNode, RangeSelection, TextNode } from "lexical";
import { $isAtNodeEnd } from "@lexical/selection";

/** getSelectedNode
 *
 * This function returns the selected node in a range selection.
 * @param {RangeSelection} selection
 * @returns {TextNode | ElementNode}
 */
export const getSelectedNode = (selection: RangeSelection): TextNode | ElementNode => {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
  }
};
