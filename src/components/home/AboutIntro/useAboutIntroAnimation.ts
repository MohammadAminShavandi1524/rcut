"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useAboutIntroAnimation = () => {
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

      tl.from(".about-intro-title", {
        y: 25,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      })

        .from(
          ".about-intro-text p",
          {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.25",
        )

        .from(
          ".about-intro-slogan",
          {
            y: 15,
            opacity: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.2",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return sectionRef;
};

export default useAboutIntroAnimation;
