import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

const Portfolio = ({ onImageClick }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'editorial', name: 'Editorial' },
    { id: 'personal', name: 'Personal Styling' },
    { id: 'events', name: 'Events' }
  ];

  const portfolioItems = [
    {
      id: 1,
      category: 'editorial',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop',
      title: 'Vogue Editorial Shoot',
      description: 'Summer Collection 2024'
    },
    {
      id: 2,
      category: 'personal',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop',
      title: 'Executive Wardrobe',
      description: 'Professional styling consultation'
    },
    {
      id: 3,
      category: 'events',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
      title: 'Red Carpet Gala',
      description: 'Charity event styling'
    },
    {
      id: 4,
      category: 'editorial',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop',
      title: 'Fashion Week Coverage',
      description: 'Behind the scenes styling'
    },
    {
      id: 5,
      category: 'personal',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop',
      title: 'Lifestyle Photoshoot',
      description: 'Personal branding session'
    },
    {
      id: 6,
      category: 'events',
      image: 'https://images.unsplash.com/photo-1566479179817-c0a3a3fceb6a?w=600&h=800&fit=crop',
      title: 'Wedding Party',
      description: 'Bridal party coordination'
    },
    {
      id: 7,
      category: 'editorial',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&fit=crop',
      title: 'Magazine Cover',
      description: 'Celebrity styling session'
    },
    {
      id: 8,
      category: 'personal',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
      title: 'Business Casual',
      description: 'Corporate wardrobe makeover'
    },
    {
      id: 9,
      category: 'events',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=800&fit=crop',
      title: 'Awards Ceremony',
      description: 'VIP styling service'
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            Portfolio
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my work across editorial shoots, personal styling sessions, and special events
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-primary border border-primary/20 hover:bg-primary/5'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => onImageClick(item)}
            >
              <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.description}</p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No items found in this category</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
