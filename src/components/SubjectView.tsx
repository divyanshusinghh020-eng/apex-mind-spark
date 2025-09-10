import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "./LanguageContext";
import { type Subject } from "@/data/educationData";
import { BookOpen, HelpCircle, Award, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface SubjectViewProps {
  subjects: Subject[];
  extraSubjects?: Subject[];
  classInfo: string;
  onBack: () => void;
  onTakeQuiz: (subject: Subject) => void;
}

export const SubjectView: React.FC<SubjectViewProps> = ({ 
  subjects, 
  extraSubjects, 
  classInfo, 
  onBack, 
  onTakeQuiz 
}) => {
  const { t, language } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const getSubjectName = (subject: Subject) => {
    switch (language) {
      case 'hindi':
        return subject.nameHindi;
      case 'punjabi':
        return subject.namePunjabi;
      default:
        return subject.name;
    }
  };

  const getRandomProgress = () => Math.floor(Math.random() * 100);
  const getRandomScore = () => Math.floor(Math.random() * 100);

  const getColorForIndex = (index: number): string => {
    const colors = ['primary', 'secondary', 'accent', 'success'];
    return colors[index % colors.length];
  };

  if (selectedSubject) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => setSelectedSubject(null)} 
            variant="outline" 
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>

          <div className="text-center mb-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              {getSubjectName(selectedSubject)}
            </h1>
            <p className="text-xl text-muted-foreground">{classInfo}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Learning Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Course Completion</span>
                    <span>{getRandomProgress()}%</span>
                  </div>
                  <Progress value={getRandomProgress()} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Lessons Completed</span>
                    <span>12/20</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-success" />
                Quiz Performance
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">{getRandomScore()}%</div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => onTakeQuiz(selectedSubject)}
              className="bg-gradient-primary hover:shadow-primary text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl"
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              {t('takeQuiz')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Button 
          onClick={onBack} 
          variant="outline" 
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-4">
            {t('subjects')}
          </h1>
          <p className="text-xl text-muted-foreground">{classInfo}</p>
        </div>

        {/* Core Subjects */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Core Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => {
              const color = getColorForIndex(index);
              return (
                <Card 
                  key={subject.id}
                  className={`p-6 bg-card border-border hover:shadow-${color} transition-all duration-300 hover:scale-105 cursor-pointer group`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  <div className="text-center">
                    <BookOpen className={`h-12 w-12 mx-auto mb-4 text-${color} group-hover:scale-110 transition-transform`} />
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {getSubjectName(subject)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {getRandomProgress()}% Complete
                    </p>
                    <Progress value={getRandomProgress()} className="h-2 mb-4" />
                    <Button 
                      size="sm" 
                      className={`bg-${color} hover:bg-${color}/80 text-${color}-foreground`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTakeQuiz(subject);
                      }}
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Quick Quiz
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Extra Subjects */}
        {extraSubjects && extraSubjects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">{t('extraSubjects')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {extraSubjects.map((subject, index) => {
                const color = getColorForIndex(index + subjects.length);
                return (
                  <Card 
                    key={subject.id}
                    className={`p-6 bg-card border-border hover:shadow-${color} transition-all duration-300 hover:scale-105 cursor-pointer group`}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    <div className="text-center">
                      <BookOpen className={`h-10 w-10 mx-auto mb-4 text-${color} group-hover:scale-110 transition-transform`} />
                      <h3 className="text-lg font-bold text-card-foreground mb-2">
                        {getSubjectName(subject)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">Optional Subject</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTakeQuiz(subject);
                        }}
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Take Quiz
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};