"use client";

import { motion } from "framer-motion";
import { Handshake, Headset, PhoneCall, ShieldCheck } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    id: 1,
    icon: Handshake,
    title: "30 سال همراهی با صنعتگران",
  },
  {
    id: 2,
    icon: Headset,
    title: "خدمات پس از فروش تخصصی",
  },
  {
    id: 3,
    icon: PhoneCall,
    title: "مشاوره تلفنی رایگان و ارتباط مؤثر",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "مرجع ابزارآلات اصل و ضمانت اصالت کالا",
  },
];

const AboutPage2 = () => {
  return (
    <main dir="rtl" className="bg-background min-h-screen overflow-hidden">
      <section className="flex min-h-[75vh] items-center justify-center px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-16 lg:py-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="border-border w-full max-w-[1400px] rounded-2xl border px-5 py-10 text-center sm:px-8 sm:py-12 md:px-12 md:py-14 lg:px-16 lg:py-16 xl:px-16 xl:py-18"
        >
          {/* Title */}
          <h1 className="text-foreground text-[36px] leading-[1.5] font-bold sm:text-[42px] md:text-[48px] lg:text-[54px] xl:text-[58px]">
            درباره ما
          </h1>

          {/* Subtitle */}
          <p className="text-foreground mt-4 text-lg font-bold sm:mt-5 sm:text-xl md:text-[22px]">
            آرکات؛{" "}
            <span className="text-custom-primary">دقت، کیفیت، اعتماد</span>
          </p>

          {/* Description */}
          <div className="text-foreground mx-auto mt-10 max-w-[1120px] space-y-6 text-justify text-sm leading-8 sm:mt-12 sm:space-y-7 sm:text-base sm:leading-9 md:mt-14 md:space-y-8 md:text-[17px] md:leading-10">
            <p>
              آرکات با هدف تامین ابزارهای تخصصی تراشکاری، قالب‌سازی و CNC فعالیت
              خود را آغاز کرده است. ما تلاش می‌کنیم با ارائه محصولات باکیفیت از
              برندهای معتبر، تجربه‌ای مطمئن و حرفه‌ای برای صنعتگران،
              تولیدکنندگان و کارگاه‌های ماشین‌کاری فراهم کنیم.
            </p>

            <p className="text-muted-foreground">
              با تکیه بر تجربه، شناخت فنی و توجه به نیاز مشتریان، همواره در تلاش
              هستیم تا علاوه بر عرضه محصولات، در انتخاب ابزار مناسب نیز همراه
              شما باشیم. هدف ما تنها فروش ابزار نیست، بلکه ایجاد یک مرجع قابل
              اعتماد برای تامین ابزارهای صنعتی و ارائه اطلاعات تخصصی در این حوزه
              است.
            </p>
          </div>

          {/* Features */}
          <div className="border-border mt-12 border-t pt-8 sm:mt-14 sm:pt-9 md:mt-14 md:pt-9">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.id}
                    className="flex  w-full items-center rounded-lg bg-[#d59b27] px-5 py-4 text-white  lg:px-4 xl:px-5"
                  >
                    {/* Icon */}
                    <span className="flex shrink-0 items-center justify-center">
                      <Icon
                        className="size-10 sm:size-11 lg:size-10 xl:size-12"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>

                    {/* Divider */}
                    <span
                      className="mx-4 h-12 w-[2px] shrink-0 rounded-full bg-white/90 sm:h-14 lg:mx-3 xl:mx-4"
                      aria-hidden="true"
                    />

                    {/* Text */}
                    <span className="min-w-0 flex-1 text-center text-[14px] leading-7 font-semibold sm:text-[15px] lg:text-[13px] lg:leading-6 xl:text-[15px] xl:leading-7 2xl:text-base">
                      {feature.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage2;
