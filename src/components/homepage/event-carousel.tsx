"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EmblaCarouselType } from "embla-carousel";

interface EventCarouselProps {
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  children: React.ReactNode;
  numberOfSlides?: number;
  activeDot?: boolean;
}

const EventCarousel = ({
  loop = false,
  autoplay = true,
  autoplayDelay = 3000,
  numberOfSlides = 0,
  children,
  activeDot = false,
}: EventCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: loop,
      align: "start",
      slidesToScroll: 1,
      dragFree: numberOfSlides === 1 ? false : true,
      containScroll: "trimSnaps",
      skipSnaps: numberOfSlides === 1 ? false : false,
      breakpoints:
        numberOfSlides === 1
          ? {}
          : {
              "(min-width: 768px)": { slidesToScroll: 2 },
              "(min-width: 1024px)": { slidesToScroll: 3 },
            },
    },
    autoplay
      ? [
          Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
            stopOnFocusIn: false,
          }),
        ]
      : []
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
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

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;

    const emblaNode = emblaApi.rootNode();
    if (!emblaNode) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (event: WheelEvent) => {
      const isHorizontalScroll = Math.abs(event.deltaX) > Math.abs(event.deltaY);

      if (isHorizontalScroll) {
        event.preventDefault();

        if (!isScrolling) {
          isScrolling = true;

          if (event.deltaX > 0) {
            emblaApi.scrollNext();
          } else {
            emblaApi.scrollPrev();
          }

          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 150);
        }
      }
    };

    emblaNode.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      emblaNode.removeEventListener("wheel", handleWheel);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {!prevBtnDisabled && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1 z-10">
          <button
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors disabled:opacity-50 cursor-pointer"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      )}
      {!nextBtnDisabled && (
        <div className="absolute top-1/2 -translate-y-1/2 right-1 z-10">
          <button
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors disabled:opacity-50 cursor-pointer"
            onClick={scrollNext}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {activeDot && scrollSnaps.length > 1 && (
        <div className="absolute bottom-1 left-0 right-0 flex justify-center items-center z-10">
          <div className="flex gap-1 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  index === selectedIndex ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/70"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Carousel */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing rounded-[20px]"
        ref={emblaRef}
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          className={`flex ${numberOfSlides === 1 ? "gap-0" : "gap-2"} ${numberOfSlides === 1 ? "p-0" : "lg:p-2"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default EventCarousel;
