import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ image, onClose }) => {
  const closeButtonRef = useRef(null);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    // Focus trap entry point
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors duration-300 z-10"
          aria-label="Close image dialog"
          ref={closeButtonRef}
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl"
        >
          <div className="relative">
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-auto max-h-[70vh] object-cover"
              loading="eager"
              fetchpriority="high"
            />
            
            {/* Image Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 id="lightbox-title" className="text-2xl font-bold mb-2">{image.title}</h3>
              <p className="text-white/80">{image.description}</p>
            </div>
          </div>

          {/* Image Details */}
          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-primary mb-2">Project Details</h4>
                <div className="space-y-1 text-gray-600">
                  <p><span className="font-medium">Category:</span> {image.category}</p>
                  <p><span className="font-medium">Type:</span> {image.title}</p>
                  <p><span className="font-medium">Description:</span> {image.description}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Services Provided</h4>
                <div className="space-y-1 text-gray-600">
                  <p>• Complete styling consultation</p>
                  <p>• Outfit coordination</p>
                  <p>• Accessory selection</p>
                  <p>• On-site styling support</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile swipe hint */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-sm md:hidden">
          Tap outside to close
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
