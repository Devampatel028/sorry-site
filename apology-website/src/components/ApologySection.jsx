import { motion } from 'framer-motion';
import MessageCard from './MessageCard';
import ReelArea from './ReelArea';

export default function ApologySection({ id, title, message, reelLink, showVoice }) {
  return (
    <section id={id} className="min-h-screen w-full relative flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1150px] w-full mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-12 lg:gap-16 relative z-10 pr-0 lg:pr-24">
        
        {/* Left Side: Title & Message */}
        <div className="flex-1 w-full flex flex-col items-center md:items-start">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-3xl md:text-5xl lg:text-[54px] text-[#6F5148] text-center md:text-left mb-8 md:mb-12 leading-tight"
          >
            {title}
          </motion.h2>
          
          <MessageCard>
            {message}
          </MessageCard>
          
          {showVoice && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex items-center justify-center md:justify-start gap-2 text-[11px] tracking-[0.2em] text-[#6F5148] bg-[#FFFCF8] border border-[#D8AE82]/40 px-6 py-3 rounded-full cursor-pointer hover:bg-[#E8B6A5]/30 hover:border-[#C98282] transition-all duration-300 shadow-sm w-fit"
            >
              <span className="text-[#C98282] text-sm leading-none"></span>
              <span className="uppercase font-medium font-sans">Read this message carefully</span>
            </motion.div>
          )}
        </div>
        
        {/* Right Side: Reel Area */}
        <div className="w-full md:w-auto flex-shrink-0 flex justify-center pt-8 md:pt-0">
          <ReelArea link={reelLink} />
        </div>
        
      </div>
    </section>
  );
}
