import React, { PropsWithChildren, useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import classNames from "classnames";
import { TextFormattingState } from "./types";
import { useTextFormattingAction } from "./useTextFormattingAction";
import { EditorThemeClasses } from "lexical";
import { ToolbarTheme } from "./theme";
import { useTextFormattingStates } from "./useTextFormattingStates";

/* -------------------------------------------------------------------------------------------------
 * Toolbar
 * -----------------------------------------------------------------------------------------------*/

type BaseThemeWithToolbarTheme = EditorThemeClasses & { toolbar: ToolbarTheme };
const DEFAULT_THEME_NAMESPACE = "toolbar";

interface ToolbarProps extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  dir?: "ltr" | "rtl";
  /**
   *  The namespace to use when looking up the theme values.
   */
  themeNamespace?: string;
}

type ToolbarElement = React.ElementRef<"div">;

const Toolbar = React.forwardRef<ToolbarElement, ToolbarProps>(
  (props: ToolbarProps, forwardedRef) => {
    const {
      orientation = "vertical",
      dir,
      loop = true,
      themeNamespace = DEFAULT_THEME_NAMESPACE,
      className: classNameProp,
      ...toolbarProps
    } = props;
    const [_, ctx] = useLexicalComposerContext();
    const theme = ctx.getTheme() as BaseThemeWithToolbarTheme;
    const className = classNames(theme?.[themeNamespace]?.root ?? "", classNameProp);
    return (
      <div
        role="toolbar"
        aria-orientation={orientation}
        dir={dir}
        {...toolbarProps}
        className={className}
        ref={forwardedRef}
      />
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * ToolbarButton
 * -----------------------------------------------------------------------------------------------*/

type ToolbarButtonElement = React.ElementRef<"button">;

interface ToolbarButtonProps extends PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>> {
  /**
   *  The namespace to use when looking up the theme values.
   */
  themeNamespace?: string;
}

const ToolbarButton = React.forwardRef<ToolbarButtonElement, ToolbarButtonProps>(
  (props: ToolbarButtonProps, forwardedRef) => {
    const {
      className: classNameProp,
      themeNamespace = DEFAULT_THEME_NAMESPACE,
      ...buttonProps
    } = props;
    const [_, ctx] = useLexicalComposerContext();
    const theme = ctx.getTheme() as BaseThemeWithToolbarTheme;
    const className = classNames(theme?.[themeNamespace]?.button?.default ?? "", classNameProp);
    return <button type="button" {...buttonProps} className={className} ref={forwardedRef} />;
  },
);

/* -------------------------------------------------------------------------------------------------
 * ToolbarSeparator
 * -----------------------------------------------------------------------------------------------*/

interface ToolbarSeparatorProps extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * Either `vertical` or `horizontal`. Defaults to `vertical`.
   */
  orientation?: Orientation;
  /**
   * Whether the component is purely decorative. When true, accessibility-related attributes
   * are updated so that the rendered element is removed from the accessibility tree.
   */
  decorative?: boolean;
  /**
   *  The namespace to use when looking up the theme values.
   */
  themeNamespace?: string;
}

type ToolbarSeparatorElement = React.ElementRef<"div">;

type Orientation = "horizontal" | "vertical";
const ORIENTATIONS = ["horizontal", "vertical"] as const;
const DEFAULT_ORIENTATION = "vertical";

function isValidOrientation(orientation: any): orientation is Orientation {
  return ORIENTATIONS.includes(orientation);
}

const ToolbarSeparator = React.forwardRef<ToolbarSeparatorElement, ToolbarSeparatorProps>(
  (props: ToolbarSeparatorProps, forwardedRef) => {
    const {
      orientation: orientationProp = DEFAULT_ORIENTATION,
      themeNamespace = DEFAULT_THEME_NAMESPACE,
      className: classNameProp,
      decorative,
      ...separatorProps
    } = props;
    const [_, ctx] = useLexicalComposerContext();
    const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
    const ariaOrientation = orientation === "vertical" ? orientation : undefined;
    const semanticProps = decorative
      ? { role: "none" }
      : { "aria-orientation": ariaOrientation, "role": "separator" };
    const theme = ctx.getTheme() as BaseThemeWithToolbarTheme;
    const className = classNames(
      theme?.[themeNamespace]?.separator?.[orientation] ?? "",
      classNameProp,
    );

    return (
      <div
        data-orientation={ariaOrientation}
        {...semanticProps}
        className={className}
        {...separatorProps}
        ref={forwardedRef}
      />
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * ToolbarFormattingButton
 * -----------------------------------------------------------------------------------------------*/

interface ToolbarFormattingButtonProps extends ToolbarButtonProps {
  format: TextFormattingState;
  /**
   *  The namespace to use when looking up the theme values.
   */
  themeNamespace?: string;
}

type ToolbarFormattingButtonElement = React.ElementRef<"button">;

const DEFAULT_ON_CLICK = () => null;

const ToolbarFormattingButton = React.forwardRef<
  ToolbarFormattingButtonElement,
  ToolbarFormattingButtonProps
>((props: ToolbarFormattingButtonProps, forwardedRef) => {
  const {
    format,
    onClick = DEFAULT_ON_CLICK,
    themeNamespace = DEFAULT_THEME_NAMESPACE,
    className: classNameProp,
    ...buttonProps
  } = props;
  const [editor, ctx] = useLexicalComposerContext();
  const handleFormat = useTextFormattingAction(format, editor);
  const [_, activeStates] = useTextFormattingStates(editor);
  const isActive = activeStates.includes(format);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      handleFormat();
      onClick(event);
    },
    [format, handleFormat],
  );
  const theme = (ctx.getTheme() ?? {}) as BaseThemeWithToolbarTheme;
  const className = classNames(
    theme?.[themeNamespace]?.button?.formatting ?? "",
    theme?.[themeNamespace]?.button?.[format] ?? "",
    classNameProp,
  );

  return (
    <button
      type="button"
      {...buttonProps}
      data-active={isActive ? "true" : "false"}
      aria-selected={isActive ? "true" : "false"}
      className={className}
      onClick={handleClick}
      ref={forwardedRef}
    />
  );
});

const Root = Toolbar;
const Button = ToolbarButton;
const Separator = ToolbarSeparator;
const FormattingButton = ToolbarFormattingButton;

export {
  Root,
  Button,
  Separator,
  FormattingButton,

  //
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarFormattingButton,
};

export type {
  ToolbarProps,
  ToolbarButtonProps,
  ToolbarSeparatorProps,
  ToolbarFormattingButtonProps,
};
