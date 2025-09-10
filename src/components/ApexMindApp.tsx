import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LanguageProvider, useLanguage } from './LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { WelcomeSection } from './WelcomeSection';
import { ClassSelection } from './ClassSelection';
import { StreamSelection } from './StreamSelection';
import { SubjectView } from './SubjectView';
import { QuizComponent } from './QuizComponent';
import { TeacherView } from './TeacherView';
import { type ClassLevel, type Stream, type Subject } from '@/data/educationData';
import { User, GraduationCap } from 'lucide-react';

type ViewMode = 'welcome' | 'roleSelect' | 'classSelect' | 'streamSelect' | 'subjects' | 'quiz' | 'teacher';
type UserRole = 'student' | 'teacher';

interface AppState {
  viewMode: ViewMode;
  userRole: UserRole | null;
  selectedClass: ClassLevel | null;
  selectedStream: Stream | null;
  selectedSubStream: any | null;
  selectedSubject: Subject | null;
}

const ApexMindAppContent: React.FC = () => {
  const { t } = useLanguage();
  const [appState, setAppState] = useState<AppState>({
    viewMode: 'welcome',
    userRole: null,
    selectedClass: null,
    selectedStream: null,
    selectedSubStream: null,
    selectedSubject: null,
  });

  const resetToWelcome = () => {
    setAppState({
      viewMode: 'welcome',
      userRole: null,
      selectedClass: null,
      selectedStream: null,
      selectedSubStream: null,
      selectedSubject: null,
    });
  };

  const handleGetStarted = () => {
    setAppState(prev => ({ ...prev, viewMode: 'roleSelect' }));
  };

  const handleRoleSelect = (role: UserRole) => {
    if (role === 'teacher') {
      setAppState(prev => ({ ...prev, userRole: role, viewMode: 'teacher' }));
    } else {
      setAppState(prev => ({ ...prev, userRole: role, viewMode: 'classSelect' }));
    }
  };

  const handleClassSelect = (classLevel: ClassLevel) => {
    if (classLevel.streams && classLevel.streams.length > 0) {
      setAppState(prev => ({ 
        ...prev, 
        selectedClass: classLevel, 
        viewMode: 'streamSelect' 
      }));
    } else {
      setAppState(prev => ({ 
        ...prev, 
        selectedClass: classLevel,
        selectedStream: { 
          id: 'default', 
          name: 'Default', 
          nameHindi: 'मुख्य', 
          namePunjabi: 'ਮੁੱਖ',
          subjects: classLevel.subjects || [] 
        },
        viewMode: 'subjects' 
      }));
    }
  };

  const handleStreamSelect = (stream: Stream, subStream?: any) => {
    const finalSubjects = subStream ? subStream.subjects : stream.subjects;
    const finalStream = { 
      ...stream, 
      subjects: finalSubjects 
    };
    
    setAppState(prev => ({ 
      ...prev, 
      selectedStream: finalStream, 
      selectedSubStream: subStream,
      viewMode: 'subjects' 
    }));
  };

  const handleTakeQuiz = (subject: Subject) => {
    setAppState(prev => ({ ...prev, selectedSubject: subject, viewMode: 'quiz' }));
  };

  const getClassInfo = () => {
    if (!appState.selectedClass) return '';
    
    let info = appState.selectedClass.name;
    if (appState.selectedStream && appState.selectedStream.name !== 'Default') {
      info += ` - ${appState.selectedStream.name}`;
    }
    if (appState.selectedSubStream) {
      info += ` (${appState.selectedSubStream.name})`;
    }
    return info;
  };

  // Header component
  const Header = () => (
    <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-3 cursor-pointer" 
          onClick={resetToWelcome}
        >
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ApexMind
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          {appState.userRole && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetToWelcome}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </header>
  );

  // Role selection component
  const RoleSelection = () => (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8">
          Choose Your Role
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Select how you want to use ApexMind
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            className="p-8 bg-card border-border rounded-xl cursor-pointer hover:shadow-primary transition-all duration-300 hover:scale-105 group"
            onClick={() => handleRoleSelect('student')}
          >
            <User className="h-16 w-16 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              {t('studentView')}
            </h2>
            <p className="text-muted-foreground">
              Access learning materials, take quizzes, and track your progress
            </p>
          </div>
          
          <div 
            className="p-8 bg-card border-border rounded-xl cursor-pointer hover:shadow-secondary transition-all duration-300 hover:scale-105 group"
            onClick={() => handleRoleSelect('teacher')}
          >
            <GraduationCap className="h-16 w-16 mx-auto mb-4 text-secondary group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              {t('teacherView')}
            </h2>
            <p className="text-muted-foreground">
              Monitor student progress and view performance analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {appState.viewMode !== 'welcome' && <Header />}
      
      {appState.viewMode === 'welcome' && (
        <WelcomeSection onGetStarted={handleGetStarted} />
      )}
      
      {appState.viewMode === 'roleSelect' && <RoleSelection />}
      
      {appState.viewMode === 'classSelect' && (
        <ClassSelection onSelectClass={handleClassSelect} />
      )}
      
      {appState.viewMode === 'streamSelect' && appState.selectedClass && (
        <StreamSelection 
          classLevel={appState.selectedClass}
          onSelectStream={handleStreamSelect}
          onBack={() => setAppState(prev => ({ ...prev, viewMode: 'classSelect' }))}
        />
      )}
      
      {appState.viewMode === 'subjects' && appState.selectedStream && (
        <SubjectView 
          subjects={appState.selectedStream.subjects || []}
          extraSubjects={appState.selectedStream.extraSubjects}
          classInfo={getClassInfo()}
          onBack={() => setAppState(prev => ({ 
            ...prev, 
            viewMode: appState.selectedClass?.streams ? 'streamSelect' : 'classSelect' 
          }))}
          onTakeQuiz={handleTakeQuiz}
        />
      )}
      
      {appState.viewMode === 'quiz' && appState.selectedSubject && (
        <QuizComponent 
          subject={appState.selectedSubject}
          onBack={() => setAppState(prev => ({ ...prev, viewMode: 'subjects' }))}
        />
      )}
      
      {appState.viewMode === 'teacher' && (
        <TeacherView 
          onBack={() => setAppState(prev => ({ ...prev, viewMode: 'roleSelect' }))}
        />
      )}
    </div>
  );
};

export const ApexMindApp: React.FC = () => {
  return (
    <LanguageProvider>
      <ApexMindAppContent />
    </LanguageProvider>
  );
};