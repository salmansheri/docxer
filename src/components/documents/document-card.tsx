import React, { FC, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  EditIcon,
  EllipsisVertical,
  Loader2,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteDocument } from "@/hooks/documents/use-delete-document";
import Modal from "../modal/modal";
import { Input } from "../ui/input";
import { useUpdateDocuments } from "@/hooks/documents/use-update-document-by-id";

interface DocumentCardProps {
  id: string;
  title: string;
  handleOpen: () => void;
  handleClose: () => void;
  isOpen: boolean;
}

const DocumentCard: FC<DocumentCardProps> = ({ id, title }) => {
  const { mutate: deleteDocuments, isPending: isDeleteDocumentsPending } =
    useDeleteDocument();
  const { mutate: updateDocument, isPending: updateDocumentIsPending } =
    useUpdateDocuments();
  const [newTitle, setNewTitle] = useState(title);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = useCallback(() => {
    if (isDeleteDocumentsPending) {
      return;
    }
    deleteDocuments({
      id,
    });
  }, [deleteDocuments, id, isDeleteDocumentsPending]);

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    updateDocument(
      {
        id: id,
        title: newTitle,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
    }
  }, [isOpen]);

  return (
    <div className="w-[200px] flex flex-col justify-between p-5 rounded-lg  h-[200px] border border-pink-50/10">
      <AnimatePresence>
        {isOpen && (
          <Modal handleClose={handleClose} title={"Update Document"}>
            <div>
              <form className="space-y-6" onSubmit={handleUpdate}>
                <div>
                  <Input
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    onClick={handleClose}
                    className="text-white"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {updateDocumentIsPending ? (
                      <>
                        <Loader2 className="animate-spin size-4" />
                        Loading...
                      </>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <div></div>
      <div className="flex items-center justify-between">
        <h2>{title}</h2>
        <div className="flex items-center gap-1">
          {isDeleteDocumentsPending ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
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
                    <DropdownMenuItem
                      className="text-blue-500"
                      onClick={handleOpen}
                    >
                      <EditIcon />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDelete}
                      className="text-red-500"
                    >
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
