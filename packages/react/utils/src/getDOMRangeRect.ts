/** getDOMRangeRect
 *
 * @description This is a copy of the getDOMRangeRect function from the core package.
 * This is used to get the bounding client rect of the current selection inside the editor root element.
 * @param nativeSelection
 * @param rootElement
 * @returns DOMRect
 */
export function getDOMRangeRect(
  nativeSelection: Selection,
  rootElement: HTMLElement,
): DOMRect {
  const domRange = nativeSelection.getRangeAt(0);

  let rect;

  if (nativeSelection.anchorNode === rootElement) {
    let inner = rootElement;
    while (inner.firstElementChild != null) {
      inner = inner.firstElementChild as HTMLElement;
    }
    rect = inner.getBoundingClientRect();
  } else {
    rect = domRange.getBoundingClientRect();
  }

  return rect;
}
