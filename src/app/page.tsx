"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// We'll create these components next
import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';

export type ActiveSection = 'about' | 'experience' | 'projects';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('about');

  // Animation variants for section transitions
  const sectionVariants = {
    enter: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 1.05
    }
  };

  // Render the active section component
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      default:
        return <About />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation Header - This now includes its own spacer */}
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      {/* Main Content Area - No longer needs to account for nav height */}
      <main className="relative min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="min-h-screen w-full"
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>

        {/* Background particles/effects - Fixed z-index */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${(i * 7 + 10) % 100}%`,
                top: `${(i * 11 + 20) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: (i % 3 + 4),
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </main>

      {/* Section indicator - Fixed z-index */}
      <div className="fixed bottom-4 right-4 z-[90] pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className={`px-4 py-2.5 rounded-full text-xs font-medium backdrop-blur-sm border transition-all duration-300 shadow-lg ${
            activeSection === 'about'
              ? "bg-green-500/20 border-green-500/40 text-green-300"
              : activeSection === 'experience'
              ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
              : activeSection === 'projects'
              ? "bg-orange-500/20 border-orange-500/40 text-orange-300"
              : "bg-white/10 border-white/20 text-white"
          }`}
        >
          {activeSection === 'about' ? "👋 About" : 
           activeSection === 'experience' ? "✈️ Journey" : 
           activeSection === 'projects' ? "🏗️ Workshop" : ""}
        </motion.div>
      </div>
    </div>
  );
}