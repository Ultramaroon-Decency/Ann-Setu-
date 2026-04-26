import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Navigation, 
  Search, 
  Star,
  Phone,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = searchParams.get('tab') || 'requests';

  const [activeTabName, setActiveTabName] = useState('Donation Requests');

  useEffect(() => {
    switch (tab) {
      case 'requests': setActiveTabName('Donation Requests'); break;
      case 'navigation': setActiveTabName('Route Navigation'); break;
      case 'history': setActiveTabName('My History'); break;
      default: setActiveTabName('Donation Requests');
    }
  }, [tab]);

  // --- Sections ---

  const DonationRequests = () => (
    <div className="space-y-8">
      <h2 className="text-4xl font-display font-bold text-[#2D1B14] mb-8">Available Requests</h2>
      <div className="grid gap-6">
        {[
          { id: '1', item: 'Fresh Biryani (20 plates)', from: 'Spice Kitchen', to: 'Hope NGO', dist: '1.2 km' },
          { id: '2', item: 'Roti & Sabzi (50 packs)', from: 'Annapurna Rest.', to: 'Care Shelter', dist: '3.5 km' },
          { id: '3', item: 'Mixed Fruits (10 kg)', from: 'City Market', to: 'Old Age Home', dist: '2.1 km' },
        ].map((req, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[32px] p-8 border border-[#F3F1E8] shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#FFF8E1] flex items-center justify-center text-[#F9A825] shrink-0">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#2D1B14] mb-1">{req.item}</h4>
                  <p className="text-[#2D1B14]/40 font-bold text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {req.dist} away · {req.from}
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/dashboard/volunteer?tab=navigation')}
                className="h-14 px-10 rounded-2xl bg-[#EE762B] text-white font-bold text-lg hover:bg-[#D95D16] transition-all"
              >
                Accept Task
              </Button>
            </div>
            <div className="mt-6 pt-6 border-t border-[#F3F1E8] flex items-center gap-10">
               <div className="flex flex-col">
                  <span className="text-[10px] text-[#2D1B14]/40 font-bold uppercase tracking-widest">Pickup</span>
                  <span className="font-bold text-[#2D1B14]">{req.from}</span>
               </div>
               <ArrowRight className="text-[#2D1B14]/20" />
               <div className="flex flex-col">
                  <span className="text-[10px] text-[#2D1B14]/40 font-bold uppercase tracking-widest">Drop-off</span>
                  <span className="font-bold text-[#2D1B14]">{req.to}</span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const RouteNavigation = () => (
    <div className="space-y-8">
      <h2 className="text-4xl font-display font-bold text-[#2D1B14] mb-8">Active Navigation</h2>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[40px] p-4 border border-[#F3F1E8] shadow-sm relative overflow-hidden h-[600px]">
             {/* Simulated Map */}
             <div className="absolute inset-0 bg-[#FAF9F6] opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#2D1B14 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             
             {/* Path */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <path d="M 100 100 Q 300 150 500 500" stroke="#EE762B" strokeWidth="8" fill="none" strokeDasharray="12 12" />
             </svg>

             {/* Vehicle */}
             <motion.div 
               animate={{ x: [0, 400], y: [0, 400] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute z-10 p-2"
               style={{ left: 100, top: 100 }}
             >
                <div className="w-12 h-12 bg-[#2D1B14] rounded-full flex items-center justify-center shadow-2xl border-4 border-white rotate-45">
                   <Navigation className="w-6 h-6 text-white" />
                </div>
             </motion.div>

             <div className="absolute top-8 left-8 z-20 bg-[#2D1B14] text-white p-6 rounded-3xl shadow-2xl max-w-xs">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#EE762B] mb-2">Next Turn</p>
                <h4 className="text-xl font-bold mb-1">Turn Right in 200m</h4>
                <p className="text-white/40 text-sm">onto MG Road towards Spice Kitchen</p>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#2D1B14] rounded-[40px] p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Current Journey</h3>
              <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                       <div className="w-3 h-3 rounded-full bg-[#EE762B]" />
                    </div>
                    <div>
                       <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Pickup From</p>
                       <p className="font-bold">Spice Kitchen, Sector 5</p>
                    </div>
                 </div>
                 <div className="w-px h-10 bg-white/10 ml-4" />
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                       <MapPin className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                       <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Deliver To</p>
                       <p className="font-bold">Hope NGO Care Center</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[40px] p-8 border border-[#F3F1E8] shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-full bg-[#FAF9F6] flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#EE762B]" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-[#2D1B14]">8 Mins Away</h4>
                    <p className="text-sm text-[#2D1B14]/40">1.2 km remaining</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <Button className="flex-1 h-14 rounded-2xl bg-[#FAF9F6] text-[#2D1B14] hover:bg-white border border-[#F3F1E8]">
                    <Phone className="w-5 h-5" />
                 </Button>
                 <Button className="flex-1 h-14 rounded-2xl bg-[#FAF9F6] text-[#2D1B14] hover:bg-white border border-[#F3F1E8]">
                    <MessageSquare className="w-5 h-5" />
                 </Button>
              </div>
           </div>

           <Button className="w-full h-16 rounded-3xl bg-[#3D8C62] text-white font-bold text-xl hover:bg-[#2D6A4A] transition-all">
              Mark as Picked Up
           </Button>
        </div>
      </div>
    </div>
  );

  const MyHistory = () => (
    <div className="space-y-8">
       <h2 className="text-4xl font-display font-bold text-[#2D1B14] mb-8">Delivery History</h2>
       <div className="grid gap-6">
          {[
            { item: 'Biryani Packets', to: 'Care NGO', date: '21 Apr 2026', rating: 5, status: 'Delivered' },
            { item: 'Meal Boxes', to: 'Hope Foundation', date: '18 Apr 2026', rating: 4, status: 'Delivered' },
          ].map((item, i) => (
             <div key={i} className="bg-white rounded-[32px] p-8 border border-[#F3F1E8] shadow-sm flex items-center justify-between">
                <div className="flex gap-6 items-center">
                   <div className="w-14 h-14 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
                      <CheckCircle2 className="w-8 h-8" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold text-[#2D1B14]">{item.item}</h4>
                      <p className="text-sm text-[#2D1B14]/40 font-bold uppercase tracking-widest">{item.to} · {item.date}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-[#F9A825] font-bold text-lg">
                   <Star className="w-6 h-6 fill-current" /> {item.rating}.0
                </div>
             </div>
          ))}
       </div>
    </div>
  );

  return (
    <DashboardLayout activeTab={activeTabName}>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tab === 'requests' && <DonationRequests />}
          {tab === 'navigation' && <RouteNavigation />}
          {tab === 'history' && <MyHistory />}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
}
