import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, HandHeart, Truck, Users, Utensils, MapPin, Phone, Mail, ChevronRight, ArrowRight, Clock, Shield, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import StoryGallery from '@/components/StoryGallery';

const roles = [
  { key: 'donor' as const, label: 'Donor', desc: 'Restaurants & individuals sharing surplus food', icon: HandHeart, color: 'bg-primary' },
  { key: 'receiver' as const, label: 'Receiver', desc: 'NGOs & communities in need of food', icon: Heart, color: 'gradient-green' },
  { key: 'volunteer' as const, label: 'Volunteer', desc: 'Delivery heroes bridging the gap', icon: Truck, color: 'bg-accent' },
];

const stats = [
  { value: '10,000+', label: 'Meals Shared', icon: Utensils },
  { value: '500+', label: 'Active Donors', icon: HandHeart },
  { value: '200+', label: 'Volunteers', icon: Users },
  { value: '50+', label: 'Cities Reached', icon: MapPin },
];

const howItWorks = [
  { step: '01', title: 'Donor Lists Food', desc: 'Restaurants or individuals list their surplus food with details like quantity, type, and pickup time.', icon: Utensils },
  { step: '02', title: 'Receiver Requests', desc: 'NGOs and community centers browse available food and place a request for what they need.', icon: Heart },
  { step: '03', title: 'Volunteer Delivers', desc: 'A nearby volunteer picks up the food and delivers it safely to the receiver.', icon: Truck },
];

const features = [
  { title: 'Real-Time Tracking', desc: 'Track your food donation from pickup to delivery with live updates.', icon: Clock, details: 'Our real-time tracking system lets donors see when their food is picked up, volunteers can update delivery status on the go, and receivers get notified the moment food is on its way. Stay informed at every step with push notifications and a live map view.' },
  { title: 'Verified Network', desc: 'All donors, receivers, and volunteers are verified for safety and trust.', icon: Shield, details: 'Every participant goes through a verification process including ID checks, background screening for volunteers, and NGO registration validation for receivers. This ensures food safety, accountability, and builds a trusted community network.' },
  { title: 'Zero Waste Mission', desc: 'Every meal saved is a step towards a sustainable, hunger-free world.', icon: Leaf, details: 'We track every meal saved from going to waste and measure our environmental impact. Our analytics dashboard shows CO₂ emissions prevented, water saved, and landfill space preserved. Join us in building a circular food economy that benefits everyone.' },
];

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    toast({ title: '✅ Message Sent!', description: "Thank you for reaching out. We'll get back to you soon." });
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-3 px-6 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <h2 className="font-display text-xl font-bold text-foreground">
          <span className="text-primary">Ann</span> Setu
        </h2>
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">How It Works</button>
          <button onClick={() => scrollToSection('impact')} className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Impact</button>
          <button onClick={() => scrollToSection('features')} className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Features</button>
          <button onClick={() => scrollToSection('stories')} className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Stories</button>
          <button onClick={() => scrollToSection('contact')} className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Contact</button>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col">
        <section className="gradient-hero flex flex-col items-center justify-center px-4 py-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mb-16"
          >
            <div className="w-[120px] h-[120px] mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-6xl animate-bounce">🍲</span>
            </div>
            <h1 className="font-display text-6xl md:text-7xl font-extrabold text-[#2D1B14] leading-tight mb-4">
              Ann <span className="text-[#EE762B]">Setu</span>
            </h1>
            <p className="text-xl text-[#2D1B14]/70 font-body max-w-lg mx-auto">
              Connecting surplus food from restaurants and donors to those in need. 
              <span className="block mt-2 font-bold text-[#EE762B]">Register as and Join the Mission.</span>
            </p>
          </motion.div>

          {/* Three Circles - Registration / Sign In Portal */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {roles.map((role, i) => (
              <motion.button
                key={role.key}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5, type: 'spring' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/register/${role.key}`)}
                className="group flex flex-col items-center gap-6 focus:outline-none"
              >
                <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full ${role.color} flex flex-col items-center justify-center shadow-xl group-hover:shadow-orange-200 transition-all duration-300 relative overflow-hidden border-4 border-white`}>
                  <role.icon className="w-16 h-16 md:w-20 md:h-20 text-white z-10" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-center">
                  <h3 className="font-display text-2xl font-bold text-[#2D1B14] group-hover:text-[#EE762B] transition-colors">{role.label}</h3>
                  <p className="text-sm text-[#2D1B14]/60 max-w-[200px] mt-1 font-medium">Click to Sign In / Register</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Impact Stats */}
        <section id="impact" className="py-16 px-4 bg-card">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Our Impact</h2>
              <p className="text-muted-foreground font-body">Every number tells a story of hope</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background rounded-2xl p-6 text-center shadow-card border border-border hover:shadow-warm transition-shadow"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-body mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">How It Works</h2>
              <p className="text-muted-foreground font-body">Three simple steps to make a difference</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-warm transition-all group"
                >
                  <div className="text-6xl font-display font-extrabold text-primary/15 absolute top-4 right-6">{item.step}</div>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.desc}</p>
                  {i < 2 && (
                    <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-primary/40" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16 px-4 bg-card">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Why Ann Setu?</h2>
              <p className="text-muted-foreground font-body">Built with purpose, powered by community</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feat, i) => (
                <motion.button
                  key={feat.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setExpandedFeature(expandedFeature === i ? null : i)}
                  className="bg-background rounded-2xl p-8 border border-border shadow-card text-center hover:shadow-warm transition-all cursor-pointer text-left group"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                    <feat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2 text-center">{feat.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed text-center">{feat.desc}</p>
                  <motion.div
                    initial={false}
                    animate={{ height: expandedFeature === i ? 'auto' : 0, opacity: expandedFeature === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground font-body text-sm leading-relaxed mt-4 pt-4 border-t border-border text-center">
                      {feat.details}
                    </p>
                  </motion.div>
                  <p className="text-xs text-primary font-semibold mt-3 text-center">
                    {expandedFeature === i ? 'Click to collapse' : 'Click to learn more'}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Story Gallery */}
        <StoryGallery />

        {/* CTA Banner */}
        <section className="py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto gradient-warm rounded-3xl p-10 md:p-14 text-center shadow-warm"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Make a Difference?</h2>
            <p className="text-primary-foreground/80 font-body text-lg mb-8 max-w-xl mx-auto">
              Join thousands of people who are already fighting hunger and food waste in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/login/donor')} className="bg-background text-foreground hover:bg-background/90 font-semibold text-base h-12 rounded-xl px-8">
                <HandHeart className="w-5 h-5 mr-2" /> Donate Food
              </Button>
              <Button onClick={() => navigate('/login/volunteer')} variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base h-12 rounded-xl px-8">
                <Truck className="w-5 h-5 mr-2" /> Volunteer Now
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Contact Us */}
        <section id="contact" className="py-16 px-4 bg-card">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Get In Touch</h2>
              <p className="text-muted-foreground font-body">Have questions? We'd love to hear from you.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-10">
              {/* Contact Form */}
              <motion.form
                onSubmit={handleContactSubmit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-background rounded-2xl p-8 border border-border shadow-card space-y-5"
              >
                <div>
                  <label className="text-sm font-body font-medium text-foreground">Your Name</label>
                  <Input value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Enter your name" className="mt-1" required />
                </div>
                <div>
                  <label className="text-sm font-body font-medium text-foreground">Email</label>
                  <Input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="you@email.com" className="mt-1" required />
                </div>
                <div>
                  <label className="text-sm font-body font-medium text-foreground">Message</label>
                  <Textarea value={contactMessage} onChange={e => setContactMessage(e.target.value)} placeholder="How can we help?" className="mt-1 min-h-[120px]" required />
                </div>
                <Button type="submit" className="w-full gradient-warm text-primary-foreground font-semibold h-12 rounded-xl">
                  Send Message <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.form>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center gap-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground">Email Us</h4>
                    <p className="text-muted-foreground font-body text-sm">support@annasetu.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground">Call Us</h4>
                    <p className="text-muted-foreground font-body text-sm">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground">Visit Us</h4>
                    <p className="text-muted-foreground font-body text-sm">Ann Setu HQ, Bengaluru, India</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 bg-foreground text-background">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-lg font-bold">
            <span className="text-primary">Ann</span> Setu
          </div>
          <div className="flex gap-6 text-sm font-body text-background/70">
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-background transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('impact')} className="hover:text-background transition-colors">Impact</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-background transition-colors">Contact</button>
          </div>
          <p className="text-sm text-background/50">© 2026 Ann Setu — Feeding communities, reducing waste.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
