"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import BookPreviewSection from "@/components/BookPreviewSection";
import Link from 'next/link';

// Generate hover images dynamically
const hoverImages = Array.from({ length: 100 }, (_, index) => `/hover${index + 1}.png`);

// Background colors
const backgroundColors = [
  "#FFC300", // Saffron
  "#1C39BB", // Persian Blue
  "#50C878", // Emerald
  "#B76E79", // Rose Dust
  "#40E0D0", // Turquoise
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHoverIndex, setCurrentHoverIndex] = useState(0);
  const [hoveringHero, setHoveringHero] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredImages, setHoveredImages] = useState([]); // Array to hold hovered images with timestamps
  const [lastHoveredTime, setLastHoveredTime] = useState(0); // Track last time an image was changed
  const [scrollPosition, setScrollPosition] = useState(0); // To track scroll position
  const [showHoverImages, setShowHoverImages] = useState(true); // To toggle hover images visibility
  const [showTitle, setShowTitle] = useState(false); // Track title visibility
  const [cartItems, setCartItems] = useState([]);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);



  const scrollRef = useRef(null);

  // Scroll Navbar background effect + Reset hover images on scroll up
useEffect(() => {
  const onScroll = () => {
    setIsScrolled(window.scrollY > 50);
    setScrollPosition(window.scrollY);

    // Show title when scrolled past hero section
    if (window.scrollY > window.innerHeight / 2) {
      setShowTitle(true);
    } else {
      setShowTitle(false);
    }

    // ✅ Reset hovered images if user scrolls back to hero section
    if (window.scrollY < window.innerHeight) {
      setHoveredImages([]);
      setShowHoverImages(true);
    }
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);


  // Track mouse position and record each hover image with timestamp
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (hoveringHero) {
        // Only change image if enough time has passed (e.g., 500ms)
        const now = Date.now();
        if (now - lastHoveredTime >= 200) {
          const newHoverImage = {
            src: hoverImages[currentHoverIndex],
            position: { x: e.clientX, y: e.clientY },
            timestamp: Date.now(),
          };
          setHoveredImages((prevImages) => [...prevImages, newHoverImage]);
          setCurrentHoverIndex((prev) => (prev + 1) % hoverImages.length);
          setLastHoveredTime(now); // Update the last hovered time
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [currentHoverIndex, hoveringHero, lastHoveredTime]);

  // Remove images after 5 seconds with a fade-out effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();

      setHoveredImages((prevImages) => {
        return prevImages.filter((image) => {
          if (currentTime - image.timestamp >= 10000) {
            return false; // Remove the image after 5 seconds
          }
          return true;
        });
      });
    }, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, []);

  // Handle hover behavior
  const handleHeroMouseEnter = () => {
    setHoveringHero(true);
  };

  const handleHeroMouseLeave = () => {
    setHoveringHero(false);
  };

  // Handle scroll down on arrow click
  const handleScrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setShowHoverImages(false); // Hide hovering images after scrolling down
  };

  // Split "Welcome to FAR" into individual characters
  const welcomeText = "Welcome to FAR";
  const splitText = welcomeText.split("");

  // Determine if the user has scrolled past the hero section
  const isHeroInView = scrollPosition < window.innerHeight;

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">



      {/* Hero Section */}
      <section
        className="h-screen relative flex flex-col justify-center items-center overflow-hidden text-center"
        onMouseEnter={handleHeroMouseEnter}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Animated Background */}
        <motion.div
          animate={{ backgroundColor: backgroundColors }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute inset-0 z-0"
        ></motion.div>

        {/* Hero Text */}
        <div className="z-10 px-4">
          <div className="text-6xl sm:text-8xl font-extrabold text-white mb-6 drop-shadow-lg">
            {splitText.map((char, index) => (
              <motion.span
                key={index}
                animate={{
                  x: [0, 15, -15, 8, -8, 0], // Horizontal movement
                  scale: [1, 1.1, 1, 1.1, 1], // Scaling effect
                  rotate: [0, 5, -5, 3, -3, 0], // Slight rotation
                  opacity: [1, 0.9, 1, 0.9, 1], // Opacity changes
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: index * 0.1, // Stagger delay for each character
                }}
                className="inline-block mr-1" // Added margin to space characters
                style={{
                  textShadow: "0px 0px 10px rgba(255, 255, 255, 0.6), 0px 0px 20px rgba(255, 255, 255, 0.5)", // Halo effect
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-xl sm:text-2xl text-white max-w-xl mx-auto drop-shadow"
          >
            Authentic Iranian Art, Reimagined for You
          </motion.p>
        </div>

        {/* Floating Hover Image - Previous hover images (Only visible when hero section is in view) */}
        {isHeroInView && showHoverImages && hoveredImages.map((image, index) => (
          <motion.img
            key={index}
            src={image.src}
            alt="Floating Hover"
            className="pointer-events-none fixed z-10 w-56 h-56 object-cover rounded-xl shadow-lg"
            style={{
              top: image.position.y + 20,
              left: image.position.x + 20,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }} // Fade out and shrink the image
            transition={{
              duration: 2, // Slow down the fade and scale for a smoother effect
              delay: 8, // Delay the fade-out to make it appear smoother
            }}
            onAnimationComplete={() => {
              // After the animation, remove the image from the state
              setHoveredImages((prevImages) =>
                prevImages.filter((_, i) => i !== index)
              );
            }}
          />
        ))}

        {/* Scroll Down Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8"
          onClick={handleScrollDown} // Click arrow to scroll down
        >
          <div className="w-6 h-6 border-b-2 border-r-2 border-white transform rotate-45 animate-bounce"></div>
        </motion.div>
      </section>
      
      {/* Let's Shop Title */}
      <BookPreviewSection />

    </main>
  );
}
