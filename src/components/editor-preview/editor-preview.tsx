"use client";

import { EditorToolbar } from "@/components/editor-preview/editor-toolbar";

export function EditorPreview() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-lg overflow-hidden border border-neutral-800 shadow-2xl">
      <div className="bg-neutral-900 border-b border-neutral-800 p-2">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <span>File</span>
          <span>Edit</span>
          <span>Insert</span>
          <span>Format</span>
        </div>
      </div>
      <EditorToolbar />
      <div className="bg-neutral-800 p-8">
        <div className="bg-white w-full h-[600px] rounded shadow-lg" />
      </div>
    </div>
  );
}
