"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ActiveSection } from '@/app/page';
import styles from './Navigation.module.css';

interface NavigationProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const navItems = [
    { 
      name: "About", 
      key: "about" as ActiveSection,
      description: "Get to know me"
    },
    { 
      name: "Experience", 
      key: "experience" as ActiveSection,
      description: "Professional Journey"
    },
    { 
      name: "Projects", 
      key: "projects" as ActiveSection,
      description: "Built to Last"
    }
  ];

  const handleResumeClick = () => {
    window.open('/Resume.pdf', '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.spacer} />
      
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={styles.nav}
      >
        <div className={styles.navContent}>
          <div className={styles.navInner}>
            
            {/* Logo/Brand */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.logo}
              onClick={() => setActiveSection('about')}
            >
              <div className={styles.logoIcon}>
                <span className={styles.logoText}>R</span>
              </div>
              <div className={styles.logoInfo}>
                <h1 className={styles.logoTitle}>RuhilTech</h1>
                <p className={styles.logoSubtitle}>Full-Stack Developer</p>
              </div>
            </motion.div>

            {/* Navigation Links - Now taking up much more space */}
            <div className={styles.navLinksContainer}>
              <div className={styles.navLinks}>
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.key;
                  
                  return (
                    <motion.button
                      key={item.key}
                      onClick={() => setActiveSection(item.key)}
                      className={`${styles.navButton} ${isActive ? styles.active : ''}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={styles.navButtonContent}>
                        {isActive && (
                          <motion.div
                            layoutId="activeNavTab"
                            className={styles.activeBackground}
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30
                            }}
                          />
                        )}
                        
                        <span className={styles.navButtonText}>
                          {item.name}
                        </span>
                      </div>

                      {/* Tooltip */}
                      <div className={styles.tooltip}>
                        <div className={styles.tooltipContent}>
                          <div className={styles.tooltipTitle}>{item.name}</div>
                          <div className={styles.tooltipDescription}>{item.description}</div>
                        </div>
                        <div className={styles.tooltipArrow} />
                      </div>
                    </motion.button>
                  );
                })}

                {/* Resume Button */}
                <motion.button
                  onClick={handleResumeClick}
                  className={`${styles.navButton} ${styles.resumeButton}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <div className={styles.navButtonContent}>
                    <span className={styles.navButtonText}>
                      Resume
                    </span>
                  </div>

                  {/* Tooltip */}
                  <div className={styles.tooltip}>
                    <div className={styles.tooltipContent}>
                      <div className={styles.tooltipTitle}>Resume</div>
                      <div className={styles.tooltipDescription}>Download PDF</div>
                    </div>
                    <div className={styles.tooltipArrow} />
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Reduced right spacer to give more room to nav links */}
            <div className={styles.spacerRightSmall} />
          </div>
        </div>
      </motion.nav>
    </div>
  );
}