import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { 
  History, 
  Search, 
  Users, 
  Star, 
  MapPin, 
  Package, 
  ChevronRight, 
  CheckCircle2, 
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReceiverDashboard() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = searchParams.get('tab') || 'received';

  const [activeTabName, setActiveTabName] = useState('Received Foods');

  useEffect(() => {
    switch (tab) {
      case 'received': setActiveTabName('Received Foods'); break;
      case 'request': setActiveTabName('Request Food'); break;
      case 'donors': setActiveTabName('Nearby Donors'); break;
      case 'reviews': setActiveTabName('Add Reviews'); break;
      default: setActiveTabName('Received Foods');
    }
  }, [tab]);

  // --- Sub-components for sections ---

  const ReceivedFoods = () => (
    <div className="space-y-6">
      <h2 className="text-4xl font-display font-bold text-[#2D1B14] mb-8">Received Foods</h2>
      <div className="space-y-4">
        {[
          { name: 'Biryani (20 plates)', date: '2026-04-10', from: 'Spice Kitchen', veg: true, rating: 'Excellent' },
          { name: 'Roti & Sabzi (50 packs)', date: '2026-04-08', from: 'Annapurna Restaurant', veg: true, rating: 'Good' },
          { name: 'Chicken Curry (15 plates)', date: '2026-04-06', from: 'Hotel Grand', veg: false, rating: 'Excellent' },
        ].map((food, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[32px] p-8 border border-[#F3F1E8] shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          >
            <div>
              <h4 className="text-2xl font-bold text-[#2D1B14] mb-1">{food.name}</h4>
              <p className="text-[#2D1B14]/40 text-sm font-medium">
                {food.date} · From: {food.from}
              </p>
            </div>
            <div className="flex gap-3">
              <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold ${food.veg ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFEBEE] text-[#C62828]'}`}>
                <span className="text-[10px]">🥗</span> {food.veg ? 'Veg' : 'Non-Veg'}
              </span>
              <span className="bg-[#FFF8E1] text-[#F9A825] px-4 py-1.5 rounded-full text-xs font-bold">
                {food.rating}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const RequestFood = () => {
    const [formData, setFormData] = useState({
      org: 'pehchaan street school',
      people: '25',
      urgency: 'High',
      preference: 'Any',
      details: 'fresh hot food'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      navigate('/request-tracking');
    };

    return (
      <div className="max-w-4xl">
        <h2 className="text-4xl font-display font-bold text-[#2D1B14] mb-8">Request Food</h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[40px] p-10 border border-[#F3F1E8] shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-sm font-bold text-[#2D1B14] block mb-3 px-1">Organization / Individual Name</label>
              <Input 
                value={formData.org} 
                onChange={e => setFormData({...formData, org: e.target.value})}
                className="h-14 rounded-2xl bg-[#FAF9F6] border-none text-lg px-6" 
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-sm font-bold text-[#2D1B14] block mb-3 px-1">Number of People</label>
                <Input 
                  value={formData.people} 
                  onChange={e => setFormData({...formData, people: e.target.value})}
                  className="h-14 rounded-2xl bg-[#FAF9F6] border-none text-lg px-6" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm font-bold text-[#2D1B14] block mb-3 px-1">Urgency</label>
                <select 
                  value={formData.urgency}
                  onChange={e => setFormData({...formData, urgency: e.target.value})}
                  className="w-full h-14 rounded-2xl bg-[#FAF9F6] border-none text-lg px-6 appearance-none focus:ring-0"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-[#2D1B14] block mb-3 px-1">Food Preference</label>
              <select 
                value={formData.preference}
                onChange={e => setFormData({...formData, preference: e.target.value})}
                className="w-full h-14 rounded-2xl bg-[#FAF9F6] border-none text-lg px-6 appearance-none focus:ring-0"
              >
                <option>Any</option>
                <option>Veg</option>
                <option>Non-Veg</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-[#2D1B14] block mb-3 px-1">Additional Details</label>
              <Textarea 
                value={formData.details}
                onChange={e => setFormData({...formData, details: e.target.value})}
                className="rounded-2xl bg-[#FAF9F6] border-none text-lg p-6 min-h-[150px]" 
              />
            </div>
            <Button type="submit" className="w-full h-16 rounded-2xl bg-[#3D8C62] text-white font-bold text-xl hover:bg-[#2D6A4A] transition-all group">
              Submit Request 🙏
            </Button>
          </form>
        </motion.div>
      </div>
    );
  };

  const NearbyDonors = () => {
    const donors = [
      { name: 'Spice Kitchen', dist: '0.5 km', active: 3, rating: 4.9 },
      { name: 'Annapurna Restaurant', dist: '1.2 km', active: 1, rating: 4.7 },
      { name: 'Community Feast Hall', dist: '2.0 km', active: 5, rating: 4.5 },
      { name: 'Hotel Grand', dist: '3.1 km', active: 2, rating: 4.8 },
    ];

    return (
      <div className="space-y-8">
        <h2 className="text-4xl font-display font-bold text-[#2D1B14] mb-8">Nearby Food Donors</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {donors.map((donor, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[40px] p-8 border border-[#F3F1E8] shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#FFB74D] flex items-center justify-center text-white shadow-lg">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#2D1B14] mb-1">{donor.name}</h4>
                  <p className="text-[#2D1B14]/40 text-sm font-bold flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {donor.dist}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-8">
                <p className="text-[#2D1B14]/40 font-bold text-sm">{donor.active} active donations</p>
                <div className="flex items-center gap-1 text-[#F9A825] font-bold">
                  <Star className="w-4 h-4 fill-current" /> {donor.rating}
                </div>
              </div>
              <button 
                onClick={() => navigate(`/donor-profile/${i}`)}
                className="text-[#EE762B] font-bold text-lg hover:underline flex items-center gap-1"
              >
                Click to view details <ArrowRight className="w-5 h-5 mt-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const AddReview = () => {
    const [rating, setRating] = useState(0);
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      navigate('/confirmation?type=review');
    };

    return (
      <div className="max-w-4xl">
        <h2 className="text-4xl font-display font-bold text-[#2D1B14] mb-8">Add a Review</h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[40px] p-10 border border-[#F3F1E8] shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-sm font-bold text-[#2D1B14] block mb-3 px-1">Donor Name</label>
              <Input 
                placeholder="Who donated?"
                className="h-14 rounded-2xl bg-[#FAF9F6] border-none text-lg px-6" 
                required 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-[#2D1B14] block mb-3 px-1">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button type="button" key={s} onClick={() => setRating(s)}>
                    <Star className={`w-8 h-8 ${s <= rating ? 'fill-[#F9A825] text-[#F9A825]' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-[#2D1B14] block mb-3 px-1">Your Review</label>
              <Textarea 
                placeholder="Share your experience..."
                className="rounded-2xl bg-[#FAF9F6] border-none text-lg p-6 min-h-[150px]" 
                required
              />
            </div>
            <Button type="submit" className="w-full h-16 rounded-2xl bg-[#EE762B] text-white font-bold text-xl hover:bg-[#D95D16] transition-all">
              Submit Review
            </Button>
          </form>
        </motion.div>
      </div>
    );
  };

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
          {tab === 'received' && <ReceivedFoods />}
          {tab === 'request' && <RequestFood />}
          {tab === 'donors' && <NearbyDonors />}
          {tab === 'reviews' && <AddReview />}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
}
