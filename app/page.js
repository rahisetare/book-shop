"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import BookPreviewSection from "@/components/BookPreviewSection";




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
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-gray-800">FAR</div>
          <ul className="flex space-x-6 text-gray-700">
            <li className="hover:text-black cursor-pointer transition">Home</li>
            <li className="hover:text-black cursor-pointer transition">Shop</li>
            <li className="hover:text-black cursor-pointer transition">About</li>
            <li className="hover:text-black cursor-pointer transition">Contact</li>
          </ul>
        </div>
      </nav>

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

{/* Footer */}
<footer className="bg-white border-t mt-16">
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-700 text-sm">
    
    {/* Column 1: Branding */}
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">FAR</h3>
      <p>Authentic Iranian Art, Reimagined for You.</p>
    </div>

    {/* Column 2: Navigation */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-2">Navigation</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">Shop</a></li>
        <li><a href="#" className="hover:underline">About</a></li>
        <li><a href="#" className="hover:underline">Contact</a></li>
      </ul>
    </div>

    {/* Column 3: Contact Info */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
      <p>Tehran, Iran</p>
      <p>Phone: +98 912 123 4567</p>
      <p>Email: support@far.ir</p>
    </div>

    {/* Column 4: Socials */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-2">Follow Us</h4>
      <div className="flex space-x-4 mt-2">
        <a href="#" aria-label="Instagram" className="hover:text-black">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.5.2.9.5 1.3.9.4.4.7.8.9 1.3.2.4.3 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.5-.5.9-.9 1.3-.4.4-.8.7-1.3.9-.4.2-1 .3-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.5-.2-.9-.5-1.3-.9-.4-.4-.7-.8-.9-1.3-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.5.5-.9.9-1.3.4-.4.8-.7 1.3-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.6.2 4.6.4 3.8.7 2.9 1 2.1 1.5 1.3 2.3.5 3.1 0 3.9-.3 4.8c-.3.8-.5 1.8-.6 3.2C-.1 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.4.3 2.4.6 3.2.3.8.8 1.6 1.6 2.4.8.8 1.6 1.3 2.4 1.6.8.3 1.8.5 3.2.6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.4-.1 2.4-.3 3.2-.6.8-.3 1.6-.8 2.4-1.6.8-.8 1.3-1.6 1.6-2.4.3-.8.5-1.8.6-3.2.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.4-.3-2.4-.6-3.2-.3-.8-.8-1.6-1.6-2.4-.8-.8-1.6-1.3-2.4-1.6-.8-.3-1.8-.5-3.2-.6C15.7 0 15.3 0 12 0z"/>
            <path d="M12 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zM18.4 4.6c-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.8 0 1.4-.6 1.4-1.4 0-.8-.6-1.4-1.4-1.4z"/>
          </svg>
        </a>
        <a href="#" aria-label="Facebook" className="hover:text-black">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M22.676 0H1.326C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.326 24H12.82V14.708h-3.125v-3.622h3.125V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.92.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.676 0"/>
          </svg>
        </a>
      </div>
    </div>
  </div>

  <div className="border-t mt-6 py-4 text-center text-xs text-gray-500">
    &copy; {new Date().getFullYear()} FAR. All rights reserved.
  </div>
</footer>


    </main>
  );
}
