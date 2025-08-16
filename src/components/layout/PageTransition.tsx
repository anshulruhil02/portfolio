"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // Different transition variants for different sections
  const getTransitionVariant = (path: string) => {
    switch (path) {
      case "/":
        return "flight"; // Flight motion for homepage (experience)
      case "/projects":
        return "construction"; // Building motion for projects
      default:
        return "default";
    }
  };

  const transitionVariants = {
    terminal: {
      initial: { 
        opacity: 0, 
        scale: 0.8,
        filter: "brightness(0) contrast(2)" 
      },
      animate: { 
        opacity: 1, 
        scale: 1,
        filter: "brightness(1) contrast(1)"
      },
      exit: { 
        opacity: 0, 
        scale: 1.1,
        filter: "brightness(2) contrast(0.5)"
      }
    },
    flight: {
      initial: { 
        opacity: 0, 
        x: 100,
        y: -50,
        rotate: 5
      },
      animate: { 
        opacity: 1, 
        x: 0,
        y: 0,
        rotate: 0
      },
      exit: { 
        opacity: 0, 
        x: -100,
        y: 50,
        rotate: -5
      }
    },
    construction: {
      initial: { 
        opacity: 0, 
        y: 50,
        scale: 0.9,
        rotateX: 15
      },
      animate: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotateX: 0
      },
      exit: { 
        opacity: 0, 
        y: -30,
        scale: 1.05,
        rotateX: -10
      }
    },
    default: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0
      },
      exit: { 
        opacity: 0, 
        y: -20
      }
    }
  };

  const currentVariant = getTransitionVariant(pathname);
  const variants = transitionVariants[currentVariant as keyof typeof transitionVariants];

  return (
    <>
      {/* Loading overlay with themed colors */}
      <AnimatePresence>
        <motion.div
          key={`overlay-${pathname}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`fixed inset-0 z-40 pointer-events-none ${
            pathname === "/" 
              ? "bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-blue-900/30"
              : pathname === "/projects"
              ? "bg-gradient-to-br from-orange-900/30 via-yellow-900/20 to-orange-900/30"
              : "bg-black/20"
          }`}
        />
      </AnimatePresence>

      {/* Page content with transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{
            duration: pathname === "/" ? 0.6 : pathname === "/experience" ? 0.8 : 0.7,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="relative"
          style={{ 
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Section-specific background effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {/* Terminal rain effect for home */}
            {pathname === "/terminal" && (
              <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-px bg-green-400/20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      height: `${Math.random() * 100 + 50}px`,
                    }}
                    animate={{
                      y: ["-100vh", "100vh"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "linear",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Floating particles for experience */}
            {pathname === "/" && (
              <div className="absolute inset-0">
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                    style={{
                      left: `${(i * 7 + 10) % 100}%`,
                      top: `${(i * 11 + 20) % 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, (i % 2 === 0 ? 10 : -10), 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: (i % 3 + 3),
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Dust particles for projects */}
            {pathname === "/projects" && (
              <div className="absolute inset-0">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-orange-400/20 rounded-sm"
                    style={{
                      left: `${(i * 8 + 15) % 100}%`,
                      top: `${(i * 13 + 25) % 100}%`,
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [0.5, 1, 0.5],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: (i % 3 + 4),
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Section indicator (bottom right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="fixed bottom-4 right-4 z-30 pointer-events-none"
      >
        <div className={`px-3 py-2 rounded-full text-xs font-medium backdrop-blur-sm border ${
          pathname === "/"
            ? "bg-blue-500/20 border-blue-500/30 text-blue-300"
            : pathname === "/projects"
            ? "bg-orange-500/20 border-orange-500/30 text-orange-300"
            : "bg-white/10 border-white/20 text-white"
        }`}>
          {pathname === "/" ? "✈️ Journey" : pathname === "/projects" ? "🏗️ Workshop" : ""}
        </div>
      </motion.div>
    </>
  );
}