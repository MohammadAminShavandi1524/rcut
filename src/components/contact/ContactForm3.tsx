"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

const ContactForm3 = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("CONTACT FORM:", data);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.08, ease }}
      className="border-border bg-background rounded-2xl border p-5 sm:p-8 lg:p-10"
    >
      <h2 className="text-foreground text-xl font-bold sm:text-2xl">
        ارسال پیام
      </h2>

      <p className="text-muted-foreground mt-3 text-sm leading-7">
        فرم زیر را تکمیل کنید تا درخواست شما ثبت شود.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 sm:mt-10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 sm:gap-y-8">
          {/* Name */}
          <div className="relative">
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "نام و نام خانوادگی الزامی است.",
              })}
              className={`peer bg-background text-foreground h-13 w-full rounded-lg border px-4 text-sm transition-colors duration-300 outline-none sm:h-14 ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-border focus:border-custom-primary"
              }`}
            />

            <label
              htmlFor="name"
              className="bg-background text-foreground absolute top-0 right-4 -translate-y-1/2 px-2 text-[11px] font-medium sm:text-xs"
            >
              نام و نام خانوادگی
              <span className="ms-1 text-red-500">*</span>
            </label>

            {errors.name && (
              <p className="mt-2 px-1 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <input
              id="phone"
              type="tel"
              dir="ltr"
              {...register("phone", {
                required: "شماره همراه الزامی است.",
                pattern: {
                  value: /^09\d{9}$/,
                  message: "شماره همراه معتبر نیست.",
                },
              })}
              className={`peer bg-background text-foreground h-13 w-full rounded-lg border px-4 text-sm transition-colors duration-300 outline-none sm:h-14 ${
                errors.phone
                  ? "border-red-500 focus:border-red-500"
                  : "border-border focus:border-custom-primary"
              }`}
            />

            <label
              htmlFor="phone"
              className="bg-background text-foreground absolute top-0 right-4 -translate-y-1/2 px-2 text-[11px] font-medium sm:text-xs"
            >
              شماره همراه
              <span className="ms-1 text-red-500">*</span>
            </label>

            {errors.phone && (
              <p className="mt-2 px-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative sm:col-span-2">
            <input
              id="email"
              type="email"
              dir="ltr"
              {...register("email", {
                required: "ایمیل الزامی است.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "ایمیل معتبر نیست.",
                },
              })}
              className={`peer bg-background text-foreground h-13 w-full rounded-lg border px-4 text-sm transition-colors duration-300 outline-none sm:h-14 ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-border focus:border-custom-primary"
              }`}
            />

            <label
              htmlFor="email"
              className="bg-background text-foreground absolute top-0 right-4 -translate-y-1/2 px-2 text-[11px] font-medium sm:text-xs"
            >
              ایمیل
              <span className="ms-1 text-red-500">*</span>
            </label>

            {errors.email && (
              <p className="mt-2 px-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="relative sm:col-span-2">
            <textarea
              id="message"
              rows={6}
              {...register("message", {
                required: "پیام الزامی است.",
              })}
              className={`peer bg-background text-foreground min-h-[160px] w-full resize-none rounded-lg border px-4 py-4 text-sm leading-7 transition-colors duration-300 outline-none sm:min-h-[190px] ${
                errors.message
                  ? "border-red-500 focus:border-red-500"
                  : "border-border focus:border-custom-primary"
              }`}
            />

            <label
              htmlFor="message"
              className="bg-background text-foreground absolute top-0 right-4 -translate-y-1/2 px-2 text-[11px] font-medium sm:text-xs"
            >
              پیام
              <span className="ms-1 text-red-500">*</span>
            </label>

            {errors.message && (
              <p className="mt-2 px-1 text-xs text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        {isSubmitSuccessful && (
          <div className="border-custom-primary/20 bg-custom-primary/5 text-custom-primary mt-6 rounded-lg border px-4 py-3 text-sm">
            پیام شما با موفقیت ثبت شد.
          </div>
        )}

        <div className="mt-7 flex justify-stretch sm:mt-8 sm:justify-end">
          <button
            type="submit"
            className="bg-custom-primary inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg px-6 text-[15px] font-medium text-white transition-opacity duration-300 hover:opacity-90 sm:min-w-[170px] sm:w-auto"
          >
            <span>ارسال پیام</span>
            <Send size={18} strokeWidth={1.8} />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm3;