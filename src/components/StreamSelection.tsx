import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "./LanguageContext";
import { type ClassLevel, type Stream, scienceSubStreams } from "@/data/educationData";
import { Atom, Calculator, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

interface StreamSelectionProps {
  classLevel: ClassLevel;
  onSelectStream: (stream: Stream, subStream?: any) => void;
  onBack: () => void;
}

export const StreamSelection: React.FC<StreamSelectionProps> = ({ 
  classLevel, 
  onSelectStream, 
  onBack 
}) => {
  const { t, language } = useLanguage();
  const [selectedScienceSubStream, setSelectedScienceSubStream] = useState<string | null>(null);

  const getStreamIcon = (streamId: string) => {
    switch (streamId) {
      case 'science9':
      case 'science10':
      case 'science11':
      case 'science12':
        return Atom;
      case 'commerce9':
      case 'commerce10':
      case 'commerce11':
      case 'commerce12':
        return TrendingUp;
      case 'humanities11':
      case 'humanities12':
        return Users;
      default:
        return Calculator;
    }
  };

  const getStreamName = (stream: Stream) => {
    switch (language) {
      case 'hindi':
        return stream.nameHindi;
      case 'punjabi':
        return stream.namePunjabi;
      default:
        return stream.name;
    }
  };

  const getSubStreamName = (subStream: any) => {
    switch (language) {
      case 'hindi':
        return subStream.nameHindi;
      case 'punjabi':
        return subStream.namePunjabi;
      default:
        return subStream.name;
    }
  };

  const handleStreamSelect = (stream: Stream) => {
    // For Class 11-12 Science, show sub-stream selection
    if ((classLevel.id === 'class11' || classLevel.id === 'class12') && 
        (stream.id === 'science11' || stream.id === 'science12')) {
      setSelectedScienceSubStream(stream.id);
    } else {
      onSelectStream(stream);
    }
  };

  const handleScienceSubStreamSelect = (subStreamKey: string) => {
    const stream = classLevel.streams?.find(s => s.id === selectedScienceSubStream);
    const subStream = scienceSubStreams[subStreamKey as keyof typeof scienceSubStreams];
    if (stream && subStream) {
      onSelectStream(stream, subStream);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={onBack} 
          variant="outline" 
          className="mb-8"
        >
          ← Back to Classes
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-4">
            {classLevel.name} - {t('selectStream')}
          </h1>
        </div>

        {!selectedScienceSubStream ? (
          // Main stream selection
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classLevel.streams?.map((stream, index) => {
              const Icon = getStreamIcon(stream.id);
              const colors = ['primary', 'secondary', 'accent'];
              const color = colors[index % colors.length];
              
              return (
                <Card 
                  key={stream.id}
                  className={`p-8 bg-card border-border hover:shadow-${color} transition-all duration-300 hover:scale-105 cursor-pointer group`}
                  onClick={() => handleStreamSelect(stream)}
                >
                  <div className="text-center">
                    <Icon className={`h-16 w-16 mx-auto mb-6 text-${color} group-hover:scale-110 transition-transform`} />
                    <h2 className="text-2xl font-bold text-card-foreground mb-4">
                      {getStreamName(stream)}
                    </h2>
                    <p className="text-muted-foreground">
                      {stream.subjects?.length || 0} core subjects
                      {stream.extraSubjects && ` + ${stream.extraSubjects.length} optional`}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          // Science sub-stream selection for Class 11-12
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Choose Science Sub-Stream
              </h2>
              <p className="text-muted-foreground">
                Select your preferred combination of subjects
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(scienceSubStreams).map(([key, subStream], index) => {
                const colors = ['primary', 'secondary', 'accent'];
                const color = colors[index];
                
                return (
                  <Card 
                    key={key}
                    className={`p-8 bg-card border-border hover:shadow-${color} transition-all duration-300 hover:scale-105 cursor-pointer group`}
                    onClick={() => handleScienceSubStreamSelect(key)}
                  >
                    <div className="text-center">
                      <Atom className={`h-12 w-12 mx-auto mb-4 text-${color} group-hover:scale-110 transition-transform`} />
                      <h3 className="text-xl font-bold text-card-foreground mb-4">
                        {getSubStreamName(subStream)}
                      </h3>
                      <div className="space-y-2">
                        {subStream.subjects.map((subject) => (
                          <div key={subject.id} className="text-sm text-muted-foreground">
                            • {subject.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <Button 
                onClick={() => setSelectedScienceSubStream(null)}
                variant="outline"
              >
                Back to Stream Selection
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};