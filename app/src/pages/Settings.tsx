import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Building, Save, Camera } from 'lucide-react';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [org, setOrg] = useState(user?.organization || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await updateProfile({
      name,
      email,
      phone,
      organization: org
    });
    
    setIsSubmitting(false);
    
    if (result.success) {
      toast({ title: '✅ Profile Updated', description: 'Your changes have been saved successfully.' });
    } else {
      toast({ title: '❌ Update Failed', description: result.error || 'Something went wrong.' });
    }
  };

  return (
    <DashboardLayout activeTab={t('Settings')}>
      <div className="max-w-4xl">
        <h2 className="text-4xl font-display font-bold text-[#2D1B14] mb-8">{t('Settings')}</h2>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] p-10 border border-[#F3F1E8] shadow-sm"
            >
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-[#2D1B14] block mb-2 px-1">{t('Full Name')}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D1B14]/20" />
                    <Input 
                      value={name} 
                      onChange={e => setName(e.target.value)}
                      className="h-14 rounded-2xl bg-[#FAF9F6] border-none text-lg pl-12" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-[#2D1B14] block mb-2 px-1">{t('Email Address')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D1B14]/20" />
                    <Input 
                      type="email"
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      className="h-14 rounded-2xl bg-[#FAF9F6] border-none text-lg pl-12" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-bold text-[#2D1B14] block mb-2 px-1">{t('Contact Number')}</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D1B14]/20" />
                      <Input 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)}
                        className="h-14 rounded-2xl bg-[#FAF9F6] border-none text-lg pl-12" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#2D1B14] block mb-2 px-1">Organization</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D1B14]/20" />
                      <Input 
                        value={org} 
                        onChange={e => setOrg(e.target.value)}
                        className="h-14 rounded-2xl bg-[#FAF9F6] border-none text-lg pl-12" 
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-2xl bg-[#EE762B] text-white font-bold text-xl hover:bg-[#D95D16] transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-6 h-6" /> Save Changes
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#FAF9F4] rounded-[40px] p-8 border border-[#F3F1E8] text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-[#EE762B] flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#2D1B14] rounded-full flex items-center justify-center text-white border-2 border-white hover:scale-110 transition-all">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-[#2D1B14]">{user?.name}</h3>
              <p className="text-[#2D1B14]/40 font-bold text-sm uppercase tracking-widest mt-1">ID: {user?.id?.slice(0, 8)}</p>
              <div className="mt-4 inline-block bg-[#EE762B]/10 text-[#EE762B] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                {user?.role}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#2D1B14] rounded-[40px] p-8 text-white"
            >
              <h4 className="font-bold mb-4">Security Tip</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Keep your profile updated to help volunteers and donors reach you faster. Your contact number is only visible to verified partners.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
