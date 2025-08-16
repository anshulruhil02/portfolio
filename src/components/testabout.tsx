"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaSpotify, FaDownload } from "react-icons/fa";
import { SiLetterboxd } from "react-icons/si";
import { HiMail } from "react-icons/hi";

export default function testAbout() {
  const [isMounted, setIsMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Transform scroll into grid perspective
  const gridRotateX = useTransform(scrollY, [0, 1000], [0, 15]);
  const gridTranslateY = useTransform(scrollY, [0, 1000], [0, -100]);

  const terminalPhrases = [
    "$ whoami",
    "anshul_ruhil: full_stack_developer",
    "$ ls skills/",
    "react/ swift/ typescript/ python/",
    "$ cat mission.txt",
    "Building the future, one commit at a time",
    "$ git status",
    "Ready to ship ✨",
  ];

  const codeSnippets = [
    {
      code: "const magic = () => {\n  return innovation + passion;\n}",
      lang: "JavaScript",
      x: 8,
      y: 15,
    },
    {
      code: "func buildDreams() {\n  SwiftUI.animate()\n}",
      lang: "Swift",
      x: 75,
      y: 12,
    },
    {
      code: "def solve_problems():\n  return elegant_solutions",
      lang: "Python",
      x: 15,
      y: 75,
    },
    {
      code: "SELECT * FROM possibilities\nWHERE impact > 0",
      lang: "SQL",
      x: 82,
      y: 65,
    },
    { code: "git commit -m 'ship it'", lang: "Bash", x: 12, y: 45 },
    {
      code: "<Component>\n  {children}\n</Component>",
      lang: "React",
      x: 72,
      y: 82,
    },
  ];

  const techNodes = [
    { name: "React", x: 22, y: 28, color: "#61DAFB" },
    { name: "Swift", x: 78, y: 22, color: "#FA7343" },
    { name: "TypeScript", x: 18, y: 62, color: "#3178C6" },
    { name: "Node.js", x: 82, y: 72, color: "#339933" },
    { name: "Python", x: 52, y: 18, color: "#3776AB" },
    { name: "AWS", x: 28, y: 82, color: "#FF9900" },
    { name: "PostgreSQL", x: 72, y: 52, color: "#336791" },
    { name: "Next.js", x: 48, y: 68, color: "#000000" },
  ];

  const socialLinks = [
    {
      name: "Github",
      url: "https://github.com/anshulruhil02",
      icon: FaGithub,
      color: "text-gray-300",
      hoverColor: "hover:text-white",
      command: "git remote -v",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anshul-ruhil-42b8451a4/",
      icon: FaLinkedin,
      color: "text-blue-400",
      hoverColor: "hover:text-blue-300",
      command: "curl linkedin.com",
    },
    {
      name: "Email",
      url: "mailto:anshulruhil02@gmail.com",
      icon: HiMail,
      color: "text-red-400",
      hoverColor: "hover:text-red-300",
      command: "send email.txt",
    },
    {
      name: "Resume",
      url: "/Resume.pdf",
      icon: FaDownload,
      color: "text-purple-400",
      hoverColor: "hover:text-purple-300",
      command: "cat resume.pdf",
      isResume: true,
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/user/nvz6y2jtzxsqpbrqk5ccofrd6?si=T-b-LqOxRs-BMahHb80emw",
      icon: FaSpotify,
      color: "text-green-400",
      hoverColor: "hover:text-green-300",
      command: "play music.mp3",
    },
    {
      name: "Letterboxd",
      url: "https://letterboxd.com/anshulruhil/",
      icon: SiLetterboxd,
      color: "text-orange-400",
      hoverColor: "hover:text-orange-300",
      command: "watch movies.sh",
    },
  ];

  // Terminal typing animation
  useEffect(() => {
    const phrase = terminalPhrases[currentPhrase];
    let i = 0;

    const typingTimer = setInterval(() => {
      if (i <= phrase.length) {
        setTypedText(phrase.slice(0, i));
        i++;
      } else {
        clearInterval(typingTimer);
        setTimeout(() => {
          setCurrentPhrase((prev) => (prev + 1) % terminalPhrases.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingTimer);
  }, [currentPhrase]);

  // Mobile Social Links Grid Component
const MobileSocialGrid = () => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.8 }}
    className="w-full mb-8"
  >
    <div className="bg-gray-800/85 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-md shadow-2xl">
      <div
        className="text-cyan-400 font-bold mb-6 text-lg border-b border-cyan-500/30 pb-2 text-center"
        style={{ textShadow: "0 0 10px rgba(6, 182, 212, 0.5)" }}
      >
        /** Connect With Me **/
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-4 bg-gray-700/40 border border-gray-600/50 rounded-lg transition-all duration-300 backdrop-blur-sm hover:border-gray-500 hover:bg-gray-600/60"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            {/* Icon Container */}
            <div className={`w-12 h-12 rounded-full ${social.color}/20 border border-current mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
              <social.icon className={`text-2xl ${social.color} ${social.hoverColor} transition-colors duration-300`} />
            </div>
            
            {/* Label */}
            <span className={`text-xs font-medium ${social.color} ${social.hoverColor} transition-colors duration-300 text-center`}>
              {social.name}
            </span>
            
            {/* Terminal Command (appears on hover) */}
            <span className="text-xs text-gray-500 font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
              $ {social.command}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  </motion.div>
);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden font-mono">
      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          rotateX: gridRotateX,
          translateY: gridTranslateY,
          perspective: "1000px",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="rgb(6, 182, 212)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </motion.div>

      {/* Floating Code Snippets - Enhanced padding and positioning */}
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute text-xs text-green-400 bg-gray-800/90 backdrop-blur-md border border-green-500/40 rounded-lg p-4 font-mono shadow-lg max-w-xs"
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [100, -50],
            x: [0, Math.sin(index) * 30],
          }}
          transition={{
            duration: 8,
            delay: index * 1.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          style={{
            left: `${snippet.x}%`,
            top: `${snippet.y}%`,
            zIndex: 10,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="text-cyan-300 text-xs mb-2 font-semibold border-b border-gray-600 pb-1">
            // {snippet.lang}
          </div>
          <pre className="whitespace-pre text-green-300 leading-relaxed">
            {snippet.code}
          </pre>
        </motion.div>
      ))}

      {/* Tech Stack Nodes with Connections - Better spacing */}
      <div className="absolute inset-4 pointer-events-none">
        {/* Connection Lines */}
        <svg className="w-full h-full absolute inset-0">
          {techNodes
            .map((node, i) =>
              techNodes.slice(i + 1).map((otherNode, j) => {
                const distance = Math.sqrt(
                  Math.pow(node.x - otherNode.x, 2) +
                    Math.pow(node.y - otherNode.y, 2)
                );
                if (distance < 35) {
                  return (
                    <motion.line
                      key={`${i}-${j}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${otherNode.x}%`}
                      y2={`${otherNode.y}%`}
                      stroke="rgba(6, 182, 212, 0.4)"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, delay: i * 0.2 }}
                    />
                  );
                }
                return null;
              })
            )
            .flat()}
        </svg>

        {/* Tech Nodes - Enhanced hover states and labels */}
        {techNodes.map((node, index) => (
          <motion.div
            key={node.name}
            className="absolute group"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.2 }}
          >
            {/* Node Circle */}
            <div
              className="w-5 h-5 rounded-full border-2 bg-gray-900 relative"
              style={{
                borderColor: node.color,
                boxShadow: `0 0 25px ${node.color}60`,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: node.color }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Node Label - Enhanced visibility and positioning */}
            <div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-800/95 border border-gray-600 rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg backdrop-blur-sm"
              style={{ color: node.color }}
            >
              {node.name}
              {/* Arrow pointing up */}
              <div
                className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 border-l border-t border-gray-600"
                style={{ backgroundColor: "rgb(31, 41, 55)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content - Enhanced spacing and padding */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 sm:px-8 lg:px-12 py-8">
        {/* Terminal Header - Improved margins */}

        {/* Header Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16 px-4 w-full max-w-4xl"
        >
          {/* Right Column: Profile Picture */}
          <div className="relative flex-shrink-0 mx-auto xl:mx-0">
            {/* Gradient border container */}
            <div className="w-40 h-40 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full p-1 shadow-2xl">
              {/* Inner container with dark background */}
              <div className="w-full h-full bg-gray-900 rounded-full overflow-hidden">
                <img
                  src="/photo.JPG"
                  alt="Anshul Ruhil"
                  className="w-full h-full object-cover rounded-full transition-all duration-300 hover:scale-105"
                />
              </div>
            </div>
            {/* Online status indicator */}
            <div className="absolute -top-2 -right-2 flex items-center bg-gray-800/95 border border-green-500 rounded-full px-3 py-1 shadow-lg backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-xs text-green-400 font-mono font-medium tracking-wide">
                ONLINE
              </span>
            </div>
          </div>
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 font-mono leading-tight">
              <span className="text-white">&lt;</span>
              <span className="text-cyan-400">Anshul</span>
              <span className="text-white"> </span>
              <span className="text-blue-400">Ruhil</span>
              <span className="text-white">/&gt;</span>
            </h1>

            <div className="text-green-400 font-mono text-lg mb-8">
              <span className="text-gray-500">// </span>
              Full-Stack Developer & Technical Leader
            </div>
          </div>
        </motion.div>

        {/* Three Column Layout: Social Links | Content Stack | Profile Picture */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-7xl mb-16 px-4"
        >
          <div className="flex flex-col xl:flex-row gap-8 items-start">
            {/* Left Column: Social Links (Vertical Stack) */}
            <div className="w-full xl:w-80 flex-shrink-0">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-row xl:flex-col gap-4 overflow-x-auto xl:overflow-x-visible"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 bg-gray-800/70 border border-gray-600/50 rounded-lg px-4 py-3 transition-all duration-300 backdrop-blur-sm hover:border-gray-500 hover:bg-gray-700/80 ${social.hoverColor} flex-shrink-0 min-w-fit`}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <social.icon className="text-lg" />
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-sm font-medium ${social.color} transition-colors duration-300`}
                      >
                        {social.name}
                      </span>
                      <span className="text-xs text-gray-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        $ {social.command}
                      </span>
                    </div>
                  </motion.a>
                ))}

                <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mb-12"
        >
          <div className="bg-gray-800/95 border border-gray-600/80 rounded-t-lg p-6 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
              <span className="text-gray-400 text-sm ml-6 font-medium">
                anshul:~
              </span>
            </div>

            {/* Terminal Content */}
            <div className="text-green-400 font-mono">
              <div className="mb-2 flex items-center">
                <span className="text-cyan-400">anshul</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">$ </span>
                <span className="ml-1">{typedText}</span>
                <motion.span
                  className="inline-block w-2 h-5 bg-green-400 ml-1 rounded-sm"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </motion.div>

              </motion.div>
            </div>

            {/* Middle Column: About Me + Tech Stack (Vertical Stack) */}
            <div className="flex-1 space-y-8">
              {/* About Me Section */}
              <div className="text-gray-100 font-mono leading-relaxed text-base">
                <div className="bg-gray-800/85 border border-cyan-500/30 rounded-lg p-8 backdrop-blur-md shadow-2xl">
                  {/* Enhanced header with glow effect */}
                  <div
                    className="text-cyan-400 font-bold mb-4 text-lg border-b border-cyan-500/30 pb-2"
                    style={{ textShadow: "0 0 10px rgba(6, 182, 212, 0.5)" }}
                  >
                    /** About Me **/
                  </div>

                  {/* Enhanced text with better contrast and spacing */}
                  <p
                    className="text-gray-100 leading-relaxed mb-6 text-lg font-semibold"
                    style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}
                  >
                    Hey! I'm in my final semester studying Computer Science at the University of Waterloo, graduating December 2025. I built this site to express who I am and what I'm working toward in this industry—with detailed information about the real value I've already put out into the world.
                  </p>

                  <p
                    className="text-gray-100 leading-relaxed text-lg font-semibold"
                    style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}
                  >
                    I keep coming back to Max Weber because he saw what I experience daily: meaningful work isn't just about output, but about finding where your passion serves something larger. He wrote that our calling—our Beruf—emerges where our deepest passions align with service to something greater. For me, that calling is software engineering.
In code, I find what excites me most: the power to build systems that expand human capability. Every project I work on is both an expression of what fascinates me about technology and a contribution to solving real problems in the world.
                  </p>
                </div>
              </div>

              {/* Tech Stack Section */}
              <div className="text-gray-100 font-mono leading-relaxed text-base">
                <div className="bg-gray-800/85 border border-orange-500/30 rounded-lg p-8 backdrop-blur-md shadow-2xl">
                  {/* Enhanced header with glow effect */}
                  <div
                    className="text-orange-400 font-bold mb-4 text-lg border-b border-orange-500/30 pb-2"
                    style={{ textShadow: "0 0 10px rgba(251, 146, 60, 0.5)" }}
                  >
                    /** Tech Stack & Continuous Learning **/
                  </div>

                  {/* Enhanced intro text */}
                  <p
                    className="text-gray-100 leading-relaxed mb-6 text-base"
                    style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}
                  >
                    I'm constantly learning new technologies while deepening my
                    expertise in the stack I already know. My approach is to
                    master fundamentals deeply, then expand strategically based
                    on what problems I'm solving.
                  </p>

                  {/* Enhanced tech grid with better visibility */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                    <div className="bg-gray-700/40 border border-cyan-500/20 rounded-lg p-4">
                      <div
                        className="text-cyan-400 font-semibold mb-3 text-base"
                        style={{ textShadow: "0 0 8px rgba(6, 182, 212, 0.5)" }}
                      >
                        // Frontend & Mobile
                      </div>
                      <div
                        className="text-gray-100 space-y-2"
                        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}
                      >
                        <div>Swift/SwiftUI • iOS Development</div>
                        <div>React • Next.js • TypeScript</div>
                        <div>Angular • JavaScript (ES6+)</div>
                        <div>Kotlin/Compose • Android</div>
                      </div>
                    </div>

                    <div className="bg-gray-700/40 border border-green-500/20 rounded-lg p-4">
                      <div
                        className="text-green-400 font-semibold mb-3 text-base"
                        style={{ textShadow: "0 0 8px rgba(34, 197, 94, 0.5)" }}
                      >
                        // Backend & Infrastructure
                      </div>
                      <div
                        className="text-gray-100 space-y-2"
                        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}
                      >
                        <div>Node.js • NestJS • C# • ASP.NET</div>
                        <div>Laravel • PHP • Python</div>
                        <div>PostgreSQL • SQL</div>
                        <div>AWS (RDS, EC2, S3) • Docker</div>
                      </div>
                    </div>

                    <div className="bg-gray-700/40 border border-blue-500/20 rounded-lg p-4">
                      <div
                        className="text-blue-400 font-semibold mb-3 text-base"
                        style={{
                          textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                        }}
                      >
                        // Development & Tools
                      </div>
                      <div
                        className="text-gray-100 space-y-2"
                        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}
                      >
                        <div>REST APIs • GraphQL</div>
                        <div>Git • Selenium • K6 Testing</div>
                        <div>Prisma ORM • Swift Concurrency</div>
                        <div>MVVM • Dependency Injection</div>
                      </div>
                    </div>

                    <div className="bg-gray-700/40 border border-purple-500/20 rounded-lg p-4">
                      <div
                        className="text-purple-400 font-semibold mb-3 text-base"
                        style={{
                          textShadow: "0 0 8px rgba(168, 85, 247, 0.5)",
                        }}
                      >
                        // Emerging Tech
                      </div>
                      <div
                        className="text-gray-100 space-y-2"
                        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}
                      >
                        <div>Solidity • Web3 • DeFi</div>
                        <div>Smart Contracts • Blockchain</div>
                        <div>AI/ML Integration</div>
                        <div>Performance Analytics</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


