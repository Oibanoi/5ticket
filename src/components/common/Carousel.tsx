"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselProps {
  children: React.ReactNode;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  showDots?: boolean;
  showNavigation?: boolean;
  className?: string;
  slideClassName?: string;
  dotPosition?: "bottom" | "center";
  navigationStyle?: "default" | "overlay";
  onSlideChange?: (index: number) => void;
}

export const Carousel = ({
  children,
  loop = false,
  autoplay = false,
  autoplayDelay = 3000,
  showDots = false,
  showNavigation = true,
  className,
  slideClassName,
  dotPosition = "bottom",
  navigationStyle = "default",
  onSlideChange,
}: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align: "center",
      slidesToScroll: 1,
    },
    autoplay
      ? [
          Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: false,
          }),
        ]
      : []
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
      onSlideChange?.(index);
    },
    [onSlideChange]
  );

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={cn("relative", className)}>
      {/* Navigation Buttons */}
      {showNavigation && !prevBtnDisabled && (
        <button
          type="button"
          className={cn(
            "absolute z-10 transition-all",
            navigationStyle === "overlay"
              ? "top-1/2 -translate-y-1/2 left-4 lg:left-8 rounded-full w-10 h-10 bg-white/40 backdrop-blur-sm flex items-center justify-center hover:bg-white/60"
              : "top-1/2 -translate-y-1/2 -left-12 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          )}
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {showNavigation && !nextBtnDisabled && (
        <button
          type="button"
          className={cn(
            "absolute z-10 transition-all",
            navigationStyle === "overlay"
              ? "top-1/2 -translate-y-1/2 right-4 lg:right-8 rounded-full w-10 h-10 bg-white/40 backdrop-blur-sm flex items-center justify-center hover:bg-white/60"
              : "top-1/2 -translate-y-1/2 -right-12 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          )}
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Carousel Container */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing h-full flex items-center"
        ref={emblaRef}
      >
        <div className="flex">
          {childrenArray.map((child, index) => (
            <div key={index} className={cn("flex-[0_0_100%] min-w-0", slideClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {showDots && scrollSnaps.length > 1 && (
        <div
          className={cn(
            "absolute left-0 right-0 flex justify-center items-center z-10",
            dotPosition === "bottom" ? "bottom-4" : "bottom-8"
          )}
        >
          <div className="flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === selectedIndex
                    ? "w-6 bg-white shadow-lg"
                    : "w-2 bg-white/50 hover:bg-white/70"
                )}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
