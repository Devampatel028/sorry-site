import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen w-full relative flex flex-col justify-center py-20 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1100px] mx-auto flex flex-col items-center md:items-start z-10"
      >
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-2xl md:text-3xl text-[#6F5148]/90 mb-6"
        >
          FOR SOMEONE IMPORTANT
        </motion.p>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] text-[#493A37] font-medium tracking-tight mb-8 leading-[1.1] text-center md:text-left">
          I OWE YOU<br />AN APOLOGY
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-lg md:text-xl text-[#6F5148]/80 font-light italic mb-16 font-serif max-w-[600px] text-center md:text-left"
        >
          [Hyyy MIIOOO i know you don't want to talk emotional but i want to so if you are in mood to read this my bakwas please read and read all the things if you can....  ]
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="w-full flex justify-center md:justify-start"
        >
          <Link
            to="message"
            smooth={true}
            duration={1000}
            className="group flex flex-col items-center cursor-pointer w-fit"
          >
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#6F5148]/80 group-hover:text-[#C98282] transition-colors duration-300">
              Let me explain ↓
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
