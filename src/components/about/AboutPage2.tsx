"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const AboutPage2 = () => {
  return (
    <main dir="rtl" className="bg-background min-h-screen overflow-hidden">
      <section className="flex min-h-[70vh] items-center justify-center px-6 py-20 md:px-10 md:py-24">
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
          className="border-border w-full max-w-[1100px] rounded-2xl border px-8 py-12 text-center md:px-14 md:py-16 xl:px-20 xl:py-20"
        >
          <h1 className="text-foreground text-4xl font-bold md:text-5xl xl:text-6xl">
            درباره ما
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-3xl text-sm leading-8 md:text-base md:leading-9">
            مرجع تامین ابزارهای تخصصی ماشین‌کاری و تجهیزات صنعتی
          </p>

          <div className="text-foreground mx-auto mt-12 max-w-[900px] space-y-8 text-base leading-9 md:text-lg md:leading-10">
            <p>
              آرکات با هدف تامین ابزارهای تخصصی تراشکاری، قالب‌سازی و CNC فعالیت
              خود را آغاز کرده است. ما تلاش می‌کنیم با ارائه محصولات باکیفیت از
              برندهای معتبر، تجربه‌ای مطمئن و حرفه‌ای برای صنعتگران،
              تولیدکنندگان و کارگاه‌های ماشین‌کاری فراهم کنیم.
            </p>

            <p className="text-muted-foreground">
              با تکیه بر تجربه، شناخت فنی و توجه به نیاز مشتریان، همواره در تلاش
              هستیم تا علاوه بر عرضه محصولات، در انتخاب ابزار مناسب نیز همراه
              شما باشیم.
            </p>

            <p className="text-muted-foreground">
              هدف ما تنها فروش ابزار نیست، بلکه ایجاد یک مرجع قابل اعتماد برای
              تامین ابزارهای صنعتی و ارائه اطلاعات تخصصی در این حوزه است.
            </p>
          </div>

          <div className="border-border mt-12 border-t pt-8">
            <p className="text-foreground text-xl font-bold md:text-2xl">
              آرکات؛{" "}
              <span className="text-custom-primary">دقت، کیفیت، اعتماد</span>
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage2;
