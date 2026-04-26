import { motion } from 'framer-motion';
import { Heart, Quote } from 'lucide-react';

const stories = [
  {
    name: 'Priya Sharma',
    role: 'Restaurant Owner & Donor',
    quote:
      'Every night we used to throw away so much food. Now with Ann Setu, that food feeds families. It gives me so much joy to know nothing goes to waste.',
    avatar: '👩‍🍳',
  },
  {
    name: 'Ravi Kumar',
    role: 'Volunteer Driver',
    quote:
      "I started volunteering on weekends and it changed my perspective completely. Seeing the smiles when I deliver food — there's nothing like it.",
    avatar: '🚗',
  },
  {
    name: 'Sister Maria',
    role: 'NGO Receiver',
    quote:
      'Our shelter serves 150 people daily. Ann Setu ensures we never run short. The platform is easy to use and the volunteers are always on time.',
    avatar: '🏠',
  },
  {
    name: 'Amit Patel',
    role: 'Corporate Donor',
    quote:
      "Our company's cafeteria partners with Ann Setu. What used to be waste now feeds communities. It's CSR that truly makes a difference.",
    avatar: '🏢',
  },
];

export default function StoryGallery() {
  return (
    <section id="stories" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Stories of Impact
          </h2>
          <p className="text-muted-foreground font-body">
            Real stories from our community of givers and receivers
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-warm transition-all relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                  {story.avatar}
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground">
                    {story.name}
                  </h4>
                  <p className="text-sm text-primary font-body">{story.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground font-body text-sm leading-relaxed italic">
                "{story.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
