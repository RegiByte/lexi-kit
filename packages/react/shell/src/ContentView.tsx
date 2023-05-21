import React, { FC, PropsWithChildren, ReactNode, useCallback } from "react";
import classNames from "classnames";
import {
  ContentEditable as LexicalContentEditable,
  Props as LexicalContentEditableProps,
} from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorThemeClasses } from "lexical";
import { ShellTheme } from "./theme";

type ThemeWithShellProps = EditorThemeClasses & ShellTheme;

/* -------------------------------------------------------------------------------------------------
 * ContentViewProvider
 * -----------------------------------------------------------------------------------------------*/

interface ContentViewContextData {
  contentView: HTMLElement | null;
  setView: React.Dispatch<HTMLElement>;
}

const ContentViewContext = React.createContext<ContentViewContextData | null>(null);
const RawContentViewProvider = ContentViewContext.Provider;

const useContentViewContext = (failOnViewAbsence: boolean = true): ContentViewContextData => {
  const context = React.useContext(ContentViewContext);
  if (!context) {
    if (failOnViewAbsence) {
      throw new Error("ContentViewProvider not found");
    } else {
      console.warn("ContentViewProvider not found");
      return {
        contentView: null,
        setView: () => {},
      };
    }
  }
  return context;
};

const ContentViewProvider: FC<PropsWithChildren> = ({ children }) => {
  const [contentView, setView] = React.useState<HTMLElement | null>(null);
  return (
    <ContentViewContext.Provider value={{ contentView, setView }}>
      {children}
    </ContentViewContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ContentView
 * -----------------------------------------------------------------------------------------------*/

const useSetupViewCallback = (
  onSetupView?: (view: HTMLElement) => void,
  forwardedRef?: React.ForwardedRef<ContentViewElement>,
) => {
  const { setView } = useContentViewContext(false);
  return useCallback(
    (view: HTMLDivElement) => {
      if (!view) {
        return;
      }
      setView?.(view); // Set the view in the context
      onSetupView?.(view); // Call the onSetupView callback;
      if (forwardedRef) {
        if (typeof forwardedRef === "function") {
          forwardedRef(view);
        } else {
          forwardedRef.current = view;
        }
      }
    },
    [onSetupView],
  );
};

interface ContentViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  onSetupView?: (view: HTMLElement) => void;
  scrollerProps?: React.HTMLAttributes<HTMLDivElement>;
}

type ContentViewElement = React.ElementRef<"div">;

const ContentView = React.forwardRef<ContentViewElement, ContentViewProps>(
  (props: ContentViewProps, forwardedRef) => {
    const { children, onSetupView, scrollerProps = {}, ...viewProps } = props;
    const [_, ctx] = useLexicalComposerContext();
    const onViewRef = useSetupViewCallback(onSetupView, forwardedRef);
    const theme = ctx.getTheme() as ThemeWithShellProps;
    const scrollerClassName = classNames(
      theme?.contentView?.scroller ?? "",
      scrollerProps?.className,
    );
    const viewClassName = classNames(theme?.contentView?.root ?? "", viewProps?.className);
    return (
      <div {...scrollerProps} className={scrollerClassName}>
        <div {...viewProps} className={viewClassName} ref={onViewRef}>
          {children}
        </div>
      </div>
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * ContentEditable
 * -----------------------------------------------------------------------------------------------*/

const ContentEditable: React.FC<LexicalContentEditableProps> = (props: ContentViewProps) => {
  const { className: classNameProp, ...contentEditableProps } = props;
  const [_, ctx] = useLexicalComposerContext();
  const theme = ctx.getTheme() as ThemeWithShellProps;
  const className = classNames(theme?.contentView?.contentEditable ?? "", classNameProp);
  return <LexicalContentEditable className={className} {...contentEditableProps} />;
};

const Root = ContentView;
const Provider = ContentViewProvider;

export {
  Root,
  Provider,

  //
  ContentView,
  ContentEditable,
  ContentViewProvider,
  RawContentViewProvider,
  useContentViewContext,
};

export type { ContentViewProps, ContentViewElement, ContentViewContextData };
