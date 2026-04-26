import { useLanguage } from '@/context/LanguageContext';
import DashboardLayout from '@/components/DashboardLayout';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'kn', name: 'Kannada' },
  { code: 'bn', name: 'Bengali' },
  { code: 'mr', name: 'Marathi' },
] as const;

export default function LanguagePage() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DashboardLayout activeTab={t('Language')}>
      <div className="max-w-4xl">
        <h2 className="text-4xl font-display font-bold text-[#2D1B14] mb-8">{t('Language')}</h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FAF9F4] rounded-[40px] p-10 border border-[#F3F1E8] shadow-sm max-w-lg"
        >
          <div className="space-y-3">
            {languages.map((lang) => {
              const isActive = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`w-full text-left px-8 py-5 rounded-2xl font-bold text-lg transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#EE762B] to-[#D95D16] text-white shadow-lg shadow-orange-900/10' 
                      : 'text-[#2D1B14] hover:bg-white/50'
                  }`}
                >
                  {lang.name}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
