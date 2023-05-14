const VERTICAL_GAP = 10;
const HORIZONTAL_OFFSET = 5;

const calcInitialTop = (targetRect: ClientRect, floatingElemRect: ClientRect, verticalGap: number): number => {
  return targetRect.top - floatingElemRect.height - verticalGap;
};

const calcInitialLeft = (targetRect: ClientRect, floatingElemRect: ClientRect, horizontalOffset: number) => {
  return targetRect.left - horizontalOffset;
};

type CalcInitialCoordinate = (targetRect: ClientRect, floatingElemRect: ClientRect, verticalGap: number) => number;

/** setFloatingElementPosition
 *
 * This function is used to set the position of the floating element based on a ClientRect.
 *
 * @param {ClientRect | null} targetRect
 * @param {HTMLElement} floatingElem
 * @param {HTMLElement} anchorElem
 * @param {number} verticalGap
 * @param {number} horizontalOffset
 * @param {CalcInitialCoordinate} calcTop
 * @param {CalcInitialCoordinate} calcLeft
 * @returns {void}
 */
export function setFloatingElementPosition(
  targetRect: ClientRect | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement,
  verticalGap: number = VERTICAL_GAP,
  horizontalOffset: number = HORIZONTAL_OFFSET,
  calcTop: CalcInitialCoordinate = calcInitialTop,
  calcLeft: CalcInitialCoordinate = calcInitialLeft,
): void {
  const scrollerElem = anchorElem.parentElement;

  if (targetRect === null || !scrollerElem) {
    floatingElem.style.opacity = "0";
    floatingElem.style.transform = "translate(-10000px, -10000px)";
    return;
  }

  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();
  const editorScrollerRect = scrollerElem.getBoundingClientRect();

  let top = calcTop(targetRect, floatingElemRect, verticalGap);
  let left = calcLeft(targetRect, floatingElemRect, horizontalOffset);

  if (top < editorScrollerRect.top) {
    top += floatingElemRect.height + targetRect.height + verticalGap * 2;
  }

  if (left + floatingElemRect.width > editorScrollerRect.right) {
    left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset;
  }

  top -= anchorElementRect.top;
  left -= anchorElementRect.left;

  floatingElem.style.opacity = "1";
  floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}


/** setFloatingElementPosition
 *
 * This function is used to set the position of the link editor floating element based on a ClientRect.
 *
 * @param {ClientRect | null} targetRect
 * @param {HTMLElement} floatingElem
 * @param {HTMLElement} anchorElem
 * @param {number} verticalGap
 * @param {number} horizontalOffset
 * @returns {void}
 */
export const setFloatingElementPositionForLinkEditor = (
  targetRect: ClientRect | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement,
  verticalGap: number = VERTICAL_GAP,
  horizontalOffset: number = HORIZONTAL_OFFSET,
): ReturnType<typeof setFloatingElementPosition> => {
  return setFloatingElementPosition(
    targetRect,
    floatingElem,
    anchorElem,
    verticalGap,
    horizontalOffset,
    (targetRect, floatingElemRect, verticalGap) => targetRect.top - verticalGap,
    (targetRect, floatingElemRect, horizontalOffset) => targetRect.left - horizontalOffset,
  );
};
