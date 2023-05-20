import React, { PropsWithChildren, useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import classNames from "classnames";
import { TextFormattingState } from "./types";
import { useTextFormattingAction } from "./useTextFormattingAction";

/* -------------------------------------------------------------------------------------------------
 * Toolbar
 * -----------------------------------------------------------------------------------------------*/

interface ToolbarProps extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  dir?: "ltr" | "rtl";
}

type ToolbarElement = React.ElementRef<"div">;

const Toolbar = React.forwardRef<ToolbarElement, ToolbarProps>(
  (props: ToolbarProps, forwardedRef) => {
    const { orientation = "horizontal", dir, loop = true, className: classNameProp, ...toolbarProps } = props;
    const [_, ctx] = useLexicalComposerContext();
    const className = classNames(ctx.getTheme()?.toolbar?.root ?? "", classNameProp);
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

interface ToolbarButtonProps extends PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>> {}

const ToolbarButton = React.forwardRef<ToolbarButtonElement, ToolbarButtonProps>(
  (props: ToolbarButtonProps, forwardedRef) => {
    const { className: classNameProp, ...buttonProps } = props;
    const [_, ctx] = useLexicalComposerContext();
    const className = classNames(ctx.getTheme()?.toolbar?.button?.default ?? "", classNameProp);
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
    const className = classNames(
      ctx.getTheme()?.toolbar?.separator?.[orientation] ?? "",
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
}

type ToolbarFormattingButtonElement = React.ElementRef<"button">;

const DEFAULT_ON_CLICK = () => null;

const ToolbarFormattingButton = React.forwardRef<
  ToolbarFormattingButtonElement,
  ToolbarFormattingButtonProps
>((props: ToolbarFormattingButtonProps, forwardedRef) => {
  const { format, onClick = DEFAULT_ON_CLICK, className: classNameProp, ...buttonProps } = props;
  const [editor, ctx] = useLexicalComposerContext();
  const handleFormat = useTextFormattingAction(format, editor);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      handleFormat();
      onClick(event);
    },
    [format, handleFormat],
  );
  const theme = ctx.getTheme() ?? {};
  const className = classNames(
    theme?.toolbar?.button?.formatting ?? "",
    theme?.toolbar?.button?.[format] ?? "",
    classNameProp,
  );

  return (
    <button
      type="button"
      {...buttonProps}
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
}
