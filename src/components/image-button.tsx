import { useEditorContext } from "@/hooks/use-editor-store";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ImageButton() {
  const { editor } = useEditorContext();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const imageURL = URL.createObjectURL(file);
        onChange(imageURL);
      }
    };

    input.click();
  };

  const handleImageURLSubmit = () => {
    if (imageURL) {
      onChange(imageURL);
      setImageURL("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={
              "h-7  text-black justify-center bg-zinc-200  flex-col shrink-0 flex items-center w-[20px] rounded-sm hover:bg-zinc-200/90 px-1.5 overflow-hidden text-sm"
            }
          >
            <span className="">
              <ImageIcon className="size-4" />
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 ">
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="size-4 mr-2" />
            Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Insert Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageURLSubmit();
              }
            }}
          />

          <DialogFooter>
            <Button onClick={handleImageURLSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
