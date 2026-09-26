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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      });

      tl.from(".about-brand-title", {
        x: 35,
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

    return () => ctx.revert();
  }, []);

  return sectionRef;
};

export default useAboutIntro2Animation;
