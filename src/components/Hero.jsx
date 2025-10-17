import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const images = [
  'https://user-images.githubusercontent.com/124706997/292945281-7925e011-80f0-466d-8a29-c85287f74221.jpg',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80&auto=format&fit=crop',
  'https://iemullwfxjbdimmebaie.supabase.co/storage/v1/object/public/Shubby%20Images/IMG_3258.jpg',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80&auto=format&fit=crop',
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const Hero = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const imageIndex = page % images.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (isHovering || prefersReducedMotion) return;
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [page, isHovering, prefersReducedMotion]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="h-screen flex items-end justify-center relative overflow-hidden pb-10 md:pb-12"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Image Slider */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={prefersReducedMotion ? 'static' : page}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[imageIndex]})` }}
          custom={direction}
          variants={prefersReducedMotion ? undefined : variants}
          initial={prefersReducedMotion ? false : 'enter'}
          animate={prefersReducedMotion ? {} : 'center'}
          exit={prefersReducedMotion ? undefined : 'exit'}
          transition={prefersReducedMotion ? undefined : { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.5 } }}
          drag={prefersReducedMotion ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            if (prefersReducedMotion) return;
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) paginate(1);
            else if (swipe > swipeConfidenceThreshold) paginate(-1);
          }}
          aria-hidden
        />
      </AnimatePresence>

      {/* Gradient Overlay from bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/80 to-transparent"></div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="font-serif text-2xl md:text-3xl font-bold mb-2"
          >
            <span className="text-accent">Shubby</span> Collections
          </motion.h1>

          <motion.p
            className="text-base md:text-lg mb-2 text-white/90"
          >
            Fashion Stylist
          </motion.p>

          <motion.p
            className="text-lg md:text-xl mb-6 text-accent font-serif font-medium"
          >
            Elevating your style ✨
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="bg-accent text-primary px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-accent/90 shadow-md"
            >
              Book Consultation
            </motion.button>

            <div className="flex gap-2">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+2348082671454"
                className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                aria-label="Call Shubby Collections"
              >
                <Phone size={14} />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:oladepomercy02@gmail.com"
                className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                aria-label="Email Shubby Collections"
              >
                <Mail size={14} />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/2348082671454"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                aria-label="WhatsApp Shubby Collections"
              >
                <MessageCircle size={14} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Slider Navigation Dots */}
      <div className="absolute bottom-40 md:bottom-44 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              i === imageIndex ? 'bg-accent' : 'bg-white/40 hover:bg-white/70'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
