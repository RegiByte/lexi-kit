/** Prefixer ===============
 *
 * @description This is used across all packages to allow the users to add a prefix to
 * the editor class names.
 *
 * @param className - The class name to prefix
 * @param prefix - The prefix to add to the class name
 * @param separator - The separator to use between the prefix and the class name
 */
export const prefixClassName = (
  className: string,
  prefix?: string | null,
  separator: string | null | undefined = "-",
): string => {
  const concretePrefix = prefix ?? "";
  const concreteSeparator = concretePrefix === "" ? "" : separator;
  return className.startsWith(`${concretePrefix}${concreteSeparator}`)
    ? className
    : `${concretePrefix}${concreteSeparator}${className}`;
};

/** Prefixer ===============
 *
 *  @description This is used across all packages to allow the users to add a prefix to multiple class names at once.
 *
 *  @param classNames - The class names to prefix
 *  @param prefix - The prefix to add to the class names
 *  @param separator - The separator to use between the prefix and the class name
 */
export const prefixClassNames = (classNames: string, prefix?: string, separator?: string): string => {
  prefix ??= "";
  separator ??= "-";
  return classNames
    .split(" ")
    .filter((word) => word !== "")
    .map((word, i) => prefixClassName(word, prefix!, separator!))
    .join(" ");
};
