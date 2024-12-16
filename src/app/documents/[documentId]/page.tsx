import Tiptap from "@/components/tip-tap";
import Toolbar from "./toolbar";
import { EditorProvider } from "@/hooks/use-editor-store";
interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}
export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const { documentId } = await params;
  return (
    <div className="min-h-screen ">
      <EditorProvider>
        <Toolbar />
        <Tiptap />
      </EditorProvider>
    </div>
  );
}
