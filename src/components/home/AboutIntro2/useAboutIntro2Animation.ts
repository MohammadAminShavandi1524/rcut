"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useAboutIntro2Animation = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      });

      tl.from(".about-brand-title", {
        x: isMobile ? 0 : 35,
        y: isMobile ? 18 : 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      })
        .from(
          ".about-brand-line",
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.25",
        )
        .from(
          ".about-brand-description",
          {
            y: 15,
            opacity: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.15",
        )
        .from(
          ".about-content p",
          {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.3",
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return sectionRef;
};

export default useAboutIntro2Animation;
