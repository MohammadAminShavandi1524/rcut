import Image from "next/image";

type Props = {
  slide: {
    image: string;
    title: string;
    description: string;
  };
};

const HeroSlide = ({ slide }: Props) => {
  return (
    <div className="relative h-[700px] w-full overflow-hidden" dir="rtl">
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full items-center">
        <div className="w90">
          <div className="max-w-xl text-right text-white">
            <h1 className="text-5xl leading-[1.4] font-bold">{slide.title}</h1>

            <p className="mt-6 text-lg leading-9 text-white/80">
              {slide.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
