"use client";
import { FunctionComponent } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { templates } from "@/lib/constants";

const TemplateGallery: FunctionComponent = () => {
  const isCreating = false;

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
                      isCreating && "pointer-events-none",
                    )}
                  >
                    <button
                      disabled={isCreating}
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
