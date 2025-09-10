import React, { createContext, useContext, useState } from 'react';

export type Language = 'english' | 'hindi' | 'punjabi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  english: {
    welcome: 'Welcome to ApexMind',
    subtitle: 'Digital Learning Platform for Rural Students and Teachers',
    description: 'ApexMind empowers rural students with quality education through offline-first technology. Access comprehensive lessons, interactive quizzes, and track your progress - all without reliable internet connection.',
    howToUse: 'How to Use ApexMind',
    step1: 'Choose your preferred language',
    step2: 'Select Student or Teacher view',
    step3: 'Pick your class (1-12)',
    step4: 'Choose your subjects and start learning',
    getStarted: 'Get Started',
    studentView: 'Student View',
    teacherView: 'Teacher View',
    selectClass: 'Select Your Class',
    subjects: 'Subjects',
    selectStream: 'Select Stream',
    science: 'Science',
    commerce: 'Commerce',
    humanities: 'Humanities',
    pcm: 'PCM (Physics, Chemistry, Mathematics)',
    pcb: 'PCB (Physics, Chemistry, Biology)',
    pcmb: 'PCMB (Physics, Chemistry, Mathematics, Biology)',
    extraSubjects: 'Extra Subjects',
    computerProgramming: 'Computer Programming (C Language)',
    physicalEducation: 'Physical Education',
    takeQuiz: 'Take Quiz',
    progress: 'Progress',
    completed: 'Completed',
    inProgress: 'In Progress',
  },
  hindi: {
    welcome: 'ApexMind में आपका स्वागत है',
    subtitle: 'ग्रामीण छात्रों और शिक्षकों के लिए डिजिटल लर्निंग प्लेटफॉर्म',
    description: 'ApexMind ऑफलाइन-फर्स्ट तकनीक के माध्यम से ग्रामीण छात्रों को गुणवत्तापूर्ण शिक्षा प्रदान करता है। व्यापक पाठ, इंटरैक्टिव क्विज़ का उपयोग करें और अपनी प्रगति को ट्रैक करें - सभी बिना विश्वसनीय इंटरनेट कनेक्शन के।',
    howToUse: 'ApexMind का उपयोग कैसे करें',
    step1: 'अपनी पसंदीदा भाषा चुनें',
    step2: 'छात्र या शिक्षक दृश्य चुनें',
    step3: 'अपनी कक्षा चुनें (1-12)',
    step4: 'अपने विषय चुनें और सीखना शुरू करें',
    getStarted: 'शुरू करें',
    studentView: 'छात्र दृश्य',
    teacherView: 'शिक्षक दृश्य',
    selectClass: 'अपनी कक्षा चुनें',
    subjects: 'विषय',
    selectStream: 'स्ट्रीम चुनें',
    science: 'विज्ञान',
    commerce: 'वाणिज्य',
    humanities: 'मानविकी',
    pcm: 'PCM (भौतिकी, रसायन, गणित)',
    pcb: 'PCB (भौतिकी, रसायन, जीव विज्ञान)',
    pcmb: 'PCMB (भौतिकी, रसायन, गणित, जीव विज्ञान)',
    extraSubjects: 'अतिरिक्त विषय',
    computerProgramming: 'कंप्यूटर प्रोग्रामिंग (C भाषा)',
    physicalEducation: 'शारीरिक शिक्षा',
    takeQuiz: 'क्विज़ लें',
    progress: 'प्रगति',
    completed: 'पूर्ण',
    inProgress: 'प्रगति में',
  },
  punjabi: {
    welcome: 'ApexMind ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
    subtitle: 'ਪੇਂਡੂ ਵਿਦਿਆਰਥੀਆਂ ਅਤੇ ਅਧਿਆਪਕਾਂ ਲਈ ਡਿਜੀਟਲ ਸਿੱਖਿਆ ਪਲੇਟਫਾਰਮ',
    description: 'ApexMind ਆਫਲਾਈਨ-ਫਰਸਟ ਤਕਨਾਲੋਜੀ ਰਾਹੀਂ ਪੇਂਡੂ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਗੁਣਵੱਤਾ ਵਾਲੀ ਸਿੱਖਿਆ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। ਵਿਆਪਕ ਪਾਠ, ਇੰਟਰਐਕਟਿਵ ਕਵਿਜ਼ਾਂ ਤੱਕ ਪਹੁੰਚ ਕਰੋ ਅਤੇ ਆਪਣੀ ਪ੍ਰਗਤੀ ਨੂੰ ਟਰੈਕ ਕਰੋ - ਸਭ ਕੁਝ ਭਰੋਸੇਮੰਦ ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ ਤੋਂ ਬਿਨਾਂ।',
    howToUse: 'ApexMind ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ',
    step1: 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ',
    step2: 'ਵਿਦਿਆਰਥੀ ਜਾਂ ਅਧਿਆਪਕ ਦਰਸ਼ਨ ਚੁਣੋ',
    step3: 'ਆਪਣੀ ਜਮਾਤ ਚੁਣੋ (1-12)',
    step4: 'ਆਪਣੇ ਵਿਸ਼ੇ ਚੁਣੋ ਅਤੇ ਸਿੱਖਣਾ ਸ਼ੁਰੂ ਕਰੋ',
    getStarted: 'ਸ਼ੁਰੂ ਕਰੋ',
    studentView: 'ਵਿਦਿਆਰਥੀ ਦਰਸ਼ਨ',
    teacherView: 'ਅਧਿਆਪਕ ਦਰਸ਼ਨ',
    selectClass: 'ਆਪਣੀ ਜਮਾਤ ਚੁਣੋ',
    subjects: 'ਵਿਸ਼ੇ',
    selectStream: 'ਸਟਰੀਮ ਚੁਣੋ',
    science: 'ਵਿਗਿਆਨ',
    commerce: 'ਵਪਾਰ',
    humanities: 'ਮਾਨਵਿਕੀ',
    pcm: 'PCM (ਭੌਤਿਕ ਵਿਗਿਆਨ, ਰਸਾਇਣ, ਗਣਿਤ)',
    pcb: 'PCB (ਭੌਤਿਕ ਵਿਗਿਆਨ, ਰਸਾਇਣ, ਜੀਵ ਵਿਗਿਆਨ)',
    pcmb: 'PCMB (ਭੌਤਿਕ ਵਿਗਿਆਨ, ਰਸਾਇਣ, ਗਣਿਤ, ਜੀਵ ਵਿਗਿਆਨ)',
    extraSubjects: 'ਵਾਧੂ ਵਿਸ਼ੇ',
    computerProgramming: 'ਕੰਪਿਊਟਰ ਪ੍ਰੋਗਰਾਮਿੰਗ (C ਭਾਸ਼ਾ)',
    physicalEducation: 'ਸਰੀਰਕ ਸਿੱਖਿਆ',
    takeQuiz: 'ਕਵਿਜ਼ ਲਓ',
    progress: 'ਪ੍ਰਗਤੀ',
    completed: 'ਪੂਰਾ',
    inProgress: 'ਪ੍ਰਗਤੀ ਵਿੱਚ',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');

  const t = (key: string): string => {
    return translations[language][key] || key;
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