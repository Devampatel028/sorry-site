import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReelArea({ link }) {
  const hasLink = Boolean(link && link.trim() !== "");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative w-[250px] md:w-[290px] lg:w-[310px] aspect-[2/3] rounded-[24px] overflow-hidden shadow-[0_15px_40px_rgba(160,110,90,0.15)] border border-[#D8AE82]/40 mx-auto md:ml-auto md:mr-0 flex-shrink-0 z-10"
    >
      {/* The uploaded reel image as the background of this container */}
      <img
        src="/reel-image.png"
        alt="Reel background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Button placed at the bottom portion of the reel */}
      <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 w-full flex justify-center z-10">
        <a
          href={hasLink ? link : "#"}
          target={hasLink ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full transition-all duration-300 w-[190px] h-[44px] ${
            hasLink 
              ? "bg-[#FFFCF8] border border-[#E8B6A5] shadow-[0_5px_15px_rgba(111,81,72,0.1)] text-[#6F5148] hover:bg-[#FFFCF8] hover:border-[#C98282] cursor-pointer" 
              : "bg-[#FFFCF8]/80 border border-[#D8AE82]/30 text-[#6F5148]/50 cursor-default"
          }`}
          onClick={(e) => !hasLink && e.preventDefault()}
        >
          <span className="uppercase font-sans font-medium text-[11px] tracking-[0.1em] mt-0.5 whitespace-nowrap">
            WATCH THIS REEL
          </span>
          {hasLink && <ArrowUpRight className="w-4 h-4 flex-shrink-0" />}
        </a>
      </div>
    </motion.div>
  );
}
