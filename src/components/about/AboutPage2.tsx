"use client";

import { motion } from "framer-motion";
import { Handshake, Headset, ShieldCheck } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const AboutPage2 = () => {
  return (
    <main dir="rtl" className="bg-background min-h-screen overflow-hidden">
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-16">
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
          className="border-border w-full max-w-[1100px] rounded-2xl border px-4 py-8 text-center sm:px-6 sm:py-10 md:px-10 md:py-16 lg:px-12 xl:px-16 xl:py-20"
        >
          <h1 className="text-foreground text-3xl font-bold sm:text-4xl md:text-5xl xl:text-6xl">
            درباره ما
          </h1>

          <p className="text-foreground mt-4 text-lg font-bold sm:mt-5 sm:text-xl md:mt-6 md:text-2xl">
            آرکات؛{" "}
            <span className="text-custom-primary">دقت، کیفیت، اعتماد</span>
          </p>

          <div className="text-foreground mx-auto mt-8 max-w-[960px] space-y-5 text-justify text-sm leading-7 sm:mt-10 sm:space-y-6 sm:text-base sm:leading-8 md:mt-12 md:space-y-8 md:text-start md:text-lg md:leading-10">
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

          <div className="border-border mt-8 grid grid-cols-1 gap-3 border-t pt-6 sm:mt-10 sm:gap-4 sm:pt-7 md:mt-12 md:grid-cols-3 md:gap-4 md:pt-8">
            <div className="flex w-full items-center rounded-md border border-white bg-[#d59b27] px-4 py-3 text-white sm:px-5">
              <span className="shrink-0">
                <Handshake className="size-9 sm:size-10 lg:size-12" />
              </span>

              <span className="mx-3 h-12 w-0.75 shrink-0 rounded-lg bg-white sm:mx-4 sm:h-14" />

              <span className="text-right text-sm leading-6 sm:text-base">
                30 سال همراهی با صنعت‌گران
              </span>
            </div>

            <div className="flex w-full items-center rounded-md border border-white bg-[#d59b27] px-4 py-3 text-white sm:px-5">
              <span className="shrink-0">
                <Headset className="size-9 sm:size-10 lg:size-12" />
              </span>

              <span className="mx-3 h-12 w-0.75 shrink-0 rounded-lg bg-white sm:mx-4 sm:h-14" />

              <span className="text-right text-sm leading-6 sm:text-base">
                خدمات پس از فروش تخصصی
              </span>
            </div>

            <div className="flex w-full items-center rounded-md border border-white bg-[#d59b27] px-4 py-3 text-white sm:px-5">
              <span className="shrink-0">
                <ShieldCheck className="size-9 sm:size-10 lg:size-12" />
              </span>

              <span className="mx-3 h-12 w-0.75 shrink-0 rounded-lg bg-white sm:mx-4 sm:h-14" />

              <span className="text-right text-sm leading-6 sm:text-base">
                مرجع ابزارآلات اصل اروپایی
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage2;