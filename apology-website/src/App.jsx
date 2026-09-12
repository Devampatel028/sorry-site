import AnimatedBackground from './components/AnimatedBackground';
import FloatingNav from './components/FloatingNav';
import Hero from './sections/Hero';
import ApologySection from './components/ApologySection';
import FinalMessage from './sections/FinalMessage';
import MusicController from './components/MusicController';
import { apologyContent, reelLinks } from './content';

function App() {
  const sections = [
    {
      id: "message",
      title: "Before Anything Else...",
      message: apologyContent.shortMessage,
      reelLink: reelLinks.shortMessage,
      showVoice: true
    },
    {
      id: "past",
      title: "Where I Went Wrong",
      message: apologyContent.past,
      reelLink: reelLinks.past
    },
    {
      id: "future",
      title: "What I Want To Do Differently",
      message: apologyContent.future,
      reelLink: reelLinks.future
    },
    {
      id: "jealousy",
      title: "About The Jealousy...",
      message: apologyContent.jealousy,
      reelLink: reelLinks.jealousy
    },
    {
      id: "current",
      title: "Where We Are Now",
      message: apologyContent.current,
      reelLink: reelLinks.current
    },
    {
      id: "you",
      title: "What Are You To Me?",
      message: apologyContent.whatYouMean,
      reelLink: reelLinks.whatYouMean
    },
    {
      id: "promise",
      title: "A Promise",
      message: apologyContent.promise,
      reelLink: reelLinks.promise
    },
    {
      id: "choice",
      title: "And This Is My Choice",
      message: apologyContent.choice,
      reelLink: reelLinks.choice
    }
  ];

  return (
    <>
      <AnimatedBackground />
      <FloatingNav />
      <MusicController />
      
      <main className="relative flex flex-col w-full overflow-hidden">
        <Hero />
        
        {sections.map(section => (
          <ApologySection 
            key={section.id}
            id={section.id}
            title={section.title}
            message={section.message}
            reelLink={section.reelLink}
            showVoice={section.showVoice}
          />
        ))}
        
        <FinalMessage />
      </main>
    </>
  );
}

export default App;
