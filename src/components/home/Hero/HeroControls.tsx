"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

const HeroControls = ({ onPrev, onNext }: Props) => {
  return (
    <div className="flex gap-2 sm:gap-2.5" dir="ltr">
      <button
        type="button"
        onClick={onPrev}
        aria-label="اسلاید قبلی"
        className="bg-primary/70 text-primary-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground flex size-10 cursor-pointer items-center justify-center rounded-lg border border-white/20 backdrop-blur-md transition-[background-color,border-color,color,transform] duration-300 active:scale-95 sm:size-11 sm:rounded-xl lg:size-12"
      >
        <ArrowLeft className="size-[18px] sm:size-5" strokeWidth={1.8} />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="اسلاید بعدی"
        className="bg-primary/70 text-primary-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground flex size-10 cursor-pointer items-center justify-center rounded-lg border border-white/20 backdrop-blur-md transition-[background-color,border-color,color,transform] duration-300 active:scale-95 sm:size-11 sm:rounded-xl lg:size-12"
      >
        <ArrowRight className="size-[18px] sm:size-5" strokeWidth={1.8} />
      </button>
    </div>
  );
};

export default HeroControls;
