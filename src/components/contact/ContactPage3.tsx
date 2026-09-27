"use client";

import Image from "next/image";
import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

import Map3 from "./Map3";
import ContactForm3 from "./ContactForm3";
import ContactBottom3 from "./ContactBottom3";

const ease = [0.16, 1, 0.3, 1] as const;

const ContactPage3 = () => {
  return (
    <main dir="rtl" className="bg-background min-h-screen overflow-hidden">
      <section className="w90 py-18">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Contact Information */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="border-border bg-background overflow-hidden rounded-2xl border"
          >
            {/* Top Contact Section */}
            <div className="border-border grid min-h-[390px] grid-cols-2 border-b">
              {/* Contact Info */}
              <div className="flex flex-col justify-center px-10 pt-14 pb-10 lg:px-12">
                <h2 className="text-foreground text-4xl font-bold">
                  تماس با ما
                </h2>

                <p className="text-foreground mt-4 text-lg font-semibold">
                  ما پای خط هستیم
                </p>

                <a
                  href="tel:02166733833"
                  dir="ltr"
                  className="text-foreground hover:text-custom-primary mt-8 flex w-fit items-center gap-3 text-2xl font-bold transition-colors duration-300"
                >
                  <PhoneCall
                    size={28}
                    strokeWidth={1.7}
                    className="text-custom-primary"
                  />

                  <span>021-66733833</span>
                </a>

                <p className="text-muted-foreground mt-6 text-sm leading-7">
                  تلفن آرکات و پشتیبانی آنلاین در ساعات کاری در اختیار شماست.
                </p>

                <div className="text-muted-foreground mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <span>شنبه تا چهارشنبه: ۹ الی ۱۷:۳۰</span>

                  <span className="bg-border hidden h-4 w-px sm:block" />

                  <span>پنجشنبه: ۹ الی ۱۳:۳۰</span>
                </div>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src="/contact/contact-support.png"
                  alt="ارتباط با آرکات"
                  fill
                  priority
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* Bottom Contact Details + Socials */}
            <ContactBottom3 />
          </motion.div>

          {/* Form */}
          <ContactForm3 />
        </div>

        {/* Map */}
        <Map3 />
      </section>
    </main>
  );
};

export default ContactPage3;
