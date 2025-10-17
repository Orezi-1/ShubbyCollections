import React, { useState, Suspense, lazy } from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';

const About = lazy(() => import('./components/About'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Contact = lazy(() => import('./components/Contact'));
const StickyContactButton = lazy(() => import('./components/StickyContactButton'));
const Lightbox = lazy(() => import('./components/Lightbox'));

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
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:text-primary focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <Navigation />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading content…</div>}>
          <About />
          <Portfolio onImageClick={openLightbox} />
          <Contact />
          <StickyContactButton />
          {isLightboxOpen && (
            <Lightbox image={lightboxImage} onClose={closeLightbox} />
          )}
        </Suspense>
      </main>
    </div>
  );
}

export default App;
