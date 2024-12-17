import Tiptap from "@/components/tip-tap";
import Toolbar from "./toolbar";
import { EditorProvider } from "@/hooks/use-editor-store";
import Navbar from "@/app/documents/[documentId]/components/navbar";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}
export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  return (
    <div className="min-h-screen bg-[#fafbfd] text-black">
      <EditorProvider>
        <div
          className={
            "flex flex-col  pt-2 gap-y-2 fixed text-black bg-[#fafbfd] top-0 left-0 right-0 z-10  print:hidden"
          }
        >
          <Navbar />
          <Toolbar />
        </div>
        <div className={"pt-[114px]"}>
          <Tiptap />
        </div>
      </EditorProvider>
    </div>
  );
}
