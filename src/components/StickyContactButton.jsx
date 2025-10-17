import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone, Mail, MessageCircle, X } from 'lucide-react';

const StickyContactButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactOptions = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Call',
      action: 'tel:+2348082671454',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      action: 'mailto:oladepomercy02@gmail.com',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'WhatsApp',
      action: 'https://wa.me/2348082671454',
      color: 'bg-green-400 hover:bg-green-500'
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, y: 20 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 space-y-3"
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={index}
                href={option.action}
                target={option.action.startsWith('http') ? '_blank' : '_self'}
                rel={option.action.startsWith('http') ? 'noopener noreferrer' : ''}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 ${option.color} text-white px-4 py-3 rounded-full shadow-lg transition-colors duration-300`}
              >
                {option.icon}
                <span className="font-medium text-sm">{option.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 bg-accent text-primary rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Close quick contact options' : 'Open quick contact options'}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <Phone className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default StickyContactButton;
