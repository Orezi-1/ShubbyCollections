import React, { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import StickyContactButton from './components/StickyContactButton';
import Lightbox from './components/Lightbox';

function App() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (image) => {
    setLightboxImage(image);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Portfolio onImageClick={openLightbox} />
        <Contact />
      </main>

      <StickyContactButton />
      
      {isLightboxOpen && (
        <Lightbox 
          image={lightboxImage} 
          onClose={closeLightbox} 
        />
      )}
    </div>
  );
}

export default App;
