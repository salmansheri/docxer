import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorContext } from "@/hooks/use-editor-store";
import { useEffect, useState } from "react";
import { type ColorResult, CirclePicker } from "react-color";

export default function TextColorButton() {
  const { editor } = useEditorContext();
  const [value, setValue] = useState("#000000");

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  useEffect(() => {
    if (editor) {
      const updateValue = () => {
        const color = editor.getAttributes("textStyle").color || "#000000";
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
          <span className="">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CirclePicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
