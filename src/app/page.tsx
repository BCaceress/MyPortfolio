"use client";

import PageTransition from "@/components/PageTransition";
import {
  motion,
  useInView,
  useScroll,
  useTransform
} from "framer-motion";
import {
  ChevronDown,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  LucideIcon,
  MessageCircle
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Import the correct type from framer-motion
import type { UseInViewOptions } from "framer-motion";

// Define a custom extended interface that includes threshold
interface ScrollRevealOptions extends Omit<UseInViewOptions, 'amount'> {
  amount?: number;
  threshold?: number; // Add threshold property
}

// Custom hook for scroll reveal animations
const useScrollReveal = (options: ScrollRevealOptions = { threshold: 0.1 }) => {
  const ref = useRef(null);
  // Convert threshold to amount if threshold is provided
  const inViewOptions = options.threshold !== undefined
    ? { ...options, amount: options.threshold }
    : options;

  const isInView = useInView(ref, inViewOptions as UseInViewOptions);
  return { ref, isInView };
};

// Custom hook for typewriter effect
const useTypewriter = (
  words: string[],
  typingSpeed: number = 150,
  deletingSpeed: number = 100,
  delayBetween: number = 2000
) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeEffect = () => {
      const currentWord = words[wordIndex];
      const shouldDelete = isDeleting;

      setText(prev =>
        shouldDelete
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );

      // Handle the typing/deleting cycle
      if (!shouldDelete && text === currentWord) {
        setTimeout(() => setIsDeleting(true), delayBetween);
      } else if (shouldDelete && text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(
      typeEffect,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetween]);

  return text;
};

// Interface for the type of data used in the socialLinks array
interface SocialLink {
  href: string;
  icon: LucideIcon;
  hoverColor: string;
  hoverBgColor: string;
  ariaLabel: string;
}

export default function HomeSection() {
  const [isLoading, setIsLoading] = useState(true);
  const jobTitle = useTypewriter(['Front-end developer', 'Mobile developer', 'UI/UX Enthusiast'], 150, 100, 2000);

  // References for scroll animations
  const terminalReveal = useScrollReveal({ threshold: 0.2 });
  const svgReveal = useScrollReveal({ threshold: 0.1 });
  const headerReveal = useScrollReveal();
  const socialReveal = useScrollReveal();

  // Parallax effect for background elements
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Loading effect on initial render
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to next section function
  const scrollToNextSection = useCallback(() => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Array of social links with specific brand colors for hover
  const socialLinks: SocialLink[] = [
    {
      href: "https://github.com/BCaceress",
      icon: Github,
      hoverColor: "text-white",
      hoverBgColor: "bg-gray-900",
      ariaLabel: "GitHub Profile"
    },
    {
      href: "https://www.linkedin.com/in/brunocaceress/",
      icon: Linkedin,
      hoverColor: "text-white",
      hoverBgColor: "bg-[#0077B5]",
      ariaLabel: "LinkedIn Profile"
    },
    {
      href: "https://www.instagram.com/brunocaceress/#",
      icon: Instagram,
      hoverColor: "text-white",
      hoverBgColor: "bg-gradient-to-tr from-[#E1306C] to-[#833AB4]",
      ariaLabel: "Instagram Profile"
    },
    {
      href: "https://www.facebook.com/brunocaceress",
      icon: Facebook,
      hoverColor: "text-white",
      hoverBgColor: "bg-[#1877F2]",
      ariaLabel: "Facebook Profile"
    },
    {
      href: "https://wa.me/5551981927091",
      icon: MessageCircle,
      hoverColor: "text-white",
      hoverBgColor: "bg-[#25D366]",
      ariaLabel: "WhatsApp Contact"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <PageTransition showLoading={true} loadingDuration={2500}>
      <section
        id="home"
        className="flex flex-col items-center justify-center px-4 sm:px-8 py-16 sm:py-20 min-h-screen relative overflow-hidden"
        aria-labelledby="home-heading"
      >
        {/* Animated Background with Parallax - Enhanced for visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 z-0">
          <motion.div
            className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
            style={{ y: y1, opacity }}
          ></motion.div>
          <div className="absolute inset-0">
            <motion.div
              className="absolute -inset-[10px] bg-gradient-to-r from-blue-400/20 to-green-400/20 dark:from-blue-900/20 dark:to-green-600/20 rounded-full blur-3xl opacity-30 animate-pulse"
              style={{ y: y2 }}
            ></motion.div>
            <motion.div
              className="absolute -right-[300px] top-[100px] bg-gradient-to-l from-green-400/20 to-emerald-300/20 dark:from-green-800/20 dark:to-emerald-500/20 rounded-full w-[500px] h-[500px] blur-3xl opacity-30 animate-pulse"
              style={{
                animationDuration: '8s',
                animationDelay: '1s',
                y: useTransform(scrollY, [0, 500], [0, -150])
              }}
            ></motion.div>
            <motion.div
              className="absolute -left-[300px] bottom-[100px] bg-gradient-to-r from-blue-400/20 to-teal-400/20 dark:from-blue-800/20 dark:to-teal-600/20 rounded-full w-[500px] h-[500px] blur-3xl opacity-30 animate-pulse"
              style={{
                animationDuration: '10s',
                animationDelay: '2s',
                y: useTransform(scrollY, [0, 500], [0, -70])
              }}
            ></motion.div>
          </div>
        </div>

        {/* Content wrapper - Enhanced with improved spacing and responsive layout */}
        <motion.div
          className="max-w-6xl mx-auto w-full z-10 relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Main content container with improved responsive layout */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12 mt-10 md:mt-0">
            {/* Left side: Terminal code area with improved spacing and font size adjustments - Background removed */}
            <motion.div
              className="w-full md:w-3/5 md:-ml-16 pl-0 mt-8 md:mt-0"
              variants={itemVariants}
              ref={terminalReveal.ref}
              initial="hidden"
              animate={terminalReveal.isInView ? "visible" : "hidden"}
            >
              <div className="backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8">
                <motion.div
                  className="mb-6 md:mb-8"
                  ref={headerReveal.ref}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: "easeOut",
                        staggerChildren: 0.2
                      }
                    }
                  }}
                  initial="hidden"
                  animate={headerReveal.isInView ? "visible" : "hidden"}
                >
                  <motion.p
                    className="text-gray-600 dark:text-gray-400 text-xl sm:text-2xl font-light"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    Hello World. I am
                  </motion.p>
                  <motion.h1
                    id="home-heading"
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-500 dark:to-green-400 bg-clip-text text-transparent my-3 leading-tight tracking-tight"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    Bruno Caceres
                  </motion.h1>
                  <motion.p
                    className="text-blue-600 dark:text-green-500 text-2xl sm:text-3xl lg:text-4xl flex items-center font-medium"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    &gt;&nbsp;
                    <span className="mr-1">{jobTitle}</span>
                    <span className="animate-blink w-2 h-8 bg-blue-600 dark:bg-green-500 inline-block"></span>
                  </motion.p>
                </motion.div>

                <motion.div
                  className="font-mono text-base sm:text-lg mt-8 sm:mt-10 p-3 sm:p-4 rounded-lg"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.3, duration: 0.6 }
                    }
                  }}
                  initial="hidden"
                  animate={terminalReveal.isInView ? "visible" : "hidden"}
                >
                  <p className="text-gray-600 dark:text-gray-400">// find my profile on GitHub:</p>
                  <p className="mt-2">
                    <span className="text-blue-600 dark:text-blue-500">const</span>
                    <span className="text-green-600 dark:text-green-500"> githubLink</span>
                    <span className="text-gray-800 dark:text-white"> = </span>
                    <a
                      href="https://github.com/BCaceress"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 dark:text-orange-400 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                      aria-label="Visit my GitHub profile"
                    >
                      "https://github.com/BCaceress"
                    </a>
                    <span className="text-gray-800 dark:text-white">;</span>
                  </p>
                </motion.div>

                {/* Social links - Removed background and increased size */}
                <motion.div
                  className="flex flex-wrap gap-5 mt-8"
                  ref={socialReveal.ref}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.5, duration: 0.7 }
                    }
                  }}
                  initial="hidden"
                  animate={socialReveal.isInView ? "visible" : "hidden"}
                >
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500 relative group"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <link.icon
                        size={30}
                        className={`group-hover:${link.hoverColor} transition-all duration-300`}
                      />
                      <span className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-all duration-300 ${link.hoverBgColor} opacity-0 group-hover:opacity-100 -z-10`}></span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right side: SVG Animation with improved responsive display - Hidden on mobile */}
            <motion.div
              className="hidden md:flex w-full md:w-2/5 justify-center items-center"
              ref={svgReveal.ref}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }
              }}
              initial="hidden"
              animate={svgReveal.isInView ? "visible" : "hidden"}
            >
              <motion.div
                className="h-full w-full flex flex-col items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Programming SVG Animation */}
                <svg
                  viewBox="0 0 500 400"
                  className="w-full max-w-[500px] md:w-[150%] md:max-w-[700px]"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Developer illustration"
                >
                  {/* Abstract circuit board background */}
                  <motion.path
                    d="M20,200 Q50,100 100,150 T150,100 T250,150 T350,100 T450,200"
                    fill="none"
                    stroke="#1e40af"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: 0.5,
                      strokeDashoffset: [0, -20]
                    }}
                    transition={{
                      duration: 2,
                      strokeDashoffset: {
                        repeat: Infinity,
                        duration: 5,
                        ease: "linear"
                      }
                    }}
                  />

                  <motion.path
                    d="M50,250 Q100,200 150,250 T250,200 T350,250 T450,200"
                    fill="none"
                    stroke="#15803d"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: 0.5,
                      strokeDashoffset: [0, 20]
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.5,
                      strokeDashoffset: {
                        repeat: Infinity,
                        duration: 5,
                        ease: "linear"
                      }
                    }}
                  />

                  {/* Laptop Base */}
                  <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <rect x="175" y="250" width="150" height="10" rx="2" fill="#374151" />
                    <rect x="215" y="260" width="70" height="3" rx="1" fill="#1f2937" />
                  </motion.g>

                  {/* Laptop Screen */}
                  <motion.g
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    style={{ transformOrigin: '250px 250px' }}
                    transition={{ duration: 1.5, delay: 0.8, type: "spring" }}
                  >
                    <rect x="180" y="180" width="140" height="90" rx="4" fill="#1f2937" />
                    <rect x="185" y="185" width="130" height="80" rx="2" fill="#111827" />

                    {/* Screen Content - Code */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2, duration: 0.5 }}
                    >
                      {/* Code Lines */}
                      <rect x="190" y="195" width="50" height="3" rx="1" fill="#059669" opacity="0.8" />
                      <rect x="190" y="205" width="70" height="3" rx="1" fill="#3b82f6" opacity="0.8" />
                      <rect x="195" y="215" width="60" height="3" rx="1" fill="#ec4899" opacity="0.8" />
                      <rect x="195" y="225" width="40" height="3" rx="1" fill="#f59e0b" opacity="0.8" />
                      <rect x="190" y="235" width="65" height="3" rx="1" fill="#3b82f6" opacity="0.8" />
                      <rect x="190" y="245" width="55" height="3" rx="1" fill="#059669" opacity="0.8" />
                      <rect x="195" y="255" width="45" height="3" rx="1" fill="#ec4899" opacity="0.8" />
                    </motion.g>
                  </motion.g>

                  {/* Mobile App */}
                  <motion.g
                    initial={{ opacity: 0, x: -50 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: [0, -5, 0]
                    }}
                    transition={{
                      duration: 1,
                      delay: 1.5,
                      y: {
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <rect x="90" y="170" width="40" height="70" rx="5" fill="#1e3a8a" />
                    <rect x="93" y="175" width="34" height="60" rx="2" fill="#0c4a6e" />
                    <circle cx="110" cy="240" r="2" fill="#e5e7eb" />
                    <rect x="100" y="180" width="20" height="20" rx="2" fill="#f472b6" opacity="0.7" />
                    <rect x="100" y="205" width="20" height="5" rx="1" fill="#e5e7eb" opacity="0.7" />
                    <rect x="100" y="215" width="20" height="5" rx="1" fill="#e5e7eb" opacity="0.5" />
                    <rect x="100" y="225" width="20" height="5" rx="1" fill="#e5e7eb" opacity="0.3" />
                  </motion.g>

                  {/* Web Project */}
                  <motion.g
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: [0, -8, 0]
                    }}
                    transition={{
                      duration: 1,
                      delay: 1.8,
                      y: {
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <rect x="370" y="180" width="70" height="60" rx="3" fill="#065f46" />
                    <rect x="370" y="180" width="70" height="10" rx="3" fill="#064e3b" />
                    <circle cx="375" cy="185" r="2" fill="#ef4444" />
                    <circle cx="385" cy="185" r="2" fill="#eab308" />
                    <circle cx="395" cy="185" r="2" fill="#22c55e" />
                    <rect x="375" y="195" width="60" height="5" rx="1" fill="#e5e7eb" opacity="0.6" />
                    <rect x="375" y="205" width="50" height="5" rx="1" fill="#60a5fa" opacity="0.6" />
                    <rect x="375" y="215" width="40" height="5" rx="1" fill="#e5e7eb" opacity="0.5" />
                    <rect x="375" y="225" width="55" height="5" rx="1" fill="#e5e7eb" opacity="0.4" />
                  </motion.g>

                  {/* UI/UX Design Element */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{
                      duration: 1,
                      delay: 2.2,
                      rotate: {
                        repeat: Infinity,
                        duration: 6,
                        ease: "easeInOut"
                      }
                    }}
                    style={{ transformOrigin: '110px 90px' }}
                  >
                    <circle cx="110" cy="90" r="30" fill="#312e81" opacity="0.7" />
                    <circle cx="110" cy="90" r="20" fill="#4f46e5" opacity="0.7" />
                    <rect x="95" y="85" width="30" height="10" rx="5" fill="#c4b5fd" opacity="0.9" />
                  </motion.g>

                  {/* React/Framework Icon */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 0.8,
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 1,
                      delay: 2.5,
                      rotate: {
                        repeat: Infinity,
                        duration: 15,
                        ease: "linear"
                      }
                    }}
                    style={{ transformOrigin: '390px 90px' }}
                  >
                    <circle cx="390" cy="90" r="25" fill="#0891b2" opacity="0.2" />
                    <ellipse cx="390" cy="90" rx="25" ry="10" fill="none" stroke="#06b6d4" strokeWidth="1" />
                    <ellipse
                      cx="390"
                      cy="90"
                      rx="25"
                      ry="10"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1"
                      transform="rotate(60 390 90)"
                    />
                    <ellipse
                      cx="390"
                      cy="90"
                      rx="25"
                      ry="10"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1"
                      transform="rotate(-60 390 90)"
                    />
                    <circle cx="390" cy="90" r="5" fill="#0e7490" />
                  </motion.g>

                  {/* Code Brackets */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 2.7 }}
                  >
                    <motion.text
                      x="250"
                      y="85"
                      fontSize="40"
                      fontWeight="bold"
                      fill="#34d399"
                      textAnchor="middle"
                      animate={{
                        y: [85, 80, 85],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                      }}
                    >
                      {'{ }'}
                    </motion.text>
                  </motion.g>

                  {/* Connecting lines */}
                  <motion.path
                    d="M110,120 Q160,150 250,115"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, delay: 3 }}
                  />

                  <motion.path
                    d="M250,115 Q340,150 390,120"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, delay: 3.5 }}
                  />

                  <motion.path
                    d="M110,160 Q180,200 250,180 Q320,160 390,160"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 3, delay: 4 }}
                  />

                  {/* Developer icon */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2 }}
                  >
                    <circle cx="250" cy="325" r="10" fill="#0369a1" />
                    <rect x="245" y="335" width="10" height="15" rx="3" fill="#0369a1" />
                  </motion.g>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll down indicator - Enhanced with focus state for accessibility */}
        <motion.button
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-green-600 transition-colors z-10 shadow-md hover:shadow-lg"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, 10, 0]
          }}
          transition={{
            delay: 0.5,
            y: {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }
          }}
          onClick={scrollToNextSection}
          aria-label="Scroll to next section"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown size={30} className="text-blue-600 dark:text-green-500" />
        </motion.button>
      </section>
    </PageTransition>
  );
}