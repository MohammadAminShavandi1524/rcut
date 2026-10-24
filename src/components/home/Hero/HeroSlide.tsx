import Image from "next/image";

type Props = {
  slide: {
    image: string;
    mobileImage: string;
    title: string;
    description: string;
  };
  priority?: boolean;
};

const HeroSlide = ({ slide, priority = false }: Props) => {
  return (
    <div
      className="xss:h-[560px] relative h-[520px] w-full overflow-hidden min-[480px]:h-[550px] sm:h-[600px] lg:h-[650px] xl:h-[700px]"
      dir="rtl"
    >
      {/* Mobile Image: Below 480px */}
      <Image
        src={slide.mobileImage}
        alt={slide.title}
        fill
        priority={priority}
        sizes="(max-width: 479px) 100vw, 1px"
        className="object-cover min-[480px]:hidden"
      />

      {/* Desktop / Tablet Image: 480px And Above */}
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority={priority}
        sizes="(min-width: 480px) 100vw, 1px"
        className="hidden object-cover min-[480px]:block"
      />

      {/* Image Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/45 sm:bg-black/40" />

      {/* Text Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="w90">
          <div className="max-w-xl pb-12 text-right text-white min-[480px]:pb-0">
            <h1 className="xss:text-[30px] text-[28px] leading-[1.6] font-bold min-[480px]:text-[34px] sm:text-[40px] lg:text-[44px] xl:text-5xl xl:leading-[1.4]">
              {slide.title}
            </h1>

            <p className="mt-4 max-w-[460px] text-[13px] leading-7 text-white/85 min-[480px]:text-sm sm:mt-5 sm:text-base sm:leading-8 lg:text-[17px] xl:mt-6 xl:text-lg xl:leading-9 xl:text-white/80">
              {slide.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
