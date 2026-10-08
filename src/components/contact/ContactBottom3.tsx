"use client";

import Image from "next/image";
import { Mail, Smartphone } from "lucide-react";

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

const ContactBottom3 = () => {
  return (
    <div className="grid gap-9 p-5 sm:gap-10 sm:p-8 lg:grid-cols-2 lg:p-10">
      {/* Contact Details */}
      <div className="grid gap-7 sm:gap-8">
        <a href="mailto:rcutcompany@gmail.com" className="group min-w-0">
          <span className="text-foreground block text-sm font-semibold sm:text-base">
            ایمیل
          </span>

          <div className="mt-2 flex min-w-0 items-center gap-3">
            <Mail
              size={23}
              strokeWidth={1.7}
              className="text-custom-primary shrink-0"
            />

            <span
              dir="ltr"
              className="text-foreground/90 group-hover:text-custom-primary truncate pt-0.25 text-base transition-colors duration-300 sm:text-lg"
            >
              rcutcompany@gmail.com
            </span>
          </div>
        </a>

        <a href="tel:09192081368" className="group">
          <span className="text-foreground block text-sm font-semibold sm:text-base">
            شماره همراه
          </span>

          <div className="mt-1.5 flex items-center gap-2.5">
            <Smartphone
              size={23}
              strokeWidth={1.7}
              className="text-custom-primary shrink-0"
            />

            <span
              dir="ltr"
              className="text-foreground/90 group-hover:text-custom-primary pt-1 text-base transition-colors duration-300 sm:text-lg"
            >
              09192081368
            </span>
          </div>
        </a>
      </div>

      {/* Socials */}
      <div className="flex flex-col">
        <h3 className="text-foreground text-sm font-semibold sm:text-base">
          شبکه‌های اجتماعی
        </h3>

        <p className="text-muted-foreground mt-3 text-sm leading-7 sm:text-[15px]">
          ما را در شبکه‌های اجتماعی دنبال کنید
        </p>

        <div className="mt-5 flex items-center gap-4 sm:mt-6 sm:gap-5.25">
          {socials.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-label={item.name}
              className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md sm:size-8.5"
            >
              <Image
                src={item.icon}
                alt={item.name}
                fill
                sizes="34px"
                className="object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactBottom3;
