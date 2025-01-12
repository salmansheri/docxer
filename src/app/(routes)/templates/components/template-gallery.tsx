"use client";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { templates } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useInsertDocuments } from "@/hooks/documents/use-insert-documents";
import { AnimatePresence, motion, useInView } from "motion/react";
import DocumentCard from "@/components/documents/document-card";
import { useSelectDocumentsByOwnerId } from "@/hooks/documents/use-select-documents";
import { SelectDocumentType } from "@/drizzle/schema";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

const TemplateGallery: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const queryPage = Number(searchParams.get("page"));

  const [page, setPage] = useState<number>(queryPage);
  const limit = 10;
  const router = useRouter();

  const templateRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const isDocumentInView = useInView(documentRef);
  const [isDocumentVisible, setIsDocumentVisible] = useState(false);
  const isInView = useInView(templateRef);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { data: documents } = useSelectDocumentsByOwnerId();

  const totalDocuments = documents?.length;
  const totalPages = Math.ceil(totalDocuments! / limit);

  const { mutate: insertDocument, isPending: isInsertDocumentPending } =
    useInsertDocuments();

  const handleTemplateClick = (title: string, initialContent: string) => {
    insertDocument(
      {
        title,
        initialContent,
      },
      {
        onSuccess: (data) => {
          router.push(`/documents/${data.id}`);
        },
      },
    );
  };

  const handleNextPage = useCallback(() => {
    if (page >= totalPages) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
    router.push(`/templates?page=${nextPage}`);
  }, [page, totalPages, router]);

  const handlePreviousPage = useCallback(() => {
    if (page <= 1) {
      return;
    }
    const previousPage = page - 1;
    setPage(previousPage);
    router.push(`/templates?page=${previousPage}`);
  }, [page, router]);

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
    }

    if (isDocumentInView && !isDocumentVisible) {
      setIsDocumentVisible(true);
    }
  }, [isInView, isVisible, isDocumentVisible, isDocumentInView]);

  useEffect(() => {
    if (queryPage < 1) {
      setPage(1);
    }
  }, [queryPage]);

  console.log({ isDocumentInView, isInView });

  const handleUpdateModalClose = useCallback(() => {
    if (isUpdateModalOpen) {
      setIsUpdateModalOpen(false);
    }
  }, [isUpdateModalOpen]);
  const handleUpdateModalOpen = useCallback(() => {
    if (!isUpdateModalOpen) {
      setIsUpdateModalOpen(true);
    }
  }, [isUpdateModalOpen]);

  return (
    <div className="relative">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4 ">
        <h3 className="font-medium">Start a new Document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map(({ id, label, imageUrl }, index) => {
              return (
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 25,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  initial={"hidden"}
                  ref={templateRef}
                  animate={isVisible ? "visible" : "hidden"}
                  transition={{
                    duration: 0.3,
                    delay: 0.5 * index + 1,
                  }}
                  key={id}
                  className="w-full"
                >
                  <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4">
                    <div
                      className={cn(
                        "aspect-[3/4] flex flex-col gap-y-2.5",
                        isInsertDocumentPending && "pointer-events-none",
                      )}
                    >
                      <button
                        onClick={() => handleTemplateClick(label, "")}
                        disabled={isInsertDocumentPending}
                        style={{
                          backgroundImage: `url(${imageUrl}`,
                        }}
                        className="size-full template-button hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                      ></button>
                      <p className="text-sm text-center font-medium truncate">
                        {label}
                      </p>
                    </div>
                  </CarouselItem>
                </motion.div>
              );
            })}
          </CarouselContent>
        </Carousel>
        <div>
          <motion.h1
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,

              ease: "easeInOut",
            }}
            className="text-3xl font-bold bg-gradient-to-tr from-rose-500 to-pink-700 bg-clip-text text-transparent my-8"
          >
            Recent Documents
          </motion.h1>
          <div className="my-16" ref={documentRef}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-between gap-5 my-8">
              <AnimatePresence>
                {documents
                  ?.slice((page - 1) * limit, page * limit)
                  .map((document: SelectDocumentType, index: number) => (
                    <motion.div
                      ref={documentRef}
                      key={document.id}
                      variants={{
                        initial: {
                          opacity: 0,
                          y: 15,
                        },
                        animate: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 2,
                            delay: 0.5 * index + 1,
                          },
                        },
                        exit: {
                          opacity: 0,
                          scale: 0.5,
                        },
                      }}
                      initial="initial"
                      animate={isDocumentInView ? "animate" : "initial"}
                      exit="exit"
                    >
                      <DocumentCard
                        handleOpen={handleUpdateModalOpen}
                        id={document.id}
                        title={document.title}
                        isOpen={isUpdateModalOpen}
                        handleClose={handleUpdateModalClose}
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              onClick={handlePreviousPage}
              disabled={page <= 1}
              variant="ghost"
            >
              <ArrowLeftCircle className="size-10" />
            </Button>
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink href={`/templates?page=${index + 1}`}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <Button
              onClick={handleNextPage}
              disabled={page >= totalPages}
              variant="ghost"
            >
              <ArrowRightCircle className="size-10" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TemplateGallery;
