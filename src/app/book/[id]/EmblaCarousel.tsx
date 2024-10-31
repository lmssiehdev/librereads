"use client";

import {
	ArrowLeftIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/solid";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export const EmblaCarousel = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		slidesToScroll: 2,
		loop: true,
		containScroll: "keepSnaps",
		startIndex: 0,
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
				<h3 className="text-xl py-4">{title}</h3>
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
				<div className="flex touch-pan-x  children:basis-[40%] sm:children:basis-[20%] children:flex-shrink-0">
					{children}
				</div>
			</div>
		</>
	);
};
