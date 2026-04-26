import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  let title = "Thank You!";
  let message = "Your action has been recorded.";

  if (type === 'review') {
    title = "Thank You!";
    message = "Thank You for your valuable response";
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl shadow-orange-900/5 p-16 border border-[#F3F1E8] text-center"
      >
        <div className="w-24 h-24 bg-[#FFF8E1] rounded-full flex items-center justify-center mx-auto mb-10">
          <Heart className="w-12 h-12 text-[#EE762B] fill-[#EE762B]" />
        </div>
        
        <h2 className="text-5xl font-display font-bold text-[#2D1B14] mb-6">{title}</h2>
        <p className="text-[#2D1B14]/60 text-2xl font-body mb-12 max-w-md mx-auto leading-relaxed">
          {message}
        </p>

        <Link to="/dashboard/receiver">
          <Button className="h-16 px-10 rounded-2xl bg-[#2D1B14] text-white font-bold text-xl hover:bg-[#3D2B24] transition-all group">
            Back to Dashboard <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
