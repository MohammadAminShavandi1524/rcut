"use client";

import { motion } from "framer-motion";
import { Handshake, Headset, ShieldCheck } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const AboutPage2 = () => {
  return (
    <main dir="rtl" className="bg-background min-h-screen overflow-hidden">
      <section className="flex min-h-[70vh] items-center justify-center px-10 py-20  md:py-24">
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
          className="border-border w-full max-w-[1100px] rounded-2xl border py-12 text-center  md:py-16 px-16 xl:py-20"
        >
          <h1 className="text-foreground text-4xl font-bold md:text-5xl xl:text-6xl">
            درباره ما
          </h1>
          {/* 
          <p className="text-muted-foreground mx-auto mt-6 max-w-3xl text-sm leading-8 md:text-base md:leading-9">
            مرجع تامین ابزارهای تخصصی ماشین‌کاری و تجهیزات صنعتی
          </p> */}

          <p className="text-foreground mt-6 text-xl font-bold md:text-2xl">
            آرکات؛{" "}
            <span className="text-custom-primary">دقت، کیفیت، اعتماد</span>
          </p>

          <div className="text-foreground mx-auto mt-12 max-w-[960px] space-y-8 text-base leading-9 md:text-lg md:leading-10">
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

          <div className="border-border mt-12 flex items-center justify-center gap-x-6 border-t pt-8">
            {/* box 1 */}
            <div className="flex w-65 items-center rounded-md border border-white bg-[#d59b27] px-5 py-3 text-white">
              <span>
                <Handshake className="size-12" />
              </span>
              <span className="mx-4 h-14 w-0.75 rounded-lg bg-white"></span>
              <span className="">30 سال همراهی با صنعت‌گران </span>
            </div>
            {/* box 2 */}
            <div className="flex w-60 items-center rounded-md border border-white bg-[#d59b27] px-5 py-3 text-white">
              <span>
                <Headset className="size-12" />
              </span>
              <span className="mx-4 h-14 w-0.75 rounded-lg bg-white"></span>
              <span className=""> خدمات پس از فروش تخصصی </span>
            </div>
            {/* box 3 */}
            <div className="flex w-60 items-center rounded-md border border-white bg-[#d59b27] px-5 py-3 text-white">
              <span>
                <ShieldCheck className="size-12" />
              </span>
              <span className="mx-4 h-14 w-0.75 rounded-lg bg-white"></span>
              <span className="">مرجع ابزارآلات اصل اروپایی</span>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage2;
