import { useEditorContext } from "@/hooks/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { type Level } from "@tiptap/extension-heading";
import { useEffect, useState } from "react";

export default function HeadingLevelButton() {
  const { editor } = useEditorContext();
  const [currentHeading, setCurrentHeading] = useState("");
  const headings = [
    {
      label: "Normal Text",
      value: 0,
      fontSize: "16px",
    },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "32px",
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "24px",
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "20px",
    },
    {
      label: "Heading 4",
      value: 4,
      fontSize: "18px",
    },
    {
      label: "Heading 5",
      value: 5,
      fontSize: "16px",
    },
  ];

  useEffect(() => {
    const updateHeading = () => {
      const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
          if (editor?.isActive("heading", { level })) {
            return `Heading ${level}`;
          }
        }
        return "Normal Text";
      };
      setCurrentHeading(getCurrentHeading());
    };

    updateHeading();
    editor?.on("update", updateHeading);

    return () => {
      editor?.on("update", updateHeading);
    };
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 text-black min-w-7 w-[120px] shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200">
          <span className="truncate">{currentHeading}</span>
          <ChevronDownIcon className="size-4 ml-2 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" ">
        {headings.map((heading) => (
          <DropdownMenuItem key={heading.label}>
            <button
              style={{ fontSize: heading.fontSize }}
              onClick={() => {
                if (heading.value === 0) {
                  editor?.chain().focus().setParagraph().run();
                } else {
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: heading.value as Level })
                    .run();
                }
              }}
            >
              {heading.label}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
