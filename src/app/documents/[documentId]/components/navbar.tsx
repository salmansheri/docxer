"use client";

import Link from "next/link";
import DocumentInput from "@/app/documents/[documentId]/components/document-input";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarSeparator,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FileTextIcon,
  GlobeIcon,
  PrinterIcon,
  Redo2Icon,
  TextIcon,
  TrashIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorContext } from "@/hooks/use-editor-store";
import { useCallback } from "react";

export default function Navbar() {
  const { editor } = useEditorContext();
  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }, []);

  const onSaveJSON = useCallback(() => {
    if (!editor) return;

    const content = editor.getJSON();

    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `document.json`);
  }, [editor, onDownload]);

  const onSaveHTML = useCallback(() => {
    if (!editor) return;

    const content = editor.getHTML();

    const blob = new Blob([content], {
      type: "text/html",
    });
    onDownload(blob, `document.html`);
  }, [editor, onDownload]);

  const onSaveText = useCallback(() => {
    if (!editor) return;

    const content = editor.getText();

    const blob = new Blob([content], {
      type: "text/plain",
    });
    onDownload(blob, `document.txt`);
  }, [editor, onDownload]);

  return (
    <nav className={"flex items-center justify-between"}>
      <div className={"flex gap-2 items-center"}>
        <Link href={"/"}>
          <h1 id={"logo"} className={"text-3xl"}>
            Docxer
          </h1>
        </Link>
        <div className={"flex flex-col"}>
          {/*DocumentInput */}
          <DocumentInput />
          {/*Menubar */}
          <div className={"flex"}>
            <Menubar
              className={"border-none bg-transparent shadow-none h-auto p-0"}
            >
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted hover:text-white h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJSON}>
                        <FileJsonIcon className={"size-4 mr-2"} />
                        Json
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className={"size-4 mr-2"} />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className={"size-4 mr-2"} />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <TextIcon className={"size-4 mr-2"} />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FileTextIcon className="size-4 mr-2" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon className={"size-4 mr-2"} />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className={"size-4 mr-2"} />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className={"size-4 mr-2"} />
                    Print
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className={"size-4 mr-2"} />
                    Undo <MenubarShortcut>Ctrl + Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className={"size-4 mr-2"} />
                    Redo <MenubarShortcut>Ctrl + Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 1, cols: 1 })}
                      >
                        1 x 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 2, cols: 2 })}
                      >
                        2 x 2
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className={"size-4 mr-2"} />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className={"size-4 mr-2"} />
                        Bold
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <BoldIcon className={"size-4 mr-2"} />
                        Underline
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <BoldIcon className={"size-4 mr-2"} />
                        Italic
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
}
