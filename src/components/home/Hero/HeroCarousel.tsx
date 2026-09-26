"use client";

import { useCallback, useEffect, useRef } from "react";

import useEmblaCarousel from "embla-carousel-react";

import HeroSlide from "./HeroSlide";
import HeroControls from "./HeroControls";
import { heroSlides } from "./hero.data";

const AUTOPLAY_DURATION = 6000;

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: "rtl",
  });

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;

    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_DURATION);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (!autoplayRef.current) return;

    clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  }, []);

  const prev = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext();

    startAutoplay();
  }, [emblaApi, startAutoplay]);

  const next = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();

    startAutoplay();
  }, [emblaApi, startAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;

    startAutoplay();

    return () => {
      stopAutoplay();
    };
  }, [emblaApi, startAutoplay, stopAutoplay]);

  return (
    <section
      className="relative overflow-hidden"
      dir="rtl"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="min-w-0 shrink-0 grow-0 basis-full">
              <HeroSlide slide={slide} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-20">
        <HeroControls onPrev={prev} onNext={next} />
      </div>
    </section>
  );
};

export default HeroCarousel;
