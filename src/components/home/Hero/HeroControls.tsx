"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

const HeroControls = ({ onPrev, onNext }: Props) => {
  return (
    <div className="flex gap-2.5" dir="ltr">
      <button
        type="button"
        onClick={onPrev}
        aria-label="previous slide"
        className="cursor-pointer flex size-12 items-center justify-center rounded-xl border border-white/20 bg-primary/70 text-primary-foreground backdrop-blur-md transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground active:scale-95"
      >
        <ArrowLeft className="size-5" strokeWidth={1.8} />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="next slide"
        className="cursor-pointer flex size-12 items-center justify-center rounded-xl border border-white/20 bg-primary/70 text-primary-foreground backdrop-blur-md transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground active:scale-95"
      >
        <ArrowRight className="size-5" strokeWidth={1.8} />
      </button>
    </div>
  );
};

export default HeroControls;
