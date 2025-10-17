import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Users, Clock } from 'lucide-react';

const About = () => {
  const services = [
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Editorial Styling',
      description: 'Professional styling for photoshoots, magazines, and brand campaigns'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Personal Styling',
      description: 'Wardrobe consultations and personal shopping for everyday confidence'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Event Styling',
      description: 'Special occasion styling for weddings, galas, and important events'
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '8+', label: 'Years Experience' },
    { number: '1000+', label: 'Styled Looks' },
    { number: '50+', label: 'Editorial Features' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            About Shubby
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo and Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center overflow-hidden"
              >
                <img
                  src="https://iemullwfxjbdimmebaie.supabase.co/storage/v1/object/public/Shubby%20Images/IMG_3258.jpg"
                  alt="Shubby - Professional Fashion Stylist in vibrant African print outfit"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With over 8 years of experience in the fashion industry, I specialize in creating looks that not only follow trends but set them. My passion lies in helping individuals discover their unique style and express their personality through carefully curated outfits.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From editorial shoots to red carpet events, I bring creativity, professionalism, and an eye for detail to every project. My goal is to make you feel confident and authentic in your own skin.
              </p>
            </motion.div>
          </motion.div>

          {/* Services and Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-3xl font-bold text-primary mb-8">
              Services
            </h3>

            <div className="space-y-6 mb-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 bg-background rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-primary mb-2">
                      {service.title}
                    </h4>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-primary/5 rounded-xl"
                >
                  <div className="font-serif text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
