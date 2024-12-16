"use client";
import { createContext, useContext, useState } from "react";
import { type Editor } from "@tiptap/react";

type EditorType = {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
};

const EditorContext = createContext<EditorType | null>(null);

export const useEditorContext = (): EditorType => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("UseEditorContext must be used");
  }

  return context;
};

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  return (
    <EditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </EditorContext.Provider>
  );
};
