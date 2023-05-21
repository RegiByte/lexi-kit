import { Meta, StoryObj } from "@storybook/react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { EditorThemeClasses, ParagraphNode } from "lexical";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode } from "@lexical/rich-text";
import * as ContentView from "./ContentView";
import { useContentViewContext } from "./ContentView";
import { ShellTheme } from "./theme";

const meta = {
  title: "ContentView",
  component: ContentView.Root,
  tags: ["content-view", "components"],
} satisfies Meta<typeof ContentView.Root>;

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
        } as EditorThemeClasses & {contentView:ShellTheme},
        editable: true,
        onError: (error) => {
          console.error(error);
        },
      }}>
      {props.children as JSX.Element}
    </LexicalComposer>
  );
};

const MyCustomViewPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { contentView } = useContentViewContext();
  const elsRef = React.useRef<HTMLDivElement[]>([]);

  const calculateRect =
    (direction: "top-left" | "top-right" | "bottom-left" | "bottom-right") => () => {
      if (!contentView) return;
      elsRef.current.forEach((el) => {
        document.body.removeChild(el); // remove all elements
      });
      elsRef.current = [];
      const rect = contentView.getBoundingClientRect();
      const div = document.createElement("div");
      div.style.position = "absolute";

      switch (direction) {
        case "top-left":
          div.style.top = `${rect.top}px`;
          div.style.left = `${rect.left}px`;
          break;
        case "top-right":
          div.style.top = `${rect.top}px`;
          div.style.left = `${rect.right - 50}px`;
          break;
        case "bottom-left":
          div.style.top = `${rect.bottom - 50}px`;
          div.style.left = `${rect.left}px`;
          break;
        case "bottom-right":
          div.style.top = `${rect.bottom - 50}px`;
          div.style.left = `${rect.right - 50}px`;
          break;
      }

      div.style.width = `50px`;
      div.style.height = `50px`;
      div.style.backgroundColor = "red";
      elsRef.current.push(div);
      document.body.appendChild(div);
    };

  useEffect(() => {
    calculateRect("top-right")();
  }, [editor, contentView]);

  return (
    <div>
      <button onClick={calculateRect("top-left")}>Top-Left</button>
      <button onClick={calculateRect("top-right")}>Top-Right</button>
      <button onClick={calculateRect("bottom-left")}>Bottom-Left</button>
      <button onClick={calculateRect("bottom-right")}>Bottom-Right</button>
    </div>
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
  args: {},
  render: () => {
    return (
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
                  top: 18,
                  left: 4,
                  pointerEvents: "none",
                }}>
                Write here...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MyCustomViewPlugin />
        </div>
      </ContentView.Provider>
    );
  },
};

export const ManualContext: Story = {
  decorators: [
    (Story) => (
      <EditorComposer>
        <Story />
      </EditorComposer>
    ),
  ],
  args: {},
  render: () => {
    const [viewElement, setViewElement] = useState<HTMLElement | null>(null);

    return (
      <ContentView.RawContentViewProvider
        value={{ contentView: viewElement, setView: setViewElement }}>
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
                  top: 18,
                  left: 4,
                  pointerEvents: "none",
                }}>
                Write here...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MyCustomViewPlugin />
        </div>
      </ContentView.RawContentViewProvider>
    );
  },
};
