import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateFAQPage = (root: HTMLElement) => {
  const context = gsap.context(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const intro = root.querySelector(".faq-intro");
    const aside = root.querySelector(".faq-aside");
    const list = root.querySelector(".faq-list");
    const items = root.querySelectorAll(".faq-list-item");

    if (reduceMotion) {
      gsap.set([intro, aside, list, ...items], {
        clearProps: "all",
      });

      return;
    }

    gsap.fromTo(
      intro?.children ?? [],
      {
        opacity: 0,
        y: 16,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
      },
    );

    gsap.fromTo(
      aside?.children ?? [],
      {
        opacity: 0,
        x: 20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aside,
          start: "top 88%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 16,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: list,
          start: "top 88%",
          once: true,
        },
      },
    );
  }, root);

  return () => {
    context.revert();
  };
};

export const animateFAQAnswer = (
  root: HTMLElement,
  answer: HTMLDivElement,
  answerInner: HTMLDivElement,
  isOpen: boolean,
) => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    gsap.set(answer, {
      height: isOpen ? "auto" : 0,
    });

    gsap.set(answerInner, {
      opacity: isOpen ? 1 : 0,
      y: 0,
    });

    return;
  }

  const timeline = gsap.timeline({
    defaults: {
      overwrite: "auto",
    },
    onComplete: () => {
      ScrollTrigger.refresh();
    },
  });

  if (isOpen) {
    timeline
      .to(answer, {
        height: "auto",
        duration: 0.32,
        ease: "power2.out",
      })
      .fromTo(
        answerInner,
        {
          opacity: 0,
          y: 8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.24,
          ease: "power2.out",
        },
        "-=0.12",
      );
  } else {
    timeline
      .to(answerInner, {
        opacity: 0,
        y: 5,
        duration: 0.14,
        ease: "power1.in",
      })
      .to(
        answer,
        {
          height: 0,
          duration: 0.28,
          ease: "power2.inOut",
        },
        "-=0.03",
      );
  }

  return () => {
    timeline.kill();
  };
};
