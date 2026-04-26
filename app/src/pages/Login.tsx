import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HandHeart, Heart, Truck, Eye, EyeOff, ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const roleConfig = {
  donor: { label: 'Donor', icon: HandHeart, color: 'from-orange-500 to-amber-500', desc: 'Share surplus food with those in need' },
  receiver: { label: 'Receiver', icon: Heart, color: 'from-emerald-500 to-green-500', desc: 'Request food for your community' },
  volunteer: { label: 'Volunteer', icon: Truck, color: 'from-yellow-500 to-orange-400', desc: 'Deliver food and bridge the gap' },
};

export default function Login() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.donor;
  const RoleIcon = config.icon;

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.role}`, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      toast({ title: '🎉 Welcome back!', description: 'You have been logged in successfully.' });
    } else {
      toast({ title: '❌ Login Failed', description: result.error || 'Please check your credentials.' });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel — Decorative */}
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
            Welcome, {config.label}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 font-body text-lg text-center max-w-sm"
          >
            {config.desc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-white/60 text-sm font-body">Part of the</p>
            <p className="font-display text-2xl font-bold mt-1">
              <span className="text-white">Ann</span> Setu
            </p>
          </motion.div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute top-1/3 -left-8 w-32 h-32 rounded-full bg-white/5" />
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center`}>
              <RoleIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{config.label} Login</h2>
              <p className="text-sm text-muted-foreground">{config.desc}</p>
            </div>
          </div>

          <div className="hidden lg:block mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Sign In</h2>
            <p className="text-muted-foreground font-body">Enter your credentials to access your {config.label.toLowerCase()} dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-body font-medium text-foreground block mb-1.5">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="text-sm font-body font-medium text-foreground block mb-1.5">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 rounded-xl font-semibold text-base bg-gradient-to-r ${config.color} text-white hover:opacity-90 transition-opacity`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" /> Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground font-body">
              Don't have an account?{' '}
              <Link to={`/register/${role}`} className="text-primary font-semibold hover:underline">
                Create one
              </Link>
            </p>
          </div>

          {/* Role switcher */}
          <div className="mt-10 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-3 font-body">Or sign in as a different role</p>
            <div className="flex justify-center gap-3">
              {Object.entries(roleConfig).map(([key, cfg]) => (
                <Link
                  key={key}
                  to={`/login/${key}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    role === key
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <cfg.icon className="w-3.5 h-3.5" />
                  {cfg.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
