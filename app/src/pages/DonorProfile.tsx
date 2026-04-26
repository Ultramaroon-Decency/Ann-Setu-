import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Star, Users, Utensils, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DonorProfile() {
  const { id } = useParams();
  
  // Dummy data
  const donor = {
    name: id === '0' ? 'Spice Kitchen' : id === '1' ? 'Annapurna Restaurant' : 'Hotel Grand',
    type: 'Restaurant',
    dist: '0.5 km',
    rating: 4.9,
    activeDonations: 3,
    address: '123 Food Street, Bengaluru, Karnataka 560001',
    phone: '+91 98765 43210',
    email: 'contact@spicekitchen.com',
    hours: '10:00 AM - 11:00 PM',
    description: 'We are a premium multi-cuisine restaurant committed to zero food waste. We donate surplus prepared meals daily.',
    recentItems: ['Vegetable Biryani', 'Paneer Tikka', 'Dal Makhani']
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-10">
      <div className="max-w-5xl mx-auto">
        <Link to="/dashboard/receiver?tab=donors" className="inline-flex items-center gap-2 text-sm font-bold text-[#2D1B14]/40 hover:text-[#2D1B14] transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Donors
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] p-12 border border-[#F3F1E8] shadow-sm"
            >
              <div className="flex items-center gap-8 mb-8">
                <div className="w-24 h-24 rounded-full bg-[#FFB74D] flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {donor.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-4xl font-display font-bold text-[#2D1B14] mb-2">{donor.name}</h1>
                  <div className="flex items-center gap-4 text-[#2D1B14]/40 font-bold text-sm">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {donor.dist} away</span>
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-[#F9A825] text-[#F9A825]" /> {donor.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-[#2D1B14]/60 text-lg leading-relaxed mb-10">{donor.description}</p>
              
              <div className="grid md:grid-cols-2 gap-8 pt-10 border-t border-[#F3F1E8]">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#EE762B]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2D1B14]/40 font-bold uppercase tracking-widest">Address</p>
                    <p className="font-bold text-[#2D1B14]">{donor.address}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#EE762B]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2D1B14]/40 font-bold uppercase tracking-widest">Hours</p>
                    <p className="font-bold text-[#2D1B14]">{donor.hours}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[40px] p-12 border border-[#F3F1E8] shadow-sm"
            >
              <h3 className="text-2xl font-display font-bold text-[#2D1B14] mb-8">Recently Donated Items</h3>
              <div className="flex flex-wrap gap-4">
                {donor.recentItems.map((item, i) => (
                  <div key={i} className="bg-[#FAF9F6] px-6 py-3 rounded-2xl flex items-center gap-3 border border-[#F3F1E8]">
                    <Utensils className="w-4 h-4 text-[#EE762B]" />
                    <span className="font-bold text-[#2D1B14]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#2D1B14] rounded-[40px] p-10 text-white shadow-xl"
            >
              <h3 className="text-2xl font-display font-bold mb-8">Contact Details</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#EE762B]" />
                  </div>
                  <p className="font-bold">{donor.phone}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#EE762B]" />
                  </div>
                  <p className="font-bold">{donor.email}</p>
                </div>
              </div>
              <Button className="w-full h-14 mt-10 rounded-2xl bg-[#EE762B] hover:bg-[#D95D16] text-white font-bold text-lg transition-all">
                Call Now
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#3D8C62] rounded-[40px] p-10 text-white shadow-xl"
            >
              <Users className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-display font-bold mb-2">{donor.activeDonations} Active</h3>
              <p className="text-white/80 font-medium">Donations ready for pickup right now.</p>
              <Button 
                onClick={() => navigate('/dashboard/receiver?tab=request')}
                className="w-full h-14 mt-8 rounded-2xl bg-white text-[#3D8C62] hover:bg-[#F3F1E8] font-bold text-lg transition-all"
              >
                Request from Donor
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
