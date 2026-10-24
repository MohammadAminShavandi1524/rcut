import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "desktop" | "mobile" | "sidebar";
};

const Logo = ({ variant = "desktop" }: LogoProps) => {
  if (variant === "mobile") {
    return (
      <Link
        href="/"
        aria-label="آرکات - صفحه اصلی"
        className="flex shrink-0 items-center"
      >
        <div className="s:w-[80px] relative aspect-[459/321] w-[75px] shrink-0 sm:w-[85px] md:w-[90px]">
          <Image
            src="/logo2.webp"
            alt="آرکات"
            fill
            priority
            sizes="(min-width: 768px) 90px, (min-width: 640px) 85px, (min-width: 480px) 80px, 75px"
            className="object-contain"
          />
        </div>
      </Link>
    );
  }

  if (variant === "sidebar") {
    return (
      <Link
        href="/"
        aria-label="آرکات - صفحه اصلی"
        className="flex shrink-0 items-center"
      >
        <div className="relative aspect-[459/321] w-[80px] shrink-0">
          <Image
            src="/logo2.webp"
            alt="آرکات"
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link href="/" aria-label="RCUT" className="flex shrink-0 items-center">
      <Image
        src="/logo2.webp"
        alt="RCUT"
        width={459}
        height={321}
        priority
        className="3xl:w-[105px] h-auto w-[75px] object-contain xl:w-[85px] 2xl:w-[95px]"
      />
    </Link>
  );
};

export default Logo;
