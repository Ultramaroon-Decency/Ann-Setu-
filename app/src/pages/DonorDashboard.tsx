import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Leaf, Package, Clock, MapPin, CheckCircle2, User, Phone, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FoodItem {
  id: string;
  name: string;
  ingredients: string;
  type: string;
  quantity: string;
  donorName: string;
  bestBefore: string;
  status: 'available' | 'requested' | 'picked-up' | 'delivered';
  feedback?: string;
  createdAt: string;
}

interface Request {
  id: string;
  requesterId: string;
  requesterName: string;
  foodId: string;
  foodName: string;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'pending' | 'confirmed';
}

const KEY = 'annsetu_donor_foods';
const REQ_KEY = 'annsetu_donor_requests';

const getFoods = (): FoodItem[] => JSON.parse(localStorage.getItem(KEY) || '[]');
const saveFoods = (f: FoodItem[]) => localStorage.setItem(KEY, JSON.stringify(f));

const getRequests = (): Request[] => {
  const reqs = localStorage.getItem(REQ_KEY);
  if (reqs) return JSON.parse(reqs);
  // Default mockup requests if empty
  const mock: Request[] = [
    { id: 'req-1', requesterId: 'RCV-102', requesterName: 'Hope NGO', foodId: 'f-1', foodName: 'Vegetable Biryani', urgency: 'High', status: 'pending' },
    { id: 'req-2', requesterId: 'RCV-105', requesterName: 'Care Foundation', foodId: 'f-1', foodName: 'Vegetable Biryani', urgency: 'Medium', status: 'pending' },
  ];
  localStorage.setItem(REQ_KEY, JSON.stringify(mock));
  return mock;
};

export default function DonorDashboard() {
  const { user } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'post' | 'list' | 'requests' | 'tracking'>('post');
  const [foods, setFoods] = useState<FoodItem[]>(getFoods());
  const [requests, setRequests] = useState<Request[]>(getRequests());
  const [trackingRequest, setTrackingRequest] = useState<Request | null>(null);

  const [form, setForm] = useState({
    name: '',
    ingredients: '',
    type: 'Vegetarian',
    quantity: '',
    donorName: user?.name || '',
    bestBefore: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item: FoodItem = { 
      ...form, 
      id: `DN-${Math.floor(Math.random() * 10000)}`, 
      status: 'available', 
      createdAt: new Date().toISOString() 
    };
    const updated = [item, ...foods];
    setFoods(updated);
    saveFoods(updated);
    toast({ title: '🎉 Donation Posted!', description: `"${form.name}" has been listed successfully.` });
    setForm({ ...form, name: '', ingredients: '', quantity: '', bestBefore: '' });
    setActiveSubTab('list');
  };

  const handleConfirmRequest = (reqId: string) => {
    const updated = requests.map(r => r.id === reqId ? { ...r, status: 'confirmed' as const } : r);
    setRequests(updated);
    localStorage.setItem(REQ_KEY, JSON.stringify(updated));
    toast({ title: '✅ Request Confirmed', description: 'Wait for a delivery agent to connect.' });
  };

  const handleConnectAgent = (req: Request) => {
    setTrackingRequest(req);
    setActiveSubTab('tracking');
    toast({ title: '🚀 Connected to Agent', description: 'Agent Rahul is on the way for pickup.' });
  };

  const setField = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <DashboardLayout activeTab={
      activeSubTab === 'post' ? 'Post Donation' : 
      activeSubTab === 'list' ? 'My Donations' : 
      'Donation Requests'
    }>
      <div className="max-w-5xl mx-auto">
        {/* Sub-navigation Tabs */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveSubTab('post')}
            className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${activeSubTab === 'post' ? 'bg-[#EE762B] text-white' : 'bg-white text-[#2D1B14] border border-[#F3F1E8]'}`}
          >
            Post New
          </button>
          <button 
            onClick={() => setActiveSubTab('list')}
            className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${activeSubTab === 'list' ? 'bg-[#EE762B] text-white' : 'bg-white text-[#2D1B14] border border-[#F3F1E8]'}`}
          >
            My History
          </button>
          <button 
            onClick={() => setActiveSubTab('requests')}
            className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${activeSubTab === 'requests' ? 'bg-[#EE762B] text-white' : 'bg-white text-[#2D1B14] border border-[#F3F1E8]'}`}
          >
            Incoming Requests ({requests.filter(r => r.status === 'pending').length})
          </button>
          {trackingRequest && (
            <button 
              onClick={() => setActiveSubTab('tracking')}
              className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${activeSubTab === 'tracking' ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600 border border-emerald-100'}`}
            >
              Live Tracking
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {activeSubTab === 'post' && (
            <motion.div key="post" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-3xl font-bold font-display text-[#2D1B14] mb-8">Post a New Donation</h2>
              <div className="bg-[#FAF9F4] rounded-3xl p-8 border border-[#F3F1E8] shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#2D1B14]">Food Item Name</label>
                    <Input value={form.name} onChange={e => setField('name', e.target.value)} placeholder="e.g. Vegetable Biryani" className="bg-white rounded-xl h-12" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#2D1B14]">Ingredients</label>
                    <Textarea value={form.ingredients} onChange={e => setField('ingredients', e.target.value)} placeholder="Rice, vegetables, spices..." className="bg-white rounded-xl min-h-[100px] resize-none" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#2D1B14]">Type</label>
                      <Select value={form.type} onChange={e => setField('type', (e.target as HTMLSelectElement).value)}>
                        <SelectTrigger className="bg-white rounded-xl h-12">
                          <div className="flex items-center gap-2"><Leaf className="w-4 h-4 text-emerald-600" /><SelectValue /></div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#2D1B14]">Quantity (servings)</label>
                      <Input value={form.quantity} onChange={e => setField('quantity', e.target.value)} placeholder="e.g. 50" className="bg-white rounded-xl h-12" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#2D1B14]">Donor / Restaurant Name</label>
                    <Input value={form.donorName} onChange={e => setField('donorName', e.target.value)} placeholder="Your name or restaurant" className="bg-white rounded-xl h-12" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#2D1B14]">Best Before</label>
                    <Input type="datetime-local" value={form.bestBefore} onChange={e => setField('bestBefore', e.target.value)} className="bg-white rounded-xl h-12" required />
                  </div>
                  <Button type="submit" className="w-full bg-[#EE762B] hover:bg-[#D96520] text-white font-bold h-14 rounded-xl text-lg shadow-lg">Post Donation 🍲</Button>
                </form>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'list' && (
            <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-3xl font-bold font-display text-[#2D1B14] mb-8">My Donation History</h2>
              <div className="grid gap-6">
                {foods.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#E5E7EB]">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No donations posted yet.</p>
                  </div>
                ) : (
                  foods.map((food) => (
                    <div key={food.id} className="bg-white rounded-3xl p-6 border border-[#F3F1E8] shadow-sm flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold text-[#2D1B14]">{food.name}</h4>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${food.type === 'Vegetarian' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{food.type}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" />{food.quantity} servings</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{new Date(food.createdAt).toLocaleDateString()}</span>
                        </div>
                        {food.feedback && (
                          <div className="mt-4 p-3 bg-[#FAF9F4] rounded-xl border border-[#F3F1E8]">
                            <p className="text-xs font-bold text-[#2D1B14] mb-1">Receiver Feedback:</p>
                            <p className="text-sm italic text-muted-foreground">"{food.feedback}"</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                          food.status === 'available' ? 'bg-blue-50 text-blue-600' : 
                          food.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                          {food.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeSubTab === 'requests' && (
            <motion.div key="requests" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-3xl font-bold font-display text-[#2D1B14] mb-8">Incoming Donation Requests</h2>
              <div className="grid gap-6">
                {requests.map((req) => (
                  <div key={req.id} className="bg-white rounded-3xl p-6 border border-[#F3F1E8] shadow-sm relative overflow-hidden">
                    <div className={`absolute top-0 right-0 px-4 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      req.urgency === 'High' ? 'bg-red-500 text-white' : 
                      req.urgency === 'Medium' ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'
                    }`}>
                      {req.urgency} URGENCY
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-[#2D1B14]/5 flex items-center justify-center font-bold text-[#2D1B14]">
                            {req.requesterName.substring(0, 1)}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-[#2D1B14]">{req.requesterName}</h4>
                            <p className="text-xs text-muted-foreground">Requester ID: {req.requesterId}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium mb-2 text-[#2D1B14]">Requesting: <span className="text-[#EE762B]">{req.foodName}</span></p>
                      </div>
                      <div className="flex flex-col gap-2 min-w-[200px]">
                        {req.status === 'pending' ? (
                          <Button onClick={() => handleConfirmRequest(req.id)} className="bg-[#2D1B14] hover:bg-black text-white rounded-xl h-12 font-bold">
                            Confirm Request
                          </Button>
                        ) : (
                          <>
                            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 flex items-center gap-2 mb-2">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-xs font-bold">Request Confirmed</span>
                            </div>
                            <Button onClick={() => handleConnectAgent(req)} className="bg-[#EE762B] hover:bg-[#D96520] text-white rounded-xl h-12 font-bold">
                              Connect to Delivery Agent
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSubTab === 'tracking' && trackingRequest && (
            <motion.div key="tracking" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold font-display text-[#2D1B14]">Live Location Tracking</h2>
                <Button variant="ghost" onClick={() => setActiveSubTab('requests')} className="text-[#EE762B] font-bold">Back to Requests</Button>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-[#F3F1E8] shadow-lg">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="col-span-2 relative h-[400px] bg-[#F3F4F6] rounded-2xl overflow-hidden border border-[#E5E7EB]">
                    {/* Mock Map */}
                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/80.37,13.08,12,0/800x400?access_token=mock')] bg-cover opacity-60" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full animate-ping absolute -inset-0" />
                        <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white relative shadow-lg">
                          <Navigation className="w-6 h-6 animate-pulse" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-md border border-[#E5E7EB]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#EE762B] rounded-full flex items-center justify-center text-white font-bold">R</div>
                          <div>
                            <p className="text-xs font-bold text-[#2D1B14]">Rahul (Agent)</p>
                            <p className="text-[10px] text-muted-foreground">5 mins away from pickup</p>
                          </div>
                        </div>
                        <Button size="icon" className="bg-[#2D1B14] rounded-full"><Phone className="w-4 h-4 text-white" /></Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-[#2D1B14]">Delivery Progress</h4>
                    <div className="space-y-4">
                      {[
                        { label: 'Agent Assigned', time: '10:30 AM', done: true },
                        { label: 'Out for Pickup', time: '10:45 AM', done: true },
                        { label: 'Pickup Complete', time: '--', done: false },
                        { label: 'Out for Delivery', time: '--', done: false },
                        { label: 'Food Delivered', time: '--', done: false },
                      ].map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full border-4 ${step.done ? 'bg-[#EE762B] border-white' : 'bg-white border-[#F3F4F6]'} shadow-sm flex items-center justify-center`}>
                              {step.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                            {idx < 4 && <div className={`w-0.5 h-10 ${step.done ? 'bg-[#EE762B]' : 'bg-[#F3F4F6]'}`} />}
                          </div>
                          <div>
                            <p className={`text-sm font-bold ${step.done ? 'text-[#2D1B14]' : 'text-muted-foreground'}`}>{step.label}</p>
                            <p className="text-[10px] text-muted-foreground">{step.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
