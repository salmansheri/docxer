import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorContext } from "@/hooks/use-editor-store";
import { HighlighterIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { type ColorResult, SketchPicker } from "react-color";

export default function TextHighlightButton() {
  const { editor } = useEditorContext();
  const [value, setValue] = useState("#000000");

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  useEffect(() => {
    if (editor) {
      const updateValue = () => {
        const color = editor.getAttributes("highlight").color || "#000000";
        setValue(color);
      };

      updateValue();

      editor.on("transaction", updateValue);

      return () => {
        editor.off("transaction", updateValue);
      };
    }
  }, [editor]);

  console.log(value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "h-7  text-black justify-center bg-zinc-200  flex-col shrink-0 flex items-center w-[20px] rounded-sm hover:bg-zinc-200/90 px-1.5 overflow-hidden text-sm"
          }
        >
          <span className="">
            <HighlighterIcon className="size-4" />
          </span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
