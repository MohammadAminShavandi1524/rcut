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
    <div className="grid gap-10 p-8 lg:grid-cols-2 lg:p-10">
      {/* Contact Details */}
      <div className="grid gap-8">
        {/* Email */}
        <a href="mailto:rcutcompany@gmail.com" className="group">
          <span className="text-foreground block text-base font-semibold">ایمیل</span>

          <div className="mt-2 flex items-center gap-3">
            <Mail
              size={23}
              strokeWidth={1.7}
              className="text-custom-primary shrink-0"
            />

            <span
              dir="ltr"
              className="text-foreground/90 group-hover:text-custom-primary text-lg transition-colors duration-300 pt-0.25"
            >
              rcutcompany@gmail.com
            </span>
          </div>
        </a>

        {/* Mobile */}
        <a href="tel:09192081368" className="group">
          <span className="text-foreground block text-base font-semibold">
            شماره همراه
          </span>

          <div className="mt-1.25 flex items-center gap-2.5">
            <Smartphone
              size={23}
              strokeWidth={1.7}
              className="text-custom-primary shrink-0"
            />

            <span
              dir="ltr"
              className="text-foreground/90 group-hover:text-custom-primary text-lg  transition-colors duration-300 pt-1"
            >
              09192081368
            </span>
          </div>
        </a>
      </div>

      {/* Socials */}
      <div className="flex flex-col">
        <h3 className="text-foreground text-base font-semibold">
          شبکه‌های اجتماعی
        </h3>

        <p className="text-muted-foreground mt-3 text-[15px] leading-7">
          ما را در شبکه‌های اجتماعی دنبال کنید
        </p>

        <div className="mt-6 flex items-center gap-6">
          {socials.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-label={item.name}
              className="flex size-10 items-center justify-center overflow-hidden rounded-md"
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactBottom3;
