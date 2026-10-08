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
      <section className="w90 py-12 sm:py-16 lg:py-18">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="border-border bg-background overflow-hidden rounded-2xl border"
          >
            {/* Top Contact Section */}
            <div className="border-border grid min-h-0 grid-cols-1 border-b sm:min-h-[390px] sm:grid-cols-2">
              {/* Contact Info */}
              <div className="flex flex-col justify-center px-5 py-9 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
                <h2 className="text-foreground text-3xl font-bold sm:text-4xl">
                  تماس با ما
                </h2>

                <p className="text-foreground mt-3 text-base font-semibold sm:mt-4 sm:text-lg">
                  ما پای خط هستیم
                </p>

                <a
                  href="tel:02166733833"
                  dir="ltr"
                  className="text-foreground hover:text-custom-primary mt-6 flex w-fit items-center gap-3 text-xl font-bold transition-colors duration-300 sm:mt-8 sm:text-2xl"
                >
                  <PhoneCall
                    size={25}
                    strokeWidth={1.7}
                    className="text-custom-primary shrink-0 sm:size-7"
                  />

                  <span>021-66733833</span>
                </a>

                <p className="text-muted-foreground mt-5 text-sm leading-7 sm:mt-6">
                  تلفن آرکات و پشتیبانی آنلاین در ساعات کاری در اختیار شماست.
                </p>

                <div className="text-muted-foreground mt-4 flex flex-col gap-2 text-xs sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 sm:text-sm">
                  <span>شنبه تا چهارشنبه: ۹ الی ۱۷:۳۰</span>

                  <span className="bg-border hidden h-4 w-px sm:block" />

                  <span>پنجشنبه: ۹ الی ۱۳:۳۰</span>
                </div>
              </div>

              {/* Image */}
              <div className="relative min-h-[230px] overflow-hidden sm:min-h-0">
                <Image
                  src="/contact/contact-support.png"
                  alt="ارتباط با آرکات"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 40vw"
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
