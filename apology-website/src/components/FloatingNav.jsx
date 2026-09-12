import { Link } from 'react-scroll';
import { useState } from 'react';

const sections = [
  { id: 'hero', label: '01' },
  { id: 'message', label: '02' },
  { id: 'past', label: '03' },
  { id: 'future', label: '04' },
  { id: 'jealousy', label: '05' },
  { id: 'current', label: '06' },
  { id: 'you', label: '07' },
  { id: 'promise', label: '08' },
  { id: 'choice', label: '09' },
  { id: 'final', label: '10' },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero');
  
  return (
    <div className="fixed right-4 lg:right-12 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center">
      <div className="flex flex-col items-center gap-6 relative">
        <div className="absolute top-2 bottom-6 w-[1px] bg-[#D8AE82]/40 -z-10" />
        
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <Link
              key={section.id}
              to={section.id}
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => setActiveSection(section.id)}
              className="relative flex items-center justify-center cursor-pointer group w-8 h-8"
            >
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-500 border ${
                  isActive 
                    ? 'bg-[#C98282]/80 border-[#C98282]/80 scale-[1.3] shadow-[0_0_10px_rgba(201,130,130,0.5)]' 
                    : 'bg-[#FFFCF8] border-[#D8AE82]/60 group-hover:bg-[#E8B6A5] group-hover:border-[#C98282]/50 scale-100 opacity-60'
                }`}
              />
              {isActive && (
                <div className="absolute right-6 text-[10px] font-sans tracking-widest text-[#6F5148]/70 opacity-100 transition-opacity duration-300">
                  {section.label}
                </div>
              )}
            </Link>
          );
        })}
        <div className="mt-2 text-[#6F5148]/40 text-[10px]">♡</div>
      </div>
    </div>
  );
}
