import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ReelLink({ url, label = "WATCH THIS REEL", delay = 0.4 }) {
  return (
    <motion.a
      href={url !== "YOUR_REEL_LINK_HERE" ? url : "#"}
      target={url !== "YOUR_REEL_LINK_HERE" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="group flex items-center justify-center gap-2 mx-auto w-fit px-6 py-2.5 rounded-full border border-champagne/60 text-xs tracking-[0.2em] text-warmbrown/80 hover:bg-peach/30 hover:border-rose/40 transition-all duration-500 mb-4"
    >
      <span className="text-xs">♡</span>
      <span className="uppercase font-medium font-sans mt-0.5">{label}</span>
      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
    </motion.a>
  );
}
