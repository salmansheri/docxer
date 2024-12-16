import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useEditorContext } from "@/hooks/use-editor-store";
import { cn } from "@/lib/utils";
import { ListIcon, ListOrderedIcon } from "lucide-react";

export default function ListButton() {
  const { editor } = useEditorContext();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
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
            <ListOrderedIcon className="size-4" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 space-y-2">
        {lists.map(({ label, icon: Icon, onClick, isActive }) => (
          <DropdownMenuItem
            onClick={onClick}
            key={label}
            className={cn(
              "flex cursor-pointer items-center gap-x-2 rounded-sm hover:bg-background/80",
              isActive() && "bg-background/90",
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
