import React, {createContext, ReactNode, useContext, useMemo} from "react";
import {createEmptyHistoryState, HistoryState} from "@lexical/react/LexicalHistoryPlugin";

export type HistoryContextShape = {
	historyState?: HistoryState;
}

const EMPTY_HISTORY_CONTEXT: HistoryContextShape = {}

const Context: React.Context<HistoryContextShape> = createContext({});

export const SharedHistoryContext = ({ children }: { children: ReactNode }): JSX.Element => {
	const historyContext = useMemo(() => ({ historyState: createEmptyHistoryState() }), []);
	return <Context.Provider value={historyContext}>{children}</Context.Provider>;
};

export const useSharedHistoryContext = (): HistoryContextShape => {
	const context = useContext(Context);

	if (!context || !context.historyState) {
		console.error("[useSharedHistoryContext]: No shared history context detected. Did you remember to wrap your app in a <SharedHistoryContext>?")
		return EMPTY_HISTORY_CONTEXT
	}

	return context
};
