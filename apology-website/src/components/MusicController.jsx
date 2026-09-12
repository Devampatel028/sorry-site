import { useState, useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import phirKabhiSrc from '../assets/music/phir-kabhi-reprise.mp3';
import tuChahiyeSrc from '../assets/music/tu-chahiye.mp3';

const TRACK_MAPPING = {
  hero: 'phirKabhi',
  message: 'phirKabhi',
  past: 'phirKabhi',
  future: 'phirKabhi',
  jealousy: 'phirKabhi',
  current: 'phirKabhi',
  you: 'tuChahiye',
  promise: 'tuChahiye',
  choice: 'tuChahiye',
  final: 'tuChahiye',
};

export default function MusicController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTrack, setActiveTrack] = useState('phirKabhi');
  const toastTimerRef = useRef(null);

  const showToast = (msg, duration = 4500) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMessage(''), duration);
  };

  // We use refs to persist audio instances and their states without causing re-renders
  const audioRefs = useRef({
    phirKabhi: null,
    tuChahiye: null
  });

  const stateRefs = useRef({
    phirKabhi: { wasPlaying: false, userPaused: false },
    tuChahiye: { wasPlaying: false, userPaused: false }
  });

  const currentTrackRef = useRef('phirKabhi');

  useEffect(() => {
    // 1. Initialize audio instances once
    const pk = new Audio(phirKabhiSrc);
    pk.loop = true;
    pk.preload = 'auto';
    
    const tc = new Audio(tuChahiyeSrc);
    tc.loop = true;
    tc.preload = 'auto';

    audioRefs.current = { phirKabhi: pk, tuChahiye: tc };

    // 2. Autoplay logic with interaction fallback
    let autoplayAttempted = false;

    const handleFirstInteraction = () => {
      if (autoplayAttempted) return;
      const current = currentTrackRef.current;
      const audio = audioRefs.current[current];
      
      // If user manually paused via button before first interaction, respect it
      if (stateRefs.current[current].userPaused) return;

      audio.play().then(() => {
        setIsPlaying(true);
        stateRefs.current[current].wasPlaying = true;
      }).catch(console.error);
      
      cleanupInteractions();
    };

    const cleanupInteractions = () => {
      autoplayAttempted = true;
      ['click', 'touchstart', 'keydown'].forEach(e => {
        document.removeEventListener(e, handleFirstInteraction);
      });
    };

    // Try immediately
    pk.play().then(() => {
      setIsPlaying(true);
      stateRefs.current.phirKabhi.wasPlaying = true;
      cleanupInteractions();
    }).catch(() => {
      // Failed. Wait for interaction.
      setIsPlaying(false);
      ['click', 'touchstart', 'keydown'].forEach(e => {
        document.addEventListener(e, handleFirstInteraction);
      });
    });

    // 3. Setup IntersectionObserver to track the active section
    const observer = new IntersectionObserver((entries) => {
      const intersecting = entries.filter(e => e.isIntersecting);
      
      if (intersecting.length > 0) {
        // Find the section that is most visible
        intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const activeSectionId = intersecting[0].target.id;
        handleSectionChange(activeSectionId);
      }
    }, { threshold: [0.1, 0.3, 0.5, 0.7, 0.9] });

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(sec => observer.observe(sec));

    // Handle the track switching logic
    const handleSectionChange = (sectionId) => {
      const newTrack = TRACK_MAPPING[sectionId];
      if (!newTrack) return;
      
      const prevTrack = currentTrackRef.current;
      if (prevTrack === newTrack) return; // No change needed

      const prevAudio = audioRefs.current[prevTrack];
      const newAudio = audioRefs.current[newTrack];

      // Save previous track state
      const wasPrevPlaying = !prevAudio.paused;
      stateRefs.current[prevTrack].wasPlaying = wasPrevPlaying;
      
      // Pause previous track (currentTime is naturally preserved by HTMLAudioElement)
      prevAudio.pause();
      
      // Update active track refs
      currentTrackRef.current = newTrack;
      setActiveTrack(newTrack);

      if (newTrack === 'tuChahiye') {
        // RULE: ALWAYS play Tu Chahiye when entering Tu Chahiye group
        stateRefs.current.tuChahiye.userPaused = false;
        newAudio.play()
          .then(() => {
            setIsPlaying(true);
            showToast("Stop the music and see this... ♡");
          })
          .catch(() => setIsPlaying(false));
      } else {
        // RULE: Returning to Phir Kabhi
        // Only play if it wasn't manually paused
        if (!stateRefs.current.phirKabhi.userPaused) {
          newAudio.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          setIsPlaying(false);
        }
      }
    };

    // 4. Handle Page Visibility (pause when tab hidden, resume when visible)
    let wasPlayingBeforeHidden = false;

    const handleVisibilityChange = () => {
      const activeTrack = currentTrackRef.current;
      const audio = audioRefs.current[activeTrack];

      if (document.visibilityState === 'hidden') {
        wasPlayingBeforeHidden = !audio.paused;
        if (wasPlayingBeforeHidden) {
          audio.pause();
          setIsPlaying(false);
        }
      } else if (document.visibilityState === 'visible') {
        if (wasPlayingBeforeHidden) {
          audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
        wasPlayingBeforeHidden = false;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cleanupInteractions();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      pk.pause();
      tc.pause();
    };
  }, []);

  const toggleMusic = () => {
    const trackName = currentTrackRef.current;
    const audio = audioRefs.current[trackName];
    
    // Tu Chahiye Special Behavior
    if (trackName === 'tuChahiye' && !audio.paused) {
      showToast("chup chap sambhad ne ketlu pyar thi aa song vagadu chu champli");
      return; // Do NOT pause
    }

    // Normal play/pause toggle
    if (audio.paused) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          stateRefs.current[trackName].userPaused = false;
          stateRefs.current[trackName].wasPlaying = true;
          if (trackName === 'tuChahiye') {
            showToast("Stop the music and see this... ♡");
          }
        })
        .catch(console.error);
    } else {
      audio.pause();
      setIsPlaying(false);
      stateRefs.current[trackName].userPaused = true;
      stateRefs.current[trackName].wasPlaying = false;
    }
  };

  return (
    <>
      <button
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FFFCF8] shadow-[0_5px_15px_rgba(111,81,72,0.2)] border border-[#D8AE82]/50 flex items-center justify-center text-[#6F5148] hover:bg-[#E8B6A5]/30 hover:border-[#C98282] transition-all duration-300"
        aria-label="Toggle Music"
      >
        {isPlaying ? <Music className="w-5 h-5 md:w-6 md:h-6" /> : <VolumeX className="w-5 h-5 md:w-6 md:h-6" />}
      </button>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-[100] bg-[#FFFCF8] border border-[#C98282]/50 shadow-[0_10px_30px_rgba(111,81,72,0.15)] px-5 py-3 rounded-xl text-[#6F5148] text-xs md:text-sm font-medium max-w-[280px] text-center"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
