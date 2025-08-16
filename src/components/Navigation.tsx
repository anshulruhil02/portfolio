"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ActiveSection } from '@/app/page';
import styles from './Navigation.module.css';

interface NavigationProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest(`.${styles.nav}`)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleResumeClick = () => {
    window.open('/Resume.pdf', '_blank');
    if (isMobile) setIsMobileMenuOpen(false);
  };

  const handleNavItemClick = (section: ActiveSection) => {
    setActiveSection(section);
    if (isMobile) setIsMobileMenuOpen(false);
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
              onClick={() => handleNavItemClick('about')}
            >
              <div className={styles.logoIcon}>
                <span className={styles.logoText}>R</span>
              </div>
              <div className={styles.logoInfo}>
                <h1 className={styles.logoTitle}>RuhilTech</h1>
                <p className={styles.logoSubtitle}>Full-Stack Developer</p>
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            {isMobile && (
              <motion.button
                className={styles.mobileMenuButton}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <div className={styles.menuDots}>
                  <motion.span 
                    className={styles.dot}
                    animate={{ 
                      scale: isMobileMenuOpen ? 0.8 : 1,
                      rotate: isMobileMenuOpen ? 45 : 0 
                    }}
                  />
                  <motion.span 
                    className={styles.dot}
                    animate={{ 
                      opacity: isMobileMenuOpen ? 0 : 1,
                      scale: isMobileMenuOpen ? 0.5 : 1 
                    }}
                  />
                  <motion.span 
                    className={styles.dot}
                    animate={{ 
                      scale: isMobileMenuOpen ? 0.8 : 1,
                      rotate: isMobileMenuOpen ? -45 : 0 
                    }}
                  />
                </div>
              </motion.button>
            )}

            {/* Desktop Navigation Links */}
            {!isMobile && (
              <div className={styles.navLinksContainer}>
                <div className={styles.navLinks}>
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.key;
                    
                    return (
                      <motion.button
                        key={item.key}
                        onClick={() => handleNavItemClick(item.key)}
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
            )}

            {/* Reduced right spacer to give more room to nav links */}
            {!isMobile && <div className={styles.spacerRightSmall} />}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobile && isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={styles.mobileMenu}
            >
              <div className={styles.mobileMenuContent}>
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.key;
                  
                  return (
                    <motion.button
                      key={item.key}
                      onClick={() => handleNavItemClick(item.key)}
                      className={`${styles.mobileMenuItem} ${isActive ? styles.active : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={styles.mobileMenuItemContent}>
                        <span className={styles.mobileMenuItemName}>{item.name}</span>
                        <span className={styles.mobileMenuItemDesc}>{item.description}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileTab"
                          className={styles.mobileActiveIndicator}
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}

                {/* Mobile Resume Button */}
                <motion.button
                  onClick={handleResumeClick}
                  className={`${styles.mobileMenuItem} ${styles.mobileResumeButton}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={styles.mobileMenuItemContent}>
                    <span className={styles.mobileMenuItemName}>Resume</span>
                    <span className={styles.mobileMenuItemDesc}>Download PDF</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}