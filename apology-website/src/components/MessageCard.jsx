import { motion } from 'framer-motion';

export default function MessageCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      className="w-full max-w-[650px] bg-[#FFFCF8] p-8 md:p-12 rounded-lg text-left shadow-[0_15px_40px_rgba(160,110,90,0.10)] border border-[#D8AE82]/30 relative paper-texture mx-auto md:mx-0"
    >
      <div className="text-center mb-6 text-[#6F5148]/40 text-sm">♡</div>
      
      <p className="text-lg md:text-xl leading-[2] text-[#493A37] font-serif italic text-left whitespace-pre-line">
        {children}
      </p>
      
      <div className="mt-8 flex justify-center">
        <div className="w-12 h-[1px] bg-[#D8AE82]/60"></div>
      </div>
    </motion.div>
  );
}
