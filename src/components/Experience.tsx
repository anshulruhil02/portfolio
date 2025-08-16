// components/sections/JourneyTimeline.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  company: string;
  location: string;
  intro: string;
  bulletPoints: string[];
  technologies: string[];
  position: { x: number; y: number }; // Position along the flight path
}

// Timeline data from resume
const timelineEvents: TimelineEvent[] = [
  {
    id: "ecobee-2024",
    year: "September 2024 - April 2025",
    title: "iOS Developer",
    company: "Ecobee",
    location: "Toronto, Ontario",
    intro:
      "Leading energy management innovation through iOS development and custom framework creation.",
    bulletPoints: [
      "Engineered a comprehensive energy outage management system for the Ecobee app, handling normal outages, user-configured outages, delayed starts, offset-active modes, and mobile-determined power sources.",
      "Fascilitated in the design of a custom, composable navigation framework (SwiftUIFlow) leveraging SwiftUI's NavigationStack and strongly typed flow steps, enabling nested flows to push and return results within a single NavigationPath—all validated at compile time for greater safety and maintainability.",
      "Built on the custom SwiftUIFlow navigation framework to deliver complete thermostat‐linking flows—encompassing Bluetooth scanning, QR code reading, and link code functionality—providing a streamlined, composable user journey under one unified navigation system.",
      "Developed and resolved 50+ tickets spanning bug fixes, product features, tech debt, and tasks, utilizing SwiftUI, MVVM, Combine, Swift Concurrency, and dependency injection while implementing GraphQL networking, database queries, and caching strategies for optimized performance and modularity.",
      "Refactored the EcobeeStorage package, which manages user preferences and persisted data, for Swift 6 concurrency compliance by introducing separate async and synchronous interfaces for UserPreferenceStore, ensuring safe mutable state access and eliminating data race conditions.",
      "Led two sprints for the Ecobee Mobile Energy team, coordinating cross-functional efforts to deliver key thermostat features on schedule.",
    ],
    technologies: [
      "SwiftUI",
      "Swift Concurrency",
      "GraphQL",
      "MVVM",
      "Combine",
      "Dependency Injection",
    ],
    position: { x: 15, y: 15 },
  },
  {
    id: "openlane-2023",
    year: "September 2023 - December 2023",
    title: "iOS Developer",
    company: "OpenLane",
    location: "Toronto, Ontario",
    intro:
      "Enhanced real-time auction systems and led complete brand transition from TradeRev to OpenLane.",
    bulletPoints: [
      "Enhanced bid management systems and real-time auction updates using SwiftUI, implementing advanced state management and asynchronous data handling using Swift Concurrency.",
      "Developed 30+ UI components, views, and screens using SwiftUI and UIKit, facilitating the brand transition from TradeRev to OpenLane. This overhaul significantly improved usability and navigation.",
      "Resolved 20+ bugs, aiding in a 5% reduction in crash rates",
    ],
    technologies: [
      "SwiftUI",
      "UIKit",
      "Swift Concurrency",
      "Real-time Systems",
    ],
    position: { x: 20, y: 45 },
  },
  {
    id: "andersen-2023",
    year: "April 2023 - August 2023",
    title: "Software Developer",
    company: "Andersen Corporation",
    location: "London, Ontario",
    intro:
      "Completely transformed industrial plant data systems by migrating from legacy Classic ASP to modern C# architecture.",
    bulletPoints: [
      "Rebuilt the plant data mapping system by migrating the codebase from Classic ASP to C#, ASP.NET, SQL, and Razor for the frontend, enabling real-time data analysis, reducing data processing time by 50%, and delivering a seamless user experience.",
      "Implemented binary search and hash indexing in C#, achieving a 30% improvement in data retrieval efficiency.",
      "Spearheaded the redevelopment and deployment of the web-based plant data mapping system for managers, transforming operational workflows and achieving full adoption across all 15 production sites after earning senior management approval.",
    ],
    technologies: ["C#", "ASP.NET", "SQL", "Razor"],
    position: { x: 40, y: 60 },
  },
  {
    id: "vretta-2022",
    year: "January 2022 - August 2022",
    title: "Web and Automation Developer",
    company: "Vretta INC",
    location: "Toronto, Ontario",
    intro:
      "Led development team while automating QA processes and building interactive educational assessment platforms.",
    bulletPoints: [
      "Led and mentored a team of four developers on EQAO and BCED projects, recognized for leadership in automation and performance improvements.",
      "Accelerated the QA lifecycle by 50% by developing 60+ Selenium scripts in JavaScript and introducing K6-based automated load testing, simulating 300,000+ users.",
      "Enhanced EQAO platform performance and user experience by developing 20+ interactive assessment modules and dynamic data visualization dashboards using Angular, D3.js, and JavaScript, facilitating more effective learning gap analysis.",
      "Integrated REST APIs into assessment modules to enable real-time data retrieval and feedback, streamlining user interaction and improving platform responsiveness.",
    ],
    technologies: ["Angular", "D3.js", "Selenium", "K6", "JavaScript"],
    position: { x: 25, y: 75 },
  },
  {
    id: "ruhil-care-2022",
    year: "December 2022 - Present",
    title: "Technical Lead & Software Architect",
    company: "Ruhil Care",
    location: "Sydney, Australia - Remote",
    intro:
      "Leading offshore development team in building comprehensive healthcare management systems for disability care clinics.",
    bulletPoints: [
      "Led 4-person offshore development team in architecture and implementation of a comprehensive medical CRM system serving 200+ employees across multiple disability care clinics, managing NDIS participant data, care coordination, and operational workflows.",
      "Architected a full-stack healthcare management platform using React frontend and Laravel backend, implementing role-based access controls, real-time data synchronization, and HIPAA-compliant data handling across distributed clinic locations.",
      "Designed and coordinated cloud infrastructure decisions with AWS services including RDS for database management, EC2 for application hosting, and S3 for secure document storage, ensuring 99.9% uptime and NDIS compliance requirements.",
      "Spearheaded development of AI-powered performance evaluation system leveraging centralized data analytics to automatically assess care quality metrics, staff performance indicators, and participant outcome tracking from integrated CRM data points.",
      "Established technical standards, code review processes, and development workflows while mentoring 4-person remote development team on Laravel best practices, React optimization techniques, and healthcare data security protocols.",
      "Coordinated cross-functional requirements gathering with clinical staff and administrators to translate complex NDIS operational needs into technical specifications, ensuring seamless integration with existing care delivery workflows.",
    ],
    technologies: ["React", "Laravel", "AWS", "PostgreSQL", "AI/ML"],
    position: { x: 35, y: 30 },
  },
];

export default function Experience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showPlane, setShowPlane] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  // Initialize scroll progress immediately on mount
  useEffect(() => {
    const calculateInitialProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
      setIsInitialized(true);
    };

    // Calculate immediately
    calculateInitialProgress();

    // Also recalculate after a short delay to ensure DOM is ready
    const timer = setTimeout(calculateInitialProgress, 30);

    return () => clearTimeout(timer);
  }, []);

  // Show plane with 1 second delay after component mounts
  useEffect(() => {
    const planeTimer = setTimeout(() => {
      setShowPlane(true);
    }, 1000);

    return () => clearTimeout(planeTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render the plane until we have the initial scroll position AND 1 second has passed
  const planeOpacity = isInitialized && showPlane ? 1 : 0;

  return (
    <div ref={componentRef} className="min-h-[800vh] relative overflow-hidden">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight"
          >
            <span className="gradient-text">Industry Expereince</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
          >
            Engineered production software that powers critical operations for
            major institutions serving millions of users and businesses. The
            timeline below reveals the scale of systems I've contributed to at
            each step.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-400"
          >
            Scroll to begin the journey
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, 8, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.6 },
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="mt-8 flex justify-center"
          >
            <div className="flex flex-col items-center space-y-1">
              <svg
                className="w-6 h-3 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l9 6 9-6"
                />
              </svg>
              <svg
                className="w-6 h-3 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l9 6 9-6"
                />
              </svg>
              <svg
                className="w-6 h-3 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l9 6 9-6"
                />
              </svg>
              <svg
                className="w-6 h-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l9 6 9-6"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Plane */}
      <motion.div
        className="fixed z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: planeOpacity }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          left: `${50 + Math.sin(scrollProgress * Math.PI * 2) * 40}%`,
          top: `${15 + scrollProgress * 80}%`,
          transform: `translate(-50%, -50%) rotate(${
            Math.sin(scrollProgress * Math.PI * 4) * 25 + 90
          }deg)`,
        }}
      >
        {/* Vapor Trail */}
        <div
          className="absolute right-12 top-1/2 w-32 h-1 bg-gradient-to-r from-blue-400/60 to-transparent rounded-full transform -translate-y-1/2"
          style={{ opacity: scrollProgress > 0.1 ? 0.8 : 0.3 }}
        />

        {/* Plane */}
        <div className="w-52 h-52 transition-transform hover:scale-125">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full filter drop-shadow-lg"
          >
            <defs>
              <linearGradient
                id="planeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#60a5fa" }} />
                <stop offset="100%" style={{ stopColor: "#a78bfa" }} />
              </linearGradient>
            </defs>
            <path
              d="M20 50 L80 45 L85 50 L80 55 Z"
              fill="url(#planeGradient)"
            />
            <path
              d="M30 35 L50 45 L45 50 L35 45 Z"
              fill="url(#planeGradient)"
            />
            <path
              d="M30 65 L50 55 L45 50 L35 55 Z"
              fill="url(#planeGradient)"
            />
            <path d="M15 45 L25 50 L15 55 Z" fill="url(#planeGradient)" />
          </svg>
        </div>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative py-20 px-8 md:px-16 lg:px-24 z-10">
        {/* Vertical Timeline Line */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-600 to-blue-500 opacity-30"
          style={{ height: `calc(100% - 100px)`, top: "100px" }}
        />

        {/* Timeline Events */}
        {timelineEvents.map((event, index) => (
          <div key={event.id} className="relative mb-32">
            {/* Timeline Dot */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg z-40 border-4 border-gray-900"
              style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" }}
            />

            {/* Date Badge */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 z-30">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                {event.year}
              </div>
            </div>

            {/* Event Card */}
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`w-5/12 relative z-20 ${
                index % 2 === 0 ? "mr-auto pr-8" : "ml-auto pl-8"
              }`}
              style={{
                marginLeft: index % 2 === 0 ? "0" : "auto",
                marginRight: index % 2 === 0 ? "auto" : "0",
                [index % 2 === 0 ? "paddingRight" : "paddingLeft"]: "3rem",
              }}
            >
              <div className="glassmorphism p-8 rounded-2xl bg-gray-900/90 backdrop-blur-md">
                {" "}
                <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                  {event.title}
                </h2>
                <div className="text-lg text-purple-300 mb-1 font-medium">
                  {event.company}
                </div>
                <div className="text-md text-gray-400 mb-4 italic">
                  {event.location}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 border-l-4 border-blue-500 pl-4 bg-blue-500/5 p-4 rounded-r-lg">
                  {event.intro}
                </p>
                {/* Bullet Points */}
                <div className="mb-6">
                  <ul className="space-y-3">
                    {event.bulletPoints.map((point, i) => (
                      <li
                        key={i}
                        className="text-gray-300 leading-relaxed flex items-start"
                      >
                        <span className="text-blue-400 mr-3 mt-1 flex-shrink-0">
                          ●
                        </span>
                        <span className="text-sm md:text-base">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {event.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="w-2 h-32 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-full"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
