import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorThemeClasses } from "lexical";
import {
  ToolbarButton,
  ToolbarButtonProps,
  ToolbarFormattingButtonProps,
  ToolbarSeparatorProps,
  ToolbarTheme,
} from "@lexi-kit/toolbar";
import { useContentViewContext } from "@lexi-kit/shell";
import { useFloatingToolbar } from "./useFloatingToolbar";
import { ToolbarFormattingButton, ToolbarSeparator } from "@lexi-kit/toolbar";

/* -------------------------------------------------------------------------------------------------
 * FloatingToolbar
 * -----------------------------------------------------------------------------------------------*/

const DEFAULT_THEME_NAMESPACE = "floatingToolbar";

type BaseThemeWithFloatingToolbarTheme = EditorThemeClasses & { floatingToolbar: ToolbarTheme };

interface FloatingToolbarProps extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  dir?: "ltr" | "rtl";
  viewElement?: HTMLElement;
}

type FloatingToolbarElement = React.ElementRef<"div">;

const FloatingToolbar = React.forwardRef<FloatingToolbarElement, FloatingToolbarProps>(
  (props: FloatingToolbarProps, forwardedRef) => {
    const {
      orientation = "vertical",
      dir,
      loop = true,
      viewElement,
      className: classNameProp,
      ...toolbarProps
    } = props;
    const [_, ctx] = useLexicalComposerContext();
    const theme = ctx.getTheme() as BaseThemeWithFloatingToolbarTheme;
    const className = classNames(theme?.floatingToolbar?.root ?? "", classNameProp);
    const { contentView } = useContentViewContext(false);
    const view = viewElement ?? contentView;

    return useFloatingToolbar(
      <div
        role="toolbar"
        aria-orientation={orientation}
        dir={dir}
        {...toolbarProps}
        className={className}
        ref={forwardedRef}
      />,
      view,
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * FormattingButton
 * -----------------------------------------------------------------------------------------------*/

const FormattingButton: React.FC<ToolbarFormattingButtonProps> = (props) => {
  const { themeNamespace = DEFAULT_THEME_NAMESPACE, ...buttonProps } = props;
  return <ToolbarFormattingButton themeNamespace={themeNamespace} {...buttonProps} />;
};

/* -------------------------------------------------------------------------------------------------
 * FormattingButton
 * -----------------------------------------------------------------------------------------------*/

const Button: React.FC<ToolbarButtonProps> = (props) => {
  const { themeNamespace = DEFAULT_THEME_NAMESPACE, ...buttonProps } = props;
  return <ToolbarButton themeNamespace={themeNamespace} {...buttonProps} />;
};

/* -------------------------------------------------------------------------------------------------
 * Separator
 * -----------------------------------------------------------------------------------------------*/

const Separator: React.FC<ToolbarSeparatorProps> = (props) => {
  const { themeNamespace = DEFAULT_THEME_NAMESPACE, ...separatorProps } = props;
  return <ToolbarSeparator themeNamespace={themeNamespace} {...separatorProps} />;
};

const Root = FloatingToolbar;

export { FloatingToolbar, Root, FormattingButton, Separator, Button };
export type { FloatingToolbarProps, FloatingToolbarElement };

export type {
  ToolbarFormattingButtonProps as FormattingButtonProps,
  ToolbarSeparatorProps as SeparatorProps,
  ToolbarButtonProps as ButtonProps,
} from "@lexi-kit/toolbar";
