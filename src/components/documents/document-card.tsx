import { FC, useCallback } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BookOpen, EditIcon, EllipsisVertical, Loader2, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteDocument } from "@/hooks/documents/use-delete-document";

interface DocumentCardProps {
  id: string;
  title: string;
}

const DocumentCard: FC<DocumentCardProps> = ({ id, title }) => {
  const { mutate: deleteDocuments, isPending: isDeleteDocumentsPending } = useDeleteDocument();

const handleDelete = useCallback(() => {
  if(isDeleteDocumentsPending) {
    return;
  }
  deleteDocuments({
    id
  })

}, [deleteDocuments, id, isDeleteDocumentsPending])

  return (
    <div className="w-[200px] flex flex-col justify-between p-5 rounded-lg  h-[200px] border border-pink-50/10">
      <div></div>
      <div className="flex items-center justify-between">
        <h2>{title}</h2>
        <div className="flex items-center gap-1">
          {isDeleteDocumentsPending ? (
            <Loader2 className="animate-spin size-4" />

          ): (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                    }}
                  >
                    <DropdownMenuItem className="text-blue-500">
                      <EditIcon />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} className="text-red-500">
                      <TrashIcon />
                      Delete
                    </DropdownMenuItem>
                  </motion.div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          )}


          <Link href={`/documents/${id}`}>
            <BookOpen />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;