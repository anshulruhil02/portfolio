"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useRef } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  icon: string;
  status: string;
  complexity: number;
  buildTime: string;
  team: string;
  stats: Record<string, string>;
  blueprintColor: string;
  links: {
    live?: string;
    testflight?: string;
    github: string[];
  };
}

interface ProjectConstructionCardProps {
  project: Project;
  index: number;
  onConstruct: (id: string) => void;
  isConstructing: boolean;
}

export default function Projects() {
  const [constructingProject, setConstructingProject] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Crane animation based on scroll
  const craneY = useTransform(scrollY, [0, 2000], [0, 400]);
  const craneRotation = useTransform(scrollY, [0, 2000], [0, 45]);

  const projects: Project[] = [
    {
      id: "1",
      title: "Ontario School Board Admin Software",
      description: "Multi-platform application partnering with Durham District School Board to digitize mandatory high school community service hour tracking for students and administrators.",
      category: "mobile",
      tech: ["Swift", "SwiftUI", "Kotlin", "Compose", "React", "NestJS", "PostgreSQL", "Docker", "AWS"],
      icon: "🎓",
      status: "Building",
      complexity: 5,
      buildTime: "12 months",
      team: "Solo developer",
      stats: { users: "3K+", platforms: "3", schools: "DDSB" },
      blueprintColor: "#22c55e",
      links: {
        testflight: "https://testflight.apple.com/join/jxxfMDBh/",
        github: [
          "https://github.com/anshulruhil02/service-hours-ios",
          "https://github.com/anshulruhil02/community-hours-web-dashboard",
          "https://github.com/anshulruhil02/service-hours-backend"
        ]
      }
    },
    {
      id: "2", 
      title: "WorthyTrust DeFi Platform",
      description: "Full-stack DeFi trust fund platform with automated distributions, multi-signature governance, and Fireblocks institutional custody integration supporting multiple blockchains.",
      category: "web",
      tech: ["Next.js 14", "TypeScript", "Solidity", "Web3", "Fireblocks"],
      icon: "💎",
      status: "Deployed",
      complexity: 5,
      buildTime: "8 months",
      team: "Solo developer",
      stats: { chains: "3", live: "✓", security: "OpenZeppelin" },
      blueprintColor: "#3b82f6",
      links: {
        live: "https://worthytrust.fund",
        github: ["https://github.com/anshulruhil02/trust-fund-frontend"]
      }
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900/30 to-yellow-900/20 relative overflow-hidden"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      
      {/* Animated Construction Crane */}
      <motion.div
        className="fixed top-0 right-0 w-96 h-96 pointer-events-none z-50"
        style={{ y: craneY }}
      >
        {/* Crane Mast */}
        <div className="absolute right-16 top-0 w-2 h-64 bg-gradient-to-b from-yellow-500 to-orange-600 shadow-lg"></div>
        
        {/* Crane Jib */}
        <motion.div
          className="absolute right-8 top-16 w-32 h-2 bg-gradient-to-r from-orange-600 to-yellow-500 origin-right shadow-lg"
          style={{ rotate: craneRotation }}
        >
          {/* Hook */}
          <div className="absolute right-0 top-2 w-1 h-8 bg-gray-400"></div>
          <div className="absolute right-0 top-10 w-3 h-3 bg-yellow-400 rounded-full shadow-lg animate-bounce"></div>
        </motion.div>
        
        {/* Crane Base */}
        <div className="absolute right-12 top-64 w-10 h-8 bg-orange-700 shadow-xl"></div>
      </motion.div>

      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="blueprintGrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#f59e0b" strokeWidth="0.3"/>
            </pattern>
            <pattern id="majorGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#f59e0b" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#blueprintGrid)" />
          <rect width="100" height="100" fill="url(#majorGrid)" />
        </svg>
      </div>

      {/* Floating Construction Tools */}
      {[
        { tool: "🔨", x: 10, y: 20, rotation: 45 },
        { tool: "🔧", x: 85, y: 15, rotation: -30 },
        { tool: "⚙️", x: 15, y: 70, rotation: 90 },
        { tool: "🔩", x: 80, y: 80, rotation: 0 },
        { tool: "📐", x: 5, y: 45, rotation: 15 },
        { tool: "🛠️", x: 90, y: 50, rotation: -45 }
      ].map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          animate={{
            rotate: [item.rotation, item.rotation + 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {item.tool}
        </motion.div>
      ))}

      {/* Header Section */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Construction Site Sign */}
          <motion.div
            initial={{ y: -100, rotateX: -90 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-6 rounded-lg shadow-2xl border-4 border-yellow-600 relative">
              <div className="absolute -top-2 left-4 w-8 h-4 bg-gray-600 rounded-t-lg"></div>
              <div className="absolute -top-2 right-4 w-8 h-4 bg-gray-600 rounded-t-lg"></div>
              
              <h1 className="text-3xl md:text-5xl font-black tracking-wide">
                🏗️ CONSTRUCTION SITE 🏗️
              </h1>
              <div className="text-lg md:text-xl font-bold mt-2 tracking-wider">
                PROJECT ASSEMBLY IN PROGRESS
              </div>
              <div className="text-sm font-medium mt-1 opacity-80">
                AUTHORIZED DEVELOPERS ONLY
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-8"
          >
            <p className="text-xl text-orange-200 max-w-3xl mx-auto font-medium">
              Welcome to the build site! Each project is carefully constructed with precision, 
              tested for durability, and deployed with industrial-grade quality standards.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Projects Construction Area */}
      <div className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Active Construction Site Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-4 bg-gray-800 px-8 py-4 rounded-xl border-2 border-orange-500">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-3xl"
              >
                ⚙️
              </motion.div>
              <div>
                <h2 className="text-3xl font-black text-orange-400 tracking-wider">
                  ACTIVE BUILD ZONE
                </h2>
                <p className="text-orange-200 font-medium">
                  {projects.length} projects under construction
                </p>
              </div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-3xl"
              >
                🔧
              </motion.div>
            </div>
          </motion.div>

          {/* Project Assembly Line */}
          <motion.div 
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <ProjectConstructionCard 
                key={project.id}
                project={project}
                index={index}
                onConstruct={setConstructingProject}
                isConstructing={constructingProject === project.id}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Safety Notice Footer */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 bg-gradient-to-r from-yellow-600 to-orange-600 text-black py-6 text-center font-bold"
      >
        <div className="flex items-center justify-center space-x-4">
          <span className="text-2xl">⚠️</span>
          <span className="text-lg tracking-wide">
            SAFETY FIRST - ALL PROJECTS TESTED FOR PRODUCTION READINESS
          </span>
          <span className="text-2xl">⚠️</span>
        </div>
      </motion.div>
    </div>
  );
}

// Individual Project Construction Card Component
function ProjectConstructionCard({ 
  project, 
  index, 
  onConstruct, 
  isConstructing 
}: ProjectConstructionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const buildingBlocks = project.tech.map((tech: string, i: number) => ({
    tech,
    delay: i * 0.2,
    color: `hsl(${(i * 60) % 360}, 70%, 50%)`
  }));

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 100, rotateY: -30 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onHoverStart={() => onConstruct(project.id)}
      onHoverEnd={() => onConstruct("")}
      className="relative group"
    >
      
      {/* Main Project Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-orange-500/50 hover:border-orange-400 transition-all duration-300 overflow-hidden shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105">
        
        {/* Project Header with Status */}
        <div className="relative p-6 bg-gradient-to-r from-orange-500/20 to-yellow-500/20">
          {/* Status Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border-2 ${
            project.status === 'Deployed' ? 'bg-green-500 text-black border-green-300' :
            project.status === 'Testing' ? 'bg-blue-500 text-white border-blue-300' :
            'bg-yellow-500 text-black border-yellow-300'
          }`}>
            {project.status === 'Deployed' ? '✅ DEPLOYED' :
             project.status === 'Testing' ? '🧪 TESTING' :
             '🚧 BUILDING'}
          </div>

          {/* Project Icon */}
          <motion.div
            className="text-6xl mb-4"
            animate={isConstructing ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{ duration: 0.6 }}
          >
            {project.icon}
          </motion.div>

          <h3 className="text-2xl font-black text-white mb-2 tracking-wide">
            {project.title}
          </h3>
          <p className="text-orange-200 font-medium leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project Access Panel */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg p-4 border-2 border-yellow-500/50">
            <h5 className="text-yellow-400 font-bold text-sm mb-3 tracking-wider flex items-center">
              🔐 PROJECT ACCESS
            </h5>
            
            <div className="space-y-3">
              {/* Live/TestFlight Link */}
              {(project.links.live || project.links.testflight) && (
                <motion.a
                  href={project.links.live || project.links.testflight}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 border border-green-400 group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">
                      {project.links.testflight ? "📱" : "🌐"}
                    </span>
                    <div>
                      <div className="font-bold text-sm">
                        {project.links.testflight ? "TestFlight Beta" : "Live Website"}
                      </div>
                      <div className="text-xs opacity-90">
                        {project.links.testflight ? "iOS App Preview" : "Production Deploy"}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-xl group-hover:text-yellow-300"
                  >
                    🚀
                  </motion.div>
                </motion.a>
              )}

              {/* GitHub Repositories */}
              <div>
                <div className="text-xs text-gray-400 mb-2 font-semibold tracking-wide">
                  🔧 SOURCE CODE
                </div>
                <div className="space-y-2">
                  {project.links.github.map((repo, index) => {
                    const repoName = repo.split('/').pop() || `Repo ${index + 1}`;
                    const displayName = repoName
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase());
                    
                    return (
                      <motion.a
                        key={index}
                        href={repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.01, x: 3 }}
                        whileTap={{ scale: 0.99 }}
                        className="flex items-center justify-between p-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 hover:border-gray-500 transition-all duration-200 group"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">📂</span>
                          <div>
                            <div className="text-white text-sm font-medium">
                              {displayName}
                            </div>
                            <div className="text-xs text-gray-400">
                              GitHub Repository
                            </div>
                          </div>
                        </div>
                        <motion.div
                          className="text-gray-400 group-hover:text-orange-400 transition-colors"
                          animate={{ rotate: [0, 15, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ⚙️
                        </motion.div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        {/* Building Blocks Tech Stack */}
        <div className="p-6">
          <h4 className="text-orange-400 font-bold mb-4 tracking-wider">🧱 BUILDING BLOCKS</h4>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {buildingBlocks.map((block, i) => (
              <motion.div
                key={block.tech}
                initial={{ x: -100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.8 + block.delay }}
                className="relative"
              >
                <div 
                  className="h-8 rounded border-2 border-gray-600 flex items-center justify-center text-xs font-bold text-black shadow-lg"
                  style={{ backgroundColor: block.color }}
                >
                  {block.tech}
                </div>
                {isConstructing && (
                  <motion.div
                    className="absolute inset-0 border-2 border-yellow-400 rounded animate-pulse"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Construction Progress Indicator */}
        {isConstructing && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2 }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-yellow-400"
          />
        )}
      </div>
    </motion.div>
  );
}