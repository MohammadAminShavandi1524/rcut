"use client";

import { useState } from "react";

import { Check, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FormField } from "../FormField";



type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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

    setSubmitted(true);
    reset();
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{
        opacity: 0,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
      }}
      className="mt-9"
    >
      <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
        {/* Name */}
        <FormField
          label="نام و نام خانوادگی"
          register={register("name", {
            required: "نام و نام خانوادگی را وارد کنید.",
            maxLength: {
              value: 50,
              message: "نام وارد شده بیش از حد طولانی است.",
            },
          })}
          error={errors.name}
        />

        {/* Phone */}
        <FormField
          label="شماره همراه"
          type="tel"
          dir="ltr"
          register={register("phone", {
            required: "شماره همراه را وارد کنید.",
            pattern: {
              value: /^09\d{9}$/,
              message: "شماره همراه معتبر نیست.",
            },
          })}
          error={errors.phone}
        />

        {/* Email */}
        <FormField
          label="ایمیل"
          type="email"
          dir="ltr"
          containerClassName="sm:col-span-2"
          register={register("email", {
            required: "ایمیل را وارد کنید.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "ایمیل معتبر نیست.",
            },
          })}
          error={errors.email}
        />

        {/* Message */}
        <FormField 
          as="textarea"
          label="پیام"
          containerClassName="sm:col-span-2"
          register={register("message", {
            required: "پیام خود را وارد کنید.",
            maxLength: {
              value: 500,
              message: "پیام نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.",
            },
          })}
          error={errors.message}
        />
      </div>

      {/* Success */}
      {submitted && (
        <div className="border-custom-primary/20 bg-custom-primary/5 text-custom-primary mt-6 flex items-center gap-3 rounded-lg border px-4 py-3 text-sm">
          <Check size={18} strokeWidth={2} />

          <span>پیام شما با موفقیت ثبت شد.</span>
        </div>
      )}

      {/* Submit */}
      <div className="mt-7 flex justify-end">
        <button
          type="submit"
          className="bg-custom-primary inline-flex min-h-12 min-w-[170px] cursor-pointer items-center justify-center gap-3 rounded-lg px-6 text-[15px] font-medium text-white transition-opacity duration-300 hover:opacity-90"
        >
          <span>ارسال پیام</span>

          <Send size={18} strokeWidth={1.8} />
        </button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
