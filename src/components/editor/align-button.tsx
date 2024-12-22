import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorContext } from "@/hooks/use-editor-store";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

export default function AlignButton() {
  const { editor } = useEditorContext();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeft,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenter,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRight,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustify,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "h-7  text-black justify-center bg-zinc-200  flex-col shrink-0 flex items-center w-[20px] rounded-sm hover:bg-zinc-200/90 px-1.5 overflow-hidden text-sm"
          }
        >
          <span className="">
            <AlignLeft className="size-4" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 space-y-2">
        {alignments.map(({ label, value, icon: Icon }) => (
          <DropdownMenuItem
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            key={label}
            className={cn(
              "flex cursor-pointer items-center gap-x-2 rounded-sm hover:bg-background/80",
              editor?.isActive({ TextAlign: value }) && "bg-background/90",
            )}
          >
            <Icon className="size-4" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
