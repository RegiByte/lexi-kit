import './Toolbar.stories.css'
import React, { PropsWithChildren } from "react";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode } from "@lexical/rich-text";
import { ParagraphNode } from "lexical";
import { Meta, StoryObj } from "@storybook/react";
import * as Toolbar from "./Toolbar";
import { useTextColorAction } from "./useTextColorAction";

const meta = {
  title: "Toolbar",
  component: Toolbar.Root,
  tags: ["toolbar", "components"],
} satisfies Meta<typeof Toolbar.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const EditorComposer: React.FC<PropsWithChildren> = (props) => {
  return (
    <LexicalComposer
      initialConfig={{
        nodes: [HeadingNode, ParagraphNode],
        namespace: "StorybookEditor",
        theme: {
          toolbar: {
            root: "toolbar",
            button: {
              default: "button",
              formatting: "formatting-button",
            },
            separator: {
              vertical: "separator",
            },
          },
          text: {
            bold: "bold",
            italic: "italic",
            underline: "underline",
            strikethrough: "strikethrough",
          },
        },
        editable: true,
        onError: (error) => {
          console.error(error);
        },
      }}
      >
      {props.children as JSX.Element}
    </LexicalComposer>
  )
}

export const Base: Story = {
  decorators: [
    (Story) => (
      <EditorComposer>
        <Story />
      </EditorComposer>
    ),
  ],
  render: () => {
    const [editor] = useLexicalComposerContext()
    const onClickRed = useTextColorAction("red", editor);
    const onClickBlue = useTextColorAction("blue", editor);
    const onClickGreen = useTextColorAction("green", editor);
    return (
      <div className="editor">
        <Toolbar.Root>
          <Toolbar.Button onClick={() => console.log("clicked the button")}>
            Just a regular old button
          </Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.FormattingButton format="bold">B</Toolbar.FormattingButton>
          <Toolbar.FormattingButton format="italic">I</Toolbar.FormattingButton>
          <Toolbar.FormattingButton format="underline">U</Toolbar.FormattingButton>
          <Toolbar.FormattingButton format="strikethrough">S</Toolbar.FormattingButton>
          <Toolbar.Separator />
          <Toolbar.Button onClick={onClickRed}>
            Red
          </Toolbar.Button>
          <Toolbar.Button className="blue-btn" onClick={onClickBlue}>
            Blue
          </Toolbar.Button>
          <Toolbar.Button onClick={onClickGreen}>
            Green
          </Toolbar.Button>
        </Toolbar.Root>
        <div className="scroll">
          <RichTextPlugin
            contentEditable={<ContentEditable translate={'no'} spellCheck={"false"} className="content" />}
            placeholder={<div>Write here ...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
    );
  },
};
