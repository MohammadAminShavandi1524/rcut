"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const AboutPage = () => {
  return (
    <main
      dir="rtl"
      className="bg-background min-h-screen overflow-hidden"
    >
      <section className="mx-auto max-w-[1800px] px-8 py-24 xl:px-16 2xl:px-20">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] xl:gap-20 2xl:gap-24">
          {/* Intro */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease,
            }}
            className="lg:pt-6"
          >
            <h1 className="text-foreground text-5xl leading-tight font-bold xl:text-6xl">
              درباره ما
            </h1>

            <p className="text-muted-foreground mt-7 max-w-md text-sm leading-8 xl:text-base">
              مرجع تامین ابزارهای تخصصی ماشین‌کاری و تجهیزات صنعتی
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease,
            }}
            className="border-border w-full rounded-2xl border p-8 md:p-10 xl:p-12"
          >
            <div className="space-y-7">
              <p className="text-foreground text-base leading-9 xl:text-lg xl:leading-10">
                آرکات با هدف تامین ابزارهای تخصصی تراشکاری، قالب‌سازی و CNC
                فعالیت خود را آغاز کرده است. ما تلاش می‌کنیم با ارائه محصولات
                باکیفیت از برندهای معتبر، تجربه‌ای مطمئن و حرفه‌ای برای
                صنعتگران، تولیدکنندگان و کارگاه‌های ماشین‌کاری فراهم کنیم.
              </p>

              <p className="text-muted-foreground text-base leading-9 xl:text-lg xl:leading-10">
                با تکیه بر تجربه، شناخت فنی و توجه به نیاز مشتریان، همواره در
                تلاش هستیم تا علاوه بر عرضه محصولات، در انتخاب ابزار مناسب نیز
                همراه شما باشیم.
              </p>

              <p className="text-muted-foreground text-base leading-9 xl:text-lg xl:leading-10">
                هدف ما تنها فروش ابزار نیست، بلکه ایجاد یک مرجع قابل اعتماد
                برای تامین ابزارهای صنعتی و ارائه اطلاعات تخصصی در این حوزه
                است.
              </p>
            </div>

            <div className="border-border mt-10 border-t pt-7">
              <p className="text-foreground text-xl font-bold xl:text-2xl">
                آرکات؛{" "}
                <span className="text-custom-primary">
                  دقت، کیفیت، اعتماد
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;