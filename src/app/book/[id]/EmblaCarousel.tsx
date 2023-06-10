"use client";

import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export const EmblaCarousel = ({ children }: { children: React.ReactNode }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 5,
    loop: true,
    skipSnaps: true,
    containScroll: "trimSnaps",
  });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xl p-4">Similar Books</h3>
        <div className="flex items-center gap-3">
          <button onClick={scrollPrev}>
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button onClick={scrollNext}>
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-x -ml-1 children:basis-[20%] children:flex-shrink-0">
          {children}
        </div>
      </div>
    </>
  );
};
