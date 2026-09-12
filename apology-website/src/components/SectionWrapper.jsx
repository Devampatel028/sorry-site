export default function SectionWrapper({ children, id, className = '', noPadding = false }) {
  return (
    <section 
      id={id} 
      className={`min-h-screen w-full relative flex flex-col items-center justify-center ${noPadding ? '' : 'py-24 px-6 md:px-8'} ${className}`}
    >
      <div className="max-w-[800px] w-full mx-auto flex flex-col items-center justify-center relative z-10">
        {children}
      </div>
    </section>
  );
}
