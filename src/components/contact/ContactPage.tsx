"use client";

import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

import ContactForm from "./ContactForm";

const ease = [0.16, 1, 0.3, 1] as const;

const ContactPage = () => {
  return (
    <main dir="rtl" className="bg-background min-h-screen overflow-hidden">
      <section className="w90 py-18">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 max-w-3xl"
        >
         

          <h1 className="text-foreground text-5xl leading-[1.25] font-bold">
            با ما در ارتباط باشید
          </h1>

          <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-8">
            برای دریافت اطلاعات بیشتر درباره محصولات، مشاوره انتخاب ابزار و
            پیگیری درخواست‌های خود، می‌توانید از طریق راه‌های ارتباطی زیر با ما
            در تماس باشید.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Contact Info */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="border-border bg-secondary-bg rounded-2xl border p-8 lg:p-10"
          >
            <h2 className="text-foreground text-2xl font-bold">اطلاعات تماس</h2>

            <div className="mt-10">
              {/* Phone */}
              <div className="border-border border-b pb-7">
                <div className="flex items-center gap-3">
                  <Phone
                    size={19}
                    strokeWidth={1.7}
                    className="text-custom-primary shrink-0"
                  />

                  <span className="text-muted-foreground text-sm">
                    تلفن ثابت
                  </span>
                </div>

                <a
                  href="tel:02166733833"
                  dir="ltr"
                  className="text-foreground hover:text-custom-primary mt-4 inline-block text-[17px] transition-colors duration-300"
                >
                  021-66733833
                </a>
              </div>

              {/* Mobile */}
              <div className="border-border border-b py-7">
                <div className="flex items-center gap-3">
                  <Smartphone
                    size={19}
                    strokeWidth={1.7}
                    className="text-custom-primary shrink-0"
                  />

                  <span className="text-muted-foreground text-sm">
                    شماره همراه
                  </span>
                </div>

                <a
                  href="tel:09192081368"
                  dir="ltr"
                  className="text-foreground hover:text-custom-primary mt-4 inline-block text-[17px] transition-colors duration-300"
                >
                  09192081368
                </a>
              </div>

              {/* Email */}
              <div className="border-border border-b py-7">
                <div className="flex items-center gap-3">
                  <Mail
                    size={19}
                    strokeWidth={1.7}
                    className="text-custom-primary shrink-0"
                  />

                  <span className="text-muted-foreground text-sm">ایمیل</span>
                </div>

                <a
                  href="mailto:rcutcompany@gmail.com"
                  dir="ltr"
                  className="text-foreground hover:text-custom-primary mt-4 inline-block text-[16px] transition-colors duration-300"
                >
                  rcutcompany@gmail.com
                </a>
              </div>

              {/* Address */}
              <div className="pt-7">
                <div className="flex items-center gap-3">
                  <MapPin
                    size={19}
                    strokeWidth={1.7}
                    className="text-custom-primary shrink-0"
                  />

                  <span className="text-muted-foreground text-sm">آدرس</span>
                </div>

                <p className="text-foreground mt-4 text-[16px] leading-8">
                  تهران، خیابان امام خمینی، نرسیده به میدان حسن‌آباد،
                  <br />
                  روبه‌روی بیمارستان سینا، پاساژ نظام، طبقه دوم، واحد ۳۰۷
                </p>
              </div>
            </div>
          </motion.aside>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="border-border rounded-2xl border p-8 lg:p-10"
          >
            <h2 className="text-foreground text-2xl font-bold">
              پیام خود را ارسال کنید
            </h2>

            <p className="text-muted-foreground mt-3 text-sm leading-7">
              اطلاعات خود را وارد کنید تا درخواست شما ثبت شود.
            </p>

            <ContactForm />
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.6,
            ease,
          }}
          className="border-border mt-18 h-[300px] overflow-hidden rounded-2xl border sm:h-[350px] md:h-[380px] lg:h-[400px] xl:h-[420px]"
        >
          <iframe
            src="https://www.google.com/maps?q=35.685914,51.412051&z=15&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="موقعیت آرکات روی نقشه"
            className="border-0"
          />
        </motion.div>
      </section>
    </main>
  );
};

export default ContactPage;
