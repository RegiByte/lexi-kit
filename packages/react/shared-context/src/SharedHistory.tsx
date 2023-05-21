import React, { createContext, ReactNode, useContext, useMemo } from "react";
import {
  createEmptyHistoryState,
  HistoryPlugin,
  HistoryState,
} from "@lexical/react/LexicalHistoryPlugin";

type HistoryContextShape = {
  historyState?: HistoryState;
};

const EMPTY_HISTORY_CONTEXT: HistoryContextShape = {};

const Context: React.Context<HistoryContextShape> = createContext({});

const SharedHistoryProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const historyContext = useMemo(() => ({ historyState: createEmptyHistoryState() }), []);
  return <Context.Provider value={historyContext}>{children}</Context.Provider>;
};

function isHistoryContextShape(obj: any): obj is HistoryContextShape {
  return obj && typeof obj === "object" && "historyState" in obj;
}

const useSharedHistoryContext = (): HistoryContextShape => {
  const context = useContext(Context);

  if (!isHistoryContextShape(context)) {
    console.error(
      "[useSharedHistoryContext]: No shared history context detected. Did you remember to wrap your app in a <SharedHistoryContext>?",
    );
    return EMPTY_HISTORY_CONTEXT;
  }

  return context;
};

const SharedHistoryPlugin = () => {
  const { historyState } = useSharedHistoryContext();

  return <HistoryPlugin externalHistoryState={historyState} />;
};

const RawHistoryProvider = Context.Provider;

export { SharedHistoryProvider, useSharedHistoryContext, SharedHistoryPlugin, RawHistoryProvider };
export type { HistoryContextShape };
