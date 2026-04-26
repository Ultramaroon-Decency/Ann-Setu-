import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, MapPin, Navigation, Phone, MessageSquare, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function RequestTracking() {
  const [step, setStep] = useState<'accepted' | 'connecting' | 'tracking'>('accepted');
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setStep('connecting'), 2500);
    const timer2 = setTimeout(() => setStep('tracking'), 6000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-6">
      <Link to="/dashboard/receiver" className="absolute top-8 left-8 text-sm font-bold text-[#2D1B14]/40 hover:text-[#2D1B14] transition-colors">
        ← Back to Dashboard
      </Link>

      <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl shadow-orange-900/5 p-12 border border-[#F3F1E8] relative overflow-hidden min-h-[600px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 'accepted' && (
            <motion.div 
              key="accepted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-[#2E7D32]" />
              </div>
              <h2 className="text-4xl font-display font-bold text-[#2D1B14] mb-4">Request Accepted!</h2>
              <p className="text-[#2D1B14]/40 text-lg">We have received your food request. Please wait while we find a volunteer.</p>
            </motion.div>
          )}

          {step === 'connecting' && (
            <motion.div 
              key="connecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-10">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 border-4 border-[#EE762B]/20 border-t-[#EE762B] rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-[#EE762B] animate-spin" />
                </div>
              </div>
              <h2 className="text-3xl font-display font-bold text-[#2D1B14] mb-4">Connecting to a nearby volunteer...</h2>
              <p className="text-[#2D1B14]/40 text-lg">Finding the best route and an available hero for you.</p>
            </motion.div>
          )}

          {step === 'tracking' && (
            <motion.div 
              key="tracking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full h-full flex flex-col"
            >
              <div className="flex justify-between items-start mb-8 w-full">
                <div>
                  <h2 className="text-3xl font-display font-bold text-[#2D1B14] mb-1">Volunteer on the way!</h2>
                  <p className="text-[#2D1B14]/40 font-bold flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Arriving in 8 mins
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button size="icon" className="rounded-full bg-[#FAF9F6] text-[#2D1B14] hover:bg-white border border-[#F3F1E8]">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button size="icon" className="rounded-full bg-[#FAF9F6] text-[#2D1B14] hover:bg-white border border-[#F3F1E8]">
                    <MessageSquare className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Simulated Map View */}
              <div className="flex-1 bg-[#FAF9F6] rounded-[32px] relative overflow-hidden min-h-[350px] border border-[#F3F1E8]">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2D1B14 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                
                {/* Volunteer Marker */}
                <motion.div 
                  initial={{ x: 50, y: 50 }}
                  animate={{ x: 300, y: 200 }}
                  transition={{ duration: 15, repeat: Infinity }}
                  className="absolute z-10"
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#EE762B] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                      <Navigation className="w-6 h-6 text-white rotate-45" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#2D1B14] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Rahul S. (Volunteer)
                    </div>
                  </div>
                </motion.div>

                {/* Destination Marker */}
                <div className="absolute right-[15%] bottom-[15%] z-0">
                  <div className="w-10 h-10 bg-[#3D8C62] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[#2D1B14] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-[#F3F1E8]">
                    Your Location
                  </div>
                </div>

                {/* Route Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                   <line x1="100" y1="100" x2="80%" y2="80%" stroke="#2D1B14" strokeWidth="4" strokeDasharray="8 8" />
                </svg>
              </div>

              <div className="mt-8 flex items-center gap-4 bg-[#FAF9F6] p-5 rounded-3xl border border-[#F3F1E8]">
                <div className="w-12 h-12 rounded-full bg-[#EE762B]/10 flex items-center justify-center">
                   <div className="w-8 h-8 rounded-full bg-[#EE762B]" />
                </div>
                <div>
                   <p className="text-xs text-[#2D1B14]/40 font-bold uppercase tracking-widest">Delivery Hero</p>
                   <p className="font-bold text-[#2D1B14]">Rahul Sharma is picking up from Spice Kitchen</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
