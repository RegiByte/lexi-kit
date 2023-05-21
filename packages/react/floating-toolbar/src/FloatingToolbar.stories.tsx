import React, { PropsWithChildren } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { EditorThemeClasses, ParagraphNode } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import * as ContentView from "@lexi-kit/shell";
import { ShellTheme } from "@lexi-kit/shell";
import { FloatingToolbarTheme } from "./theme";
import * as FloatingToolbar from "./FloatingToolbar";

const meta = {
  title: "FloatingToolbar",
  component: FloatingToolbar.Root,
  tags: ["floating-toolbar", "components", "toolbar"],
} satisfies Meta<typeof FloatingToolbar.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const EditorComposer: React.FC<PropsWithChildren> = (props) => {
  return (
    <LexicalComposer
      initialConfig={{
        nodes: [HeadingNode, ParagraphNode],
        namespace: "StorybookEditor",
        theme: {
          text: {
            bold: "bold",
            italic: "italic",
            underline: "underline",
            strikethrough: "strikethrough",
          },
          contentView: {
            contentEditable: "my-content-editable",
            root: "my-content-view",
            scroller: "my-content-view-scroller",
          },
          floatingToolbar: {
            root: "my-floating-toolbar",
            formattingButton: "my-floating-toolbar-formatting-button",
            separator: "my-floating-toolbar-separator",
          },
        } as EditorThemeClasses & {
          floatingToolbar: FloatingToolbarTheme;
          contentView: ShellTheme;
        },
        editable: true,
        onError: (error) => {
          console.error(error);
        },
      }}>
      {props.children as JSX.Element}
    </LexicalComposer>
  );
};

export const Base: Story = {
  decorators: [
    (Story) => (
      <EditorComposer>
        <Story />
      </EditorComposer>
    ),
  ],
  render: () => (
    <ContentView.Provider>
      <div className="editor" style={{ position: "relative" }}>
        <RichTextPlugin
          contentEditable={
            <ContentView.Root>
              <ContentView.ContentEditable />
            </ContentView.Root>
          }
          placeholder={
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 4,
                pointerEvents: "none",
              }}>
              Write here...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <FloatingToolbar.Root>
          <FloatingToolbar.FormattingButton format={"bold"}>B</FloatingToolbar.FormattingButton>
          <FloatingToolbar.FormattingButton format={"italic"}>I</FloatingToolbar.FormattingButton>
          <FloatingToolbar.FormattingButton format={"underline"}>
            U
          </FloatingToolbar.FormattingButton>
        </FloatingToolbar.Root>
      </div>
    </ContentView.Provider>
  ),
};
