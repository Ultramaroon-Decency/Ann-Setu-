import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  Utensils, 
  History, 
  MessageSquare, 
  Globe, 
  AlertCircle, 
  Star, 
  Settings, 
  LogOut,
  Bell,
  Search,
  ChevronRight,
  UserCircle,
  Users,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
}

export default function DashboardLayout({ children, activeTab }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const donorMenu = [
    { name: t('Post Donation'), icon: Utensils, path: '/dashboard/donor' },
    { name: t('My Donations'), icon: History, path: '/dashboard/donor' },
    { name: t('Donation Requests'), icon: Bell, path: '/dashboard/donor' },
    { name: t('Language'), icon: Globe, path: '/language' },
    { name: t('Concerns (AI)'), icon: MessageSquare, path: '/concerns' },
    { name: t('Rating'), icon: Star, path: '#' },
    { name: t('Settings'), icon: Settings, path: '/settings' },
  ];

  const receiverMenu = [
    { name: t('Received Foods'), icon: History, path: '/dashboard/receiver?tab=received' },
    { name: t('Request Food'), icon: Search, path: '/dashboard/receiver?tab=request' },
    { name: t('Nearby Donors'), icon: Users, path: '/dashboard/receiver?tab=donors' },
    { name: t('Add Reviews'), icon: Star, path: '/dashboard/receiver?tab=reviews' },
    { name: t('Language'), icon: Globe, path: '/language' },
    { name: t('Settings'), icon: Settings, path: '/settings' },
  ];

  const volunteerMenu = [
    { name: t('Donation Requests'), icon: Bell, path: '/dashboard/volunteer' },
    { name: t('Route Navigation'), icon: MapPin, path: '/dashboard/volunteer' },
    { name: t('Language'), icon: Globe, path: '/language' },
    { name: t('Concerns (AI)'), icon: MessageSquare, path: '/concerns' },
    { name: t('Settings'), icon: Settings, path: '/settings' },
  ];

  const menuItems = user?.role === 'donor' ? donorMenu : user?.role === 'receiver' ? receiverMenu : volunteerMenu;

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#2D1B14] text-white flex flex-col fixed h-full z-50">
        <div className="p-8 pt-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center">
              <span className="text-xs">💚</span>
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-[#EE762B] mb-1">Anna Setu</h1>
          <div className="space-y-0.5">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">ID: {user?.id || 'AS-VNOCRH'}</p>
            <p className="font-bold text-sm text-white/80">{user?.name || 'Khushi Jain'}</p>
          </div>
          <button className="mt-4 text-white/40 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-1 mt-4">
          {menuItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => item.path !== '#' && navigate(item.path)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-r-none transition-all relative group ${
                  isActive 
                    ? 'text-[#EE762B] bg-white/5 border-r-4 border-[#EE762B]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#EE762B]' : 'text-white/60'}`} />
                <span className="text-sm font-bold">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-bold">{t('Sign Out')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 min-h-screen">
        <header className="px-10 py-8">
           <h2 className="text-xs font-bold text-[#2D1B14]/40 uppercase tracking-widest mb-1">{t('Dashboard')}</h2>
        </header>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="px-10 pb-10"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
