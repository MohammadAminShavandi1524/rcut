import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" aria-label="RCUT" className="flex shrink-0 items-center">
      <Image
        src="/logo.webp"
        alt="RCUT"
        width={459}
        height={321}
        priority
        className="h-auto w-[105px] object-contain"
      />
    </Link>
  );
};

export default Logo;
