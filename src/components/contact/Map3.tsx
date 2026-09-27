"use client";


import { motion } from "framer-motion";


interface Map3Props {}

const ease = [0.16, 1, 0.3, 1] as const;

const Map3 = ({}: Map3Props) => {
  return (
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
      className="border-border mt-12 h-[300px] overflow-hidden rounded-2xl border sm:h-[350px] md:h-[380px] lg:h-[400px] xl:h-[420px]"
    >
      <iframe
        src="https://www.google.com/maps?q=35.754243,51.332173&z=15&output=embed"
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="موقعیت آرکات روی نقشه"
        className="border-0"
      />
    </motion.div>
  );
};

export default Map3;
