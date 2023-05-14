/** Check if a given object is an instance of a HTMLElement and returns a guard clause. */
export function isHTMLElement(x: unknown): x is HTMLElement {
  return x instanceof HTMLElement;
}
