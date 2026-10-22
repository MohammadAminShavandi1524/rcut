import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const socials = [
  {
    name: "Instagram",
    icon: "/socials/insta.webp",
    href: "https://www.instagram.com/abzar.tarash.rasooli?igsi=YnNpanVoOGtocnNs",
  },
  {
    name: "WhatsApp",
    icon: "/socials/whatsapp.webp",
    href: "https://wa.me/989192081368",
  },
  {
    name: "Bale",
    icon: "/socials/bale.webp",
    href: "",
  },
  {
    name: "Telegram",
    icon: "/socials/Telegram_logo.webp",
    href: "https://t.me/abzar_tarash_rassoli",
  },
];

const FooterSocials = () => {
  return (
    <div className="flex items-center gap-5">
      {socials.map((item) =>
        item.href ? (
          <Link
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className={cn(
              "flex items-center justify-center overflow-hidden rounded-md",
              item.name === "WhatsApp" && "bg-background",
            )}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={32}
              height={32}
              className="object-contain"
            />
          </Link>
        ) : (
          <span
            key={item.name}
            aria-label={item.name}
            className="flex items-center justify-center overflow-hidden rounded-md"
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={32}
              height={32}
              className="object-contain"
            />
          </span>
        ),
      )}
    </div>
  );
};

export default FooterSocials;
