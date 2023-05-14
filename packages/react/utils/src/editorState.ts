import { createEditor, EditorState, LexicalEditor } from "lexical";

/** @internal
 * This is a helper function to create an empty editor state.
 * In the future lexical may expose a similar function.
 * We can then remove this function.
 *
 * @param {LexicalEditor} [editor]
 * @returns {EditorState}
 */
export const createEmptyEditorState = (editor?: LexicalEditor): EditorState => {
  return createEditor(editor?._config).getEditorState().clone();
};
