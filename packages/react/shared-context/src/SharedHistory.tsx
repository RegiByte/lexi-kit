import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { createEmptyHistoryState, HistoryPlugin, HistoryState } from '@lexical/react/LexicalHistoryPlugin';

export type HistoryContextShape = {
  historyState?: HistoryState;
}

const EMPTY_HISTORY_CONTEXT: HistoryContextShape = {};

const Context: React.Context<HistoryContextShape> = createContext({});

export const SharedHistoryContext = ({ children }: { children: ReactNode }): JSX.Element => {
  const historyContext = useMemo(() => ({ historyState: createEmptyHistoryState() }), []);
  return <Context.Provider value={historyContext}>{children}</Context.Provider>;
};

export function isHistoryContextShape(obj: any): obj is HistoryContextShape {
  return obj && typeof obj === 'object' && 'historyState' in obj;
}

export const useSharedHistoryContext = (): HistoryContextShape => {
  const context = useContext(Context);

  if (!isHistoryContextShape(context)) {
    console.error('[useSharedHistoryContext]: No shared history context detected. Did you remember to wrap your app in a <SharedHistoryContext>?');
    return EMPTY_HISTORY_CONTEXT;
  }

  return context;
};

export const SharedHistoryPlugin = () => {
  const {historyState} = useSharedHistoryContext()

  return <HistoryPlugin externalHistoryState={historyState} />
}
