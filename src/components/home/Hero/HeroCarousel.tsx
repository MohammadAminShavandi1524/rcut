"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import useEmblaCarousel from "embla-carousel-react";

import HeroSlide from "./HeroSlide";
import HeroControls from "./HeroControls";
import { heroSlides } from "./hero.data";

const AUTOPLAY_DURATION = 3000;

const HeroCarousel = () => {
  const [introFinished, setIntroFinished] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: "rtl",
  });

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoplay = useCallback(() => {
    if (!autoplayRef.current) return;

    clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  }, []);

  const startAutoplay = useCallback(() => {
    if (!emblaApi || !introFinished) return;

    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_DURATION);
  }, [emblaApi, introFinished]);

  const finishIntro = useCallback(() => {
    setIntroFinished(true);
  }, []);

  const prev = useCallback(() => {
    if (!emblaApi || !introFinished) return;

    emblaApi.scrollNext();
    startAutoplay();
  }, [emblaApi, introFinished, startAutoplay]);

  const next = useCallback(() => {
    if (!emblaApi || !introFinished) return;

    emblaApi.scrollPrev();
    startAutoplay();
  }, [emblaApi, introFinished, startAutoplay]);

  useEffect(() => {
    if (!emblaApi || !introFinished) {
      stopAutoplay();
      return;
    }

    startAutoplay();

    return () => {
      stopAutoplay();
    };
  }, [emblaApi, introFinished, startAutoplay, stopAutoplay]);

  return (
    <section
      className="relative overflow-hidden"
      dir="rtl"
      aria-label="اسلایدر معرفی محصولات"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onFocusCapture={stopAutoplay}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          startAutoplay();
        }
      }}
    >
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className="min-w-0 shrink-0 grow-0 basis-full">
              <HeroSlide slide={slide} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {introFinished && (
        <div className="absolute right-7 bottom-5 z-20 sm:right-[5%] sm:bottom-6 lg:right-8 lg:bottom-8">
          <HeroControls onPrev={prev} onNext={next} />
        </div>
      )}

      {/* Intro Logo Motion */}
      {!introFinished && (
        <div
          className="absolute inset-0 z-30 overflow-hidden bg-black"
          aria-label="لوگوموشن RCUT"
        >
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            loop={false}
            controls={false}
            onEnded={finishIntro}
            onError={finishIntro}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src="/mobile.webm"
              type="video/webm"
              media="(max-width: 639px)"
            />

            <source
              src="/22.webm"
              type="video/webm"
              media="(min-width: 640px)"
            />
          </video>
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;
