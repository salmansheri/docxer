"use client";
import { cn } from "@/lib/utils";
import {
  BoldIcon,
  ChevronDown,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useEditorContext } from "@/hooks/use-editor-store";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import HeadingLevelButton from "@/components/editor/heading-level-button";
import TextColorButton from "@/components/editor/text-color-button";
import TextHighlightButton from "@/components/editor/text-highlight";
import LinkButton from "@/components/editor/link-button";
import ImageButton from "@/components/editor/image-button";
import AlignButton from "@/components/editor/align-button";
import ListButton from "@/components/editor/list-button";
import FontSizeButton from "@/components/editor/font-size-button";

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}
const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      className={cn(
        "text-sm h-7 min-w-7 text-black flex transition duration-500 ease-in-out items-center justify-center rounded-sm hover:bg-zinc-900/20",
        isActive && "bg-zinc-900/20",
      )}
      onClick={onClick}
    >
      <Icon className="size-4" />
    </button>
  );
};
const FontFamilyButton = () => {
  const { editor } = useEditorContext();
  const [currentFontFamily, setCurrentFontFamily] = useState("Arial");
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const fontFamily =
        editor.getAttributes("textStyle").fontFamily || "Arial";
      setCurrentFontFamily(fontFamily);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "h-7 w-[120px] text-black shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          }
        >
          <span>{currentFontFamily}</span>
          <ChevronDown className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1  flex flex-col gap-y-1 ">
        {fonts.map(({ label, value }) => (
          <DropdownMenuItem
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();
            }}
            key={label}
            style={{ fontFamily: value }}
          >
            <span className="text-sm ">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default function Toolbar() {
  const { editor } = useEditorContext();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false",
          );
        },
      },
    ],
    // 2nd Array
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => {
          return editor?.chain().focus().toggleBold().run();
        },
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    // 3rd Array
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => {},
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        isActive: editor?.isActive("taskList"),
      },
    ],
  ];

  return (
    <div className="bg-zinc-300 px-2.5 py-0.5  min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton
          key={item.label}
          onClick={item.onClick}
          icon={item.icon}
        />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/*  Font size  */}
      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* Text Color  */}
      <TextColorButton />
      <TextHighlightButton />
      {/*  Highlight color  */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <LinkButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <ImageButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/*  Align */}
      <AlignButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/*  List  */}

      <ListButton />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
}
