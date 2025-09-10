import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "./LanguageContext";
import { educationData, type ClassLevel } from "@/data/educationData";
import { GraduationCap, BookOpen } from "lucide-react";

interface ClassSelectionProps {
  onSelectClass: (classLevel: ClassLevel) => void;
}

export const ClassSelection: React.FC<ClassSelectionProps> = ({ onSelectClass }) => {
  const { t } = useLanguage();

  const getColorForClass = (index: number): string => {
    const colors = ['primary', 'secondary', 'accent', 'success'];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            {t('selectClass')}
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your class to access tailored educational content
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {educationData.map((classLevel, index) => {
            const color = getColorForClass(index);
            return (
              <Card 
                key={classLevel.id} 
                className={`p-6 bg-card border-border hover:shadow-${color} transition-all duration-300 hover:scale-105 cursor-pointer group`}
                onClick={() => onSelectClass(classLevel)}
              >
                <div className="text-center">
                  <BookOpen className={`h-12 w-12 mx-auto mb-4 text-${color} group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    {classLevel.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {classLevel.streams ? 
                      `${classLevel.streams.length} Streams Available` : 
                      `${classLevel.subjects?.length || 0} Subjects`
                    }
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};