import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// A simple petal SVG path
const PetalSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8 2 4 5 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5 16 2 12 2Z" opacity="0.8" />
  </svg>
);

export default function FloatingPetals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate 15 random petals
    const newPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 10 + 8, // 8px to 18px
      delay: Math.random() * 10,
      duration: Math.random() * 20 + 20, // 20s to 40s
      rotation: Math.random() * 360,
      color: ['text-blush', 'text-dustypink', 'text-peach'][Math.floor(Math.random() * 3)],
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className={`absolute ${petal.color} opacity-40`}
          style={{
            left: `${petal.left}%`,
            top: `-5%`,
            width: petal.size,
            height: petal.size,
          }}
          animate={{
            top: '105%',
            left: [`${petal.left}%`, `${petal.left + (Math.random() * 10 - 5)}%`, `${petal.left}%`],
            rotate: [petal.rotation, petal.rotation + 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <PetalSVG />
        </motion.div>
      ))}
    </div>
  );
}
