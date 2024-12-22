import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-y-6 justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-[#db2777] to-[#d946ef]">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-[#db2777] to-[#d946ef] text-transparent bg-clip-text">
              Docxer
            </span>
          </div>
          <div>
            Made with ❤️ by{" "}
            <b className="bg-gradient-to-r from-[#db2777] to-[#d946ef] text-transparent bg-clip-text font-bold">
              Salman Sheriff
            </b>
          </div>
          <div className="text-sm text-neutral-400">
            © 2024 Docxer. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
