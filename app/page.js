'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookPreviewSection from '@/components/BookPreviewSection';

// Hover Images and Background Colors
const hoverImages = Array.from({ length: 100 }, (_, index) => `/hover${index + 1}.png`);
const backgroundColors = ['#FFC300', '#1C39BB', '#50C878', '#B76E79', '#40E0D0'];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHoverIndex, setCurrentHoverIndex] = useState(0);
  const [hoveringHero, setHoveringHero] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredImages, setHoveredImages] = useState([]);
  const [lastHoveredTime, setLastHoveredTime] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showHoverImages, setShowHoverImages] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollPosition(window.scrollY);
      if (window.scrollY < window.innerHeight) {
        setHoveredImages([]);
        setShowHoverImages(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (hoveringHero) {
        const now = Date.now();
        if (now - lastHoveredTime >= 200) {
          const newImage = {
            src: hoverImages[currentHoverIndex],
            position: { x: e.clientX, y: e.clientY },
            timestamp: now,
          };
          setHoveredImages((prev) => [...prev, newImage]);
          setCurrentHoverIndex((prev) => (prev + 1) % hoverImages.length);
          setLastHoveredTime(now);
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [currentHoverIndex, hoveringHero, lastHoveredTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setHoveredImages((prev) => prev.filter((img) => now - img.timestamp < 10000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleHeroMouseEnter = () => setHoveringHero(true);
  const handleHeroMouseLeave = () => setHoveringHero(false);

  const handleScrollDown = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowHoverImages(false);
  };

  const welcomeText = 'Welcome to FAR';
  const splitText = welcomeText.split('');
  const isHeroInView = scrollPosition < window.innerHeight;

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="h-screen relative flex flex-col justify-center items-center overflow-hidden text-center"
        onMouseEnter={handleHeroMouseEnter}
        onMouseLeave={handleHeroMouseLeave}
      >
        <motion.div
          animate={{ backgroundColor: backgroundColors }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
          className="absolute inset-0 z-0"
        />

        {/* Hero Text */}
        <div className="z-10 px-4">
          <div className="text-6xl sm:text-8xl font-extrabold text-white mb-6 drop-shadow-lg">
            {splitText.map((char, index) => (
              <motion.span
                key={index}
                animate={{
                  x: [0, 15, -15, 8, -8, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                  rotate: [0, 5, -5, 3, -3, 0],
                  opacity: [1, 0.9, 1, 0.9, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: index * 0.1,
                }}
                className="inline-block mr-1"
                style={{
                  textShadow:
                    '0px 0px 10px rgba(255, 255, 255, 0.6), 0px 0px 20px rgba(255, 255, 255, 0.5)',
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

        {/* Hover Images */}
        {isHeroInView &&
          showHoverImages &&
          hoveredImages.map((image, index) => (
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
              animate={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 2, delay: 8 }}
              onAnimationComplete={() =>
                setHoveredImages((prev) => prev.filter((_, i) => i !== index))
              }
            />
          ))}

        {/* Scroll Down Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8"
          onClick={handleScrollDown}
        >
          <div className="w-6 h-6 border-b-2 border-r-2 border-white transform rotate-45 animate-bounce"></div>
        </motion.div>
      </section>

      {/* Book Preview */}
      <BookPreviewSection ref={scrollRef} />

      {/* Book Categories */}
<section className="py-20 px-6 bg-white">
  <h2 className="text-4xl font-bold text-center mb-12">Explore Our Categories</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
      { title: "History", image: "/categories/history.jpg", category: "history" },
      { title: "Art", image: "/categories/art.jpg", category: "art" },
      { title: "Science", image: "/categories/science.jpg", category: "science" },
      { title: "Literature", image: "/categories/literature.jpg", category: "literature" },
    ].map((cat, i) => (
      <Link key={i} href={`/books?category=${cat.category}`}>
        <div className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
          <img src={cat.image} alt={cat.title} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-2xl font-semibold">{cat.title}</span>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>


      {/* About Section */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">About FAR</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            FAR is a celebration of Persian art and heritage. From handwoven carpets and timeless literature to elegant
            clothing, our curated collection bridges ancient traditions with modern design. Our mission is to bring the
            soul of Iran to the world.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Layla K.',
              text: 'The carpet I ordered from FAR is breathtaking. It adds a sense of warmth and culture to my home.',
            },
            {
              name: 'Amir H.',
              text: 'Incredible book selection. I finally found rare Persian literature in high quality prints!',
            },
            {
              name: 'Sofia M.',
              text: 'I love the attention to detail in the clothing. Elegant, authentic, and comfortable.',
            },
          ].map((review, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-xl shadow-sm">
              <p className="text-gray-700 italic">“{review.text}”</p>
              <div className="mt-4 font-semibold text-right">— {review.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-yellow-100 to-yellow-300 text-center">
        <h2 className="text-4xl font-bold mb-4">Start Your Journey into Persian Art</h2>
        <p className="mb-6 text-lg text-gray-800">
          Discover handcrafted pieces that tell a story. Every item is a bridge to Iran&apos;s rich culture.
        </p>
        <Link href="/books">
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300">
            Shop Now
          </button>
        </Link>
      </section>
    </main>
  );
}
