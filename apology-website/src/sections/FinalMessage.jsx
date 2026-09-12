import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { apologyContent } from '../content';

export default function FinalMessage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="final" className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-6">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center relative z-10"
          >
            <h2 className="font-handwriting text-4xl md:text-5xl mb-12 text-[#6F5148]">
              One Last Thing...
            </h2>
            
            <button
              onClick={() => setIsOpen(true)}
              className="px-8 py-3 rounded-full border border-[#D8AE82]/60 text-[#6F5148] uppercase tracking-[0.2em] text-[11px] transition-all duration-700 hover:bg-[#E8B6A5]/30 hover:border-[#C98282] shadow-sm bg-[#FFFCF8]"
            >
              Open My Last Message
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            className="w-full flex flex-col items-center justify-center relative z-10 max-w-[700px] mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#FFFCF8] border border-[#D8AE82]/30 p-10 md:p-16 rounded-lg relative shadow-[0_15px_40px_rgba(160,110,90,0.1)] paper-texture"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/60 shadow-sm rotate-2"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 2 }}
                className="text-xl md:text-2xl text-[#493A37] font-serif leading-[2] mb-12 whitespace-pre-line text-left font-light italic"
              >
                {apologyContent.final}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="text-left  text-3xl md:text-4xl text-[#C98282]"
              >
                Your.........................
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
