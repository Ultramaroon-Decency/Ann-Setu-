import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'bn' | 'mr';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Sidebar
  'Received Foods': { en: 'Received Foods', hi: 'प्राप्त भोजन', ta: 'பெறப்பட்ட உணவுகள்', te: 'అందుకున్న ఆహారాలు', kn: 'ಸ್ವೀಕರಿಸಿದ ಆಹಾರಗಳು', bn: 'প্রাপ্ত খাবার', mr: 'मिळालेले अन्न' },
  'Request Food': { en: 'Request Food', hi: 'भोजन का अनुरोध करें', ta: 'உணவு கோரிக்கை', te: 'ఆహార అభ్యర్థన', kn: 'ಆಹಾರ ವಿನಂತಿ', bn: 'খাবারের অনুরোধ', mr: 'अन्न विनंती' },
  'Nearby Donors': { en: 'Nearby Donors', hi: 'पास के दाता', ta: 'அருகிலுள்ள நன்கொடையாளர்கள்', te: 'సమీప దాతలు', kn: 'ಹತ್ತಿರದ ದಾನಿಗಳು', bn: 'কাছাকাছি দাতারা', mr: 'जवळपासचे दाते' },
  'Add Reviews': { en: 'Add Reviews', hi: 'समीक्षा जोड़ें', ta: 'மதிப்புரைகளைச் சேர்க்கவும்', te: 'సమీక్షలను జోడించండి', kn: 'ವಿಮರ್ಶೆಗಳನ್ನು ಸೇರಿಸಿ', bn: 'রিভিউ যোগ করুন', mr: 'पुनरावलोकने जोडा' },
  'Language': { en: 'Language', hi: 'भाषा', ta: 'மொழி', te: 'భాష', kn: 'ಭಾಷೆ', bn: 'ভাষা', mr: 'भाषा' },
  'Settings': { en: 'Settings', hi: 'सेटिंग्स', ta: 'அமைப்புகள்', te: 'సెట్టింగులు', kn: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು', bn: 'সেটিংস', mr: 'सेटिंग्ज' },
  'Sign Out': { en: 'Sign Out', hi: 'साइन आउट', ta: 'வெளியேறு', te: 'సైన్ అవుట్', kn: 'ಸೈನ್ ಔಟ್', bn: 'সাইন আউট', mr: 'साइन आउट' },
  
  // Dashboard Headers
  'Dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड', ta: 'டாஷ்போர்டு', te: 'డాష్‌బోర్డ్', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', bn: 'ড্যাশবোর্ড', mr: 'डॅशबोर्ड' },
  
  // Auth
  'Sign in as Receiver': { en: 'Sign in as Receiver', hi: 'प्राप्तकर्ता के रूप में साइन इन करें', ta: 'பெறுநராக உள்நுழையவும்', te: 'రిసీవర్‌గా సైన్ ఇన్ చేయండి', kn: 'ಸ್ವೀಕರಿಸುವವರಾಗಿ ಸೈನ್ ಇನ್ ಮಾಡಿ', bn: 'প্রাপক হিসেবে সাইন ইন করুন', mr: 'प्राप्तकर्ता म्हणून साइन इन करा' },
  'Full Name': { en: 'Full Name', hi: 'पूरा नाम', ta: 'முழு பெயர்', te: 'పూర్తి పేరు', kn: 'ಪೂರ್ಣ ಹೆಸರು', bn: 'পুরো নাম', mr: 'पूर्ण नाव' },
  'Email Address': { en: 'Email Address', hi: 'ईमेल पता', ta: 'மின்னஞ்சல் முகவரி', te: 'ఈమెయిల్ చిరునామా', kn: 'ಇಮೇಲ್ ವಿಳಾಸ', bn: 'ইমেল ঠিকানা', mr: 'ईमेल पत्ता' },
  'Contact Number': { en: 'Contact Number', hi: 'संपर्क नंबर', ta: 'தொடர்பு எண்', te: 'సంప్రదింపు సంఖ్య', kn: 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ', bn: 'যোগাযোগ নম্বর', mr: 'संपर्क क्रमांक' },
  'Sign In & Continue': { en: 'Sign In & Continue', hi: 'साइन इन करें और जारी रखें', ta: 'உள்நுழைந்து தொடரவும்', te: 'సైన్ ఇన్ చేసి కొనసాగించండి', kn: 'ಸೈನ್ ಇನ್ ಮಾಡಿ ಮತ್ತು ಮುಂದುವರಿಸಿ', bn: 'সাইন ইন করুন এবং চালিয়ে যান', mr: 'साइन इन करा आणि सुरू ठेवा' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
