// components/sections/JourneyTimeline.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  position: { x: number; y: number }; // Position along the flight path
}

// Sample timeline data - we'll replace this with real data
const timelineEvents: TimelineEvent[] = [
  {
    id: "ecobee-2024",
    year: "2024 - 2025",
    title: "Energy Innovation",
    company: "Ecobee - iOS Developer",
    description:
      "Engineered comprehensive energy management systems and created SwiftUIFlow - a custom navigation framework that revolutionized app architecture.",
    metrics: [
      { label: "Tickets Delivered", value: "50+" },
      { label: "Sprints Led", value: "2" },
    ],
    technologies: [
      "SwiftUI",
      "Swift Concurrency",
      "GraphQL",
      "MVVM",
      "Combine",
    ],
    position: { x: 15, y: 15 },
  },
  {
    id: "ruhil-care-2022",
    year: "2022 - Present",
    title: "Healthcare Innovation",
    company: "Ruhil Care - Technical Lead",
    description:
      "Architected and led development of a comprehensive medical CRM serving 200+ employees across multiple disability care clinics.",
    metrics: [
      { label: "Employees Served", value: "200+" },
      { label: "Team Members Led", value: "4" },
      { label: "Uptime", value: "99.9%" },
    ],
    technologies: ["React", "Laravel", "AWS", "PostgreSQL", "AI/ML"],
    position: { x: 35, y: 30 },
  },
  {
    id: "openlane-2023",
    year: "2023",
    title: "Auction Platform Enhancement",
    company: "OpenLane - iOS Developer",
    description:
      "Enhanced real-time auction systems and spearheaded complete brand transition from TradeRev to OpenLane.",
    metrics: [
      { label: "UI Components", value: "30+" },
      { label: "Crash Reduction", value: "5%" },
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
    year: "2023",
    title: "Industrial Transformation",
    company: "Andersen Corporation - Software Developer",
    description:
      "Completely rebuilt plant data mapping system, migrating from Classic ASP to modern C# architecture.",
    metrics: [
      { label: "Processing Speed ↑", value: "50%" },
      { label: "Sites Deployed", value: "15" },
      { label: "Retrieval Efficiency ↑", value: "30%" },
    ],
    technologies: ["C#", "ASP.NET", "SQL", "Razor"],
    position: { x: 40, y: 60 },
  },
  {
    id: "vretta-2022",
    year: "2022",
    title: "Education Technology",
    company: "Vretta INC - Web and Automation Developer",
    description:
      "Led 4-person development team while accelerating QA lifecycle by 50%.",
    metrics: [
      { label: "Users Simulated", value: "300K+" },
      { label: "QA Speed ↑", value: "50%" },
      { label: "Automation Scripts", value: "60+" },
    ],
    technologies: ["Angular", "D3.js", "Selenium", "K6", "JavaScript"],
    position: { x: 25, y: 75 },
  },
  {
    id: "projects",
    year: "Key Projects",
    title: "Building the Future",
    company: "Passion Projects & Entrepreneurship",
    description:
      "From revolutionizing school administration to pioneering DeFi trust funds - building solutions that matter.",
    metrics: [
      { label: "Users (School App)", value: "3000+" },
      { label: "Chains Supported", value: "3" },
    ],
    technologies: ["Swift", "React", "Solidity", "Next.js", "PostgreSQL"],
    position: { x: 30, y: 90 },
  },
];

export function JourneyTimeline() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeEvent, setActiveEvent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-[600vh] relative overflow-hidden">
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
            className="text-5xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-8 leading-tight"
          >
            <span className="gradient-text">The Builder's Journey</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
          >
            Follow the flight path of innovation, leadership, and technical
            excellence
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-400"
          >
            Scroll to begin the journey
          </motion.div>
        </div>
      </section>


      {/* Animated Plane */}
      <motion.div
        className="fixed z-50 pointer-events-none"
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
        <div className="w-12 h-12 transition-transform hover:scale-125">
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

      {/* Timeline Events */}
      {timelineEvents.map((event, index) => (
        <section key={event.id} className="h-[50vh] flex items-center relative">
          {/* Milestone Marker */}
          <div
            className="fixed w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg z-40"
            style={{
              left: `${event.position.x}%`,
              top: `${event.position.y}%`,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
            }}
          />

          <div className="w-[60%] md:w-[70%] lg:w-[75%] px-4 md:px-8 lg:px-12 max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full px-4 md:px-8" 
            >
              <div className="glassmorphism p-8 rounded-2xl min-h-[500px] md:min-h-[500px]">
                <div className="text-sm text-blue-400 font-semibold mb-2 tracking-wide uppercase">
                  {event.year}
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                  {event.title}
                </h2>

                <div className="text-lg text-purple-300 mb-4 font-medium">
                  {event.company}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {event.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="text-2xl font-bold gradient-text">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
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
        </section>
      ))}

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
