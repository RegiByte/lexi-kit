import { createCommand, LexicalCommand } from "lexical";

type ToolbarId = string | null;
export const CLOSE_FLOATING_TOOLBAR_COMMAND: LexicalCommand<ToolbarId> = createCommand<ToolbarId>(
  "CLOSE_FLOATING_TOOLBAR_COMMAND",
);
