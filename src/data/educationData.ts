export interface Subject {
  id: string;
  name: string;
  nameHindi: string;
  namePunjabi: string;
}

export interface Stream {
  id: string;
  name: string;
  nameHindi: string;
  namePunjabi: string;
  subjects: Subject[];
  extraSubjects?: Subject[];
}

export interface ClassLevel {
  id: string;
  name: string;
  streams?: Stream[];
  subjects?: Subject[];
}

// Common subjects
const commonSubjects = {
  english: { id: 'english', name: 'English', nameHindi: 'अंग्रेजी', namePunjabi: 'ਅੰਗਰੇਜ਼ੀ' },
  mathematics: { id: 'mathematics', name: 'Mathematics', nameHindi: 'गणित', namePunjabi: 'ਗਣਿਤ' },
  science: { id: 'science', name: 'Science', nameHindi: 'विज्ञान', namePunjabi: 'ਵਿਗਿਆਨ' },
  socialScience: { id: 'socialScience', name: 'Social Science', nameHindi: 'सामाजिक विज्ञान', namePunjabi: 'ਸਮਾਜਿਕ ਵਿਗਿਆਨ' },
  hindi: { id: 'hindi', name: 'Hindi', nameHindi: 'हिंदी', namePunjabi: 'ਹਿੰਦੀ' },
  punjabi: { id: 'punjabi', name: 'Punjabi', nameHindi: 'पंजाबी', namePunjabi: 'ਪੰਜਾਬੀ' },
  physics: { id: 'physics', name: 'Physics', nameHindi: 'भौतिकी', namePunjabi: 'ਭੌਤਿਕ ਵਿਗਿਆਨ' },
  chemistry: { id: 'chemistry', name: 'Chemistry', nameHindi: 'रसायन विज्ञान', namePunjabi: 'ਰਸਾਇਣ ਵਿਗਿਆਨ' },
  biology: { id: 'biology', name: 'Biology', nameHindi: 'जीव विज्ञान', namePunjabi: 'ਜੀਵ ਵਿਗਿਆਨ' },
  economics: { id: 'economics', name: 'Economics', nameHindi: 'अर्थशास्त्र', namePunjabi: 'ਆਰਥਿਕ ਵਿਗਿਆਨ' },
  accountancy: { id: 'accountancy', name: 'Accountancy', nameHindi: 'लेखांकन', namePunjabi: 'ਲੇਖਾ-ਜੋਖਾ' },
  businessStudies: { id: 'businessStudies', name: 'Business Studies', nameHindi: 'व्यावसायिक अध्ययन', namePunjabi: 'ਵਪਾਰਿਕ ਅਧਿਐਨ' },
  history: { id: 'history', name: 'History', nameHindi: 'इतिहास', namePunjabi: 'ਇਤਿਹਾਸ' },
  geography: { id: 'geography', name: 'Geography', nameHindi: 'भूगोल', namePunjabi: 'ਭੂਗੋਲ' },
  politicalScience: { id: 'politicalScience', name: 'Political Science', nameHindi: 'राजनीति विज्ञान', namePunjabi: 'ਰਾਜਨੀਤੀ ਸ਼ਾਸਤਰ' },
  psychology: { id: 'psychology', name: 'Psychology', nameHindi: 'मनोविज्ञान', namePunjabi: 'ਮਨੋਵਿਗਿਆਨ' },
  sociology: { id: 'sociology', name: 'Sociology', nameHindi: 'समाजशास्त्र', namePunjabi: 'ਸਮਾਜ ਸ਼ਾਸਤਰ' },
  philosophy: { id: 'philosophy', name: 'Philosophy', nameHindi: 'दर्शनशास्त्र', namePunjabi: 'ਦਰਸ਼ਨ ਸ਼ਾਸਤਰ' },
  physicalEducation: { id: 'physicalEducation', name: 'Physical Education', nameHindi: 'शारीरिक शिक्षा', namePunjabi: 'ਸਰੀਰਕ ਸਿੱਖਿਆ' },
  computer: { id: 'computer', name: 'Computer', nameHindi: 'कंप्यूटर', namePunjabi: 'ਕੰਪਿਊਟਰ' },
  generalKnowledge: { id: 'generalKnowledge', name: 'General Knowledge', nameHindi: 'सामान्य ज्ञान', namePunjabi: 'ਆਮ ਗਿਆਨ' },
  cProgramming: { id: 'cProgramming', name: 'C Programming', nameHindi: 'सी प्रोग्रामिंग', namePunjabi: 'ਸੀ ਪ੍ਰੋਗਰਾਮਿੰਗ' },
};

// Education data structure
export const educationData: ClassLevel[] = [
  // Classes 1-8 (Basic subjects)
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `class${i + 1}`,
    name: `Class ${i + 1}`,
    subjects: [
      commonSubjects.english,
      commonSubjects.mathematics,
      commonSubjects.science,
      commonSubjects.socialScience,
      commonSubjects.hindi,
    ],
  })),

  // Class 9-10 (Stream selection: Commerce and Science)
  {
    id: 'class9',
    name: 'Class 9',
    streams: [
      {
        id: 'commerce9',
        name: 'Commerce',
        nameHindi: 'वाणिज्य',
        namePunjabi: 'ਵਪਾਰ',
        subjects: [
          commonSubjects.english,
          commonSubjects.economics,
          commonSubjects.businessStudies,
          commonSubjects.accountancy,
          commonSubjects.generalKnowledge,
          commonSubjects.physicalEducation,
        ],
      },
      {
        id: 'science9',
        name: 'Science',
        nameHindi: 'विज्ञान',
        namePunjabi: 'ਵਿਗਿਆਨ',
        subjects: [
          commonSubjects.english,
          commonSubjects.physics,
          commonSubjects.chemistry,
          commonSubjects.mathematics,
          commonSubjects.biology,
          commonSubjects.generalKnowledge,
          commonSubjects.geography,
          commonSubjects.history,
          commonSubjects.computer,
          commonSubjects.physicalEducation,
        ],
      },
    ],
  },
  {
    id: 'class10',
    name: 'Class 10',
    streams: [
      {
        id: 'commerce10',
        name: 'Commerce',
        nameHindi: 'वाणिज्य',
        namePunjabi: 'ਵਪਾਰ',
        subjects: [
          commonSubjects.english,
          commonSubjects.economics,
          commonSubjects.businessStudies,
          commonSubjects.accountancy,
          commonSubjects.generalKnowledge,
          commonSubjects.physicalEducation,
        ],
      },
      {
        id: 'science10',
        name: 'Science',
        nameHindi: 'विज्ञान',
        namePunjabi: 'ਵਿਗਿਆਨ',
        subjects: [
          commonSubjects.english,
          commonSubjects.physics,
          commonSubjects.chemistry,
          commonSubjects.mathematics,
          commonSubjects.biology,
          commonSubjects.generalKnowledge,
          commonSubjects.geography,
          commonSubjects.history,
          commonSubjects.computer,
          commonSubjects.physicalEducation,
        ],
      },
    ],
  },

  // Class 11-12 (Main streams: Science, Commerce, Humanities)
  {
    id: 'class11',
    name: 'Class 11',
    streams: [
      {
        id: 'science11',
        name: 'Science',
        nameHindi: 'विज्ञान',
        namePunjabi: 'ਵਿਗਿਆਨ',
        subjects: [], // Will be set based on sub-stream selection
        extraSubjects: [commonSubjects.cProgramming, commonSubjects.physicalEducation],
      },
      {
        id: 'commerce11',
        name: 'Commerce',
        nameHindi: 'वाणिज्य',
        namePunjabi: 'ਵਪਾਰ',
        subjects: [
          commonSubjects.english,
          commonSubjects.economics,
          commonSubjects.businessStudies,
          commonSubjects.accountancy,
          commonSubjects.generalKnowledge,
          commonSubjects.physicalEducation,
        ],
      },
      {
        id: 'humanities11',
        name: 'Humanities',
        nameHindi: 'मानविकी',
        namePunjabi: 'ਮਾਨਵਿਕੀ',
        subjects: [
          commonSubjects.english,
          commonSubjects.history,
          commonSubjects.geography,
          commonSubjects.economics,
          commonSubjects.politicalScience,
          commonSubjects.psychology,
          commonSubjects.sociology,
          commonSubjects.philosophy,
        ],
        extraSubjects: [commonSubjects.physicalEducation],
      },
    ],
  },
  {
    id: 'class12',
    name: 'Class 12',
    streams: [
      {
        id: 'science12',
        name: 'Science',
        nameHindi: 'विज्ञान',
        namePunjabi: 'ਵਿਗਿਆਨ',
        subjects: [], // Will be set based on sub-stream selection
        extraSubjects: [commonSubjects.cProgramming, commonSubjects.physicalEducation],
      },
      {
        id: 'commerce12',
        name: 'Commerce',
        nameHindi: 'वाणिज्य',
        namePunjabi: 'ਵਪਾਰ',
        subjects: [
          commonSubjects.english,
          commonSubjects.economics,
          commonSubjects.businessStudies,
          commonSubjects.accountancy,
          commonSubjects.generalKnowledge,
          commonSubjects.physicalEducation,
        ],
      },
      {
        id: 'humanities12',
        name: 'Humanities',
        nameHindi: 'मानविकी',
        namePunjabi: 'ਮਾਨਵਿਕੀ',
        subjects: [
          commonSubjects.english,
          commonSubjects.history,
          commonSubjects.geography,
          commonSubjects.economics,
          commonSubjects.politicalScience,
          commonSubjects.psychology,
          commonSubjects.sociology,
          commonSubjects.philosophy,
        ],
        extraSubjects: [commonSubjects.physicalEducation],
      },
    ],
  },
];

// Science sub-streams for Class 11-12
export const scienceSubStreams = {
  pcm: {
    id: 'pcm',
    name: 'PCM (Physics, Chemistry, Mathematics)',
    nameHindi: 'PCM (भौतिकी, रसायन, गणित)',
    namePunjabi: 'PCM (ਭੌਤਿਕ ਵਿਗਿਆਨ, ਰਸਾਇਣ, ਗਣਿਤ)',
    subjects: [commonSubjects.physics, commonSubjects.chemistry, commonSubjects.mathematics, commonSubjects.english],
  },
  pcb: {
    id: 'pcb',
    name: 'PCB (Physics, Chemistry, Biology)',
    nameHindi: 'PCB (भौतिकी, रसायन, जीव विज्ञान)',
    namePunjabi: 'PCB (ਭੌਤਿਕ ਵਿਗਿਆਨ, ਰਸਾਇਣ, ਜੀਵ ਵਿਗਿਆਨ)',
    subjects: [commonSubjects.physics, commonSubjects.chemistry, commonSubjects.biology, commonSubjects.english],
  },
  pcmb: {
    id: 'pcmb',
    name: 'PCMB (Physics, Chemistry, Mathematics, Biology)',
    nameHindi: 'PCMB (भौतिकी, रसायन, गणित, जीव विज्ञान)',
    namePunjabi: 'PCMB (ਭੌਤਿਕ ਵਿਗਿਆਨ, ਰਸਾਇਣ, ਗਣਿਤ, ਜੀਵ ਵਿਗਿਆਨ)',
    subjects: [commonSubjects.physics, commonSubjects.chemistry, commonSubjects.mathematics, commonSubjects.biology, commonSubjects.english],
  },
};