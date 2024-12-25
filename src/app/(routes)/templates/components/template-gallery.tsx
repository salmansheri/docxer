"use client";
import { FunctionComponent } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { templates } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useInsertDocuments } from "@/hooks/documents/use-insert-documents";

const TemplateGallery: FunctionComponent = () => {
  const router = useRouter();

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

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4 ">
        <h3 className="font-medium">Start a new Document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map(({ id, label, imageUrl }) => {
              return (
                <CarouselItem
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
                  key={id}
                >
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
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default TemplateGallery;
