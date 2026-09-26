import Image from "next/image";

const socials = [
  {
    name: "Instagram",
    icon: "/socials/insta.png",
    href: "#",
  },
  {
    name: "WhatsApp",
    icon: "/socials/whatsapp.jpg",
    href: "#",
  },
  {
    name: "Bale",
    icon: "/socials/bale.webp",
    href: "#",
  },
  {
    name: "Eitaa",
    icon: "/socials/eita.png",
    href: "#",
  },
];

const FooterSocials = () => {
  return (
    <div className="flex items-center gap-5">
      {socials.map((item) => (
        <a
          key={item.name}
          href={item.href}
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
        </a>
      ))}
    </div>
  );
};

export default FooterSocials;
