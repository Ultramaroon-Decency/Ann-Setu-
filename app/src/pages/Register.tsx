import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HandHeart, Heart, Truck, Eye, EyeOff, ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const roleConfig = {
  donor: { label: 'Donor', icon: HandHeart, color: 'from-orange-500 to-amber-500', desc: 'Share surplus food with those in need' },
  receiver: { label: 'Receiver', icon: Heart, color: 'from-emerald-500 to-green-500', desc: 'Request food for your community' },
  volunteer: { label: 'Volunteer', icon: Truck, color: 'from-yellow-500 to-orange-400', desc: 'Deliver food and bridge the gap' },
};

export default function Register() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { user, register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validRole = (role as keyof typeof roleConfig) || 'donor';
  const config = roleConfig[validRole] || roleConfig.donor;
  const RoleIcon = config.icon;

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.role}`, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For receiver, we use a simplified flow with a default password if not provided
    const isReceiver = validRole === 'receiver';
    const finalPassword = isReceiver ? 'receiver123' : password;

    if (!isReceiver && password !== confirmPassword) {
      toast({ title: '❌ Error', description: 'Passwords do not match.' });
      return;
    }
    
    setIsSubmitting(true);
    const result = await register({
      name,
      email,
      password: finalPassword,
      role: validRole as 'donor' | 'receiver' | 'volunteer',
      phone: phone || undefined,
      organization: organization || undefined,
    });
    setIsSubmitting(false);

    if (result.success) {
      toast({ title: '🎉 Account Created!', description: `Welcome to Ann Setu, ${name}!` });
      navigate(`/dashboard/${validRole}`);
    } else {
      toast({ title: '❌ Registration Failed', description: result.error || 'Something went wrong.' });
    }
  };

  if (validRole === 'receiver' || validRole === 'volunteer') {
    const isReceiver = validRole === 'receiver';
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-6">
        <Link to="/" className="absolute top-8 left-8 inline-flex items-center gap-2 text-sm text-[#2D1B14]/60 hover:text-[#2D1B14] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl shadow-orange-900/5 p-12 border border-[#F3F1E8]"
        >
          <div className="text-center mb-10">
            <h2 className="font-display text-5xl font-bold text-[#2D1B14] mb-3">
              Sign in as <span className="inline-block animate-pulse">{isReceiver ? '💚' : '🚛'}</span> {isReceiver ? 'Receiver' : 'Volunteer'}
            </h2>
            <p className="text-[#2D1B14]/40 font-body text-lg">Join the Ann Setu community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-bold text-[#2D1B14] block mb-2 px-1">Full Name</label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name" 
                className="h-14 rounded-2xl bg-[#FAF9F6] border-none focus-visible:ring-2 focus-visible:ring-[#EE762B]/20 text-lg px-6" 
                required 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-[#2D1B14] block mb-2 px-1">Email Address</label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="you@email.com" 
                className="h-14 rounded-2xl bg-[#FAF9F6] border-none focus-visible:ring-2 focus-visible:ring-[#EE762B]/20 text-lg px-6" 
                required 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-[#2D1B14] block mb-2 px-1">Contact Number</label>
              <Input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="+91 XXXXX XXXXX" 
                className="h-14 rounded-2xl bg-[#FAF9F6] border-none focus-visible:ring-2 focus-visible:ring-[#EE762B]/20 text-lg px-6" 
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 rounded-2xl font-bold text-xl bg-gradient-to-r from-[#EE762B] to-[#D95D16] text-white hover:opacity-90 transition-all shadow-lg shadow-orange-900/20 mt-4 group"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In & Continue <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#2D1B14]/40 font-body">
              Need to register as another role?{' '}
              <Link to="/" className="text-[#EE762B] font-bold hover:underline">Go Back</Link>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className={`hidden lg:flex lg:w-1/2 bg-gradient-to-br ${config.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8"
          >
            <RoleIcon className="w-16 h-16 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl font-bold mb-4 text-center"
          >
            Join as {config.label}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 font-body text-lg text-center max-w-sm"
          >
            {config.desc}
          </motion.p>
        </div>
      </div>

      {/* Right Panel — Register Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="mb-6">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Create Account</h2>
            <p className="text-muted-foreground font-body">Sign up as a {config.label.toLowerCase()} to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-body font-medium text-foreground block mb-1.5">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required autoFocus />
            </div>
            <div>
              <label className="text-sm font-body font-medium text-foreground block mb-1.5">Email Address</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required />
            </div>
            <div>
              <label className="text-sm font-body font-medium text-foreground block mb-1.5">Password</label>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 rounded-xl font-semibold text-base bg-gradient-to-r ${config.color} text-white hover:opacity-90 transition-opacity mt-2`}
            >
              {isSubmitting ? <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" /> : 'Create Account'}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
