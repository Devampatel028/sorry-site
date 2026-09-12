export default function AnimatedBackground() {
  return (
    <div 
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}bg-image.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}
