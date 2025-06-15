"use client";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-white relative overflow-hidden">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 mb-6"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        Discover Persian Heritage
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-600 text-center max-w-2xl"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        Shop handmade carpets, timeless literature, and vibrant art from Iran.
      </motion.p>

      <motion.div
        className="mt-10 flex space-x-6"
        custom={3}
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
          Shop Now
        </button>
        <button className="px-6 py-3 border border-gray-800 rounded-md hover:bg-gray-100 transition">
          Learn More
        </button>
      </motion.div>
    </section>
  );
}
