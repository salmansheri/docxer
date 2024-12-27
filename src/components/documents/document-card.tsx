import { FC } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BookOpen, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentCardProps {
  id: string;
  title: string;
}

const DocumentCard: FC<DocumentCardProps> = ({ id, title }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="w-[200px] flex flex-col justify-between p-5 rounded-lg  h-[200px] border border-pink-50/10">
        <div></div>
        <div className="flex items-center justify-between">
          <h2>{title}</h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost">
              <EllipsisVertical />
            </Button>
            <Link href={`/documents/${id}`}>
              <BookOpen />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard;