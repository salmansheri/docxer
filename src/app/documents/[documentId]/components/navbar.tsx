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
import { FileIcon } from "lucide-react";

export default function Navbar() {
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
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <FileIcon />
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
}
