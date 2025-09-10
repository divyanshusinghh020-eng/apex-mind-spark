import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "./LanguageContext";
import { Users, GraduationCap, TrendingUp, ArrowLeft, User } from "lucide-react";
import { useState, useEffect } from "react";

interface Student {
  id: string;
  name: string;
  class: string;
  status: 'completed' | 'inProgress' | 'notStarted';
  progress: number;
  quizResults: Array<{
    subject: string;
    score: number;
    percentage: number;
    date: string;
  }>;
}

interface TeacherViewProps {
  onBack: () => void;
}

export const TeacherView: React.FC<TeacherViewProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Load mock student data
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Arjun Singh',
        class: 'Class 12 - Science (PCM)',
        status: 'inProgress',
        progress: 75,
        quizResults: [
          { subject: 'Physics', score: 8, percentage: 80, date: '2024-01-15' },
          { subject: 'Chemistry', score: 7, percentage: 70, date: '2024-01-14' },
          { subject: 'Mathematics', score: 9, percentage: 90, date: '2024-01-13' },
        ]
      },
      {
        id: '2',
        name: 'Priya Sharma',
        class: 'Class 11 - Commerce',
        status: 'completed',
        progress: 100,
        quizResults: [
          { subject: 'Economics', score: 9, percentage: 90, date: '2024-01-15' },
          { subject: 'Business Studies', score: 8, percentage: 80, date: '2024-01-14' },
          { subject: 'Accountancy', score: 7, percentage: 70, date: '2024-01-13' },
        ]
      },
      {
        id: '3',
        name: 'Rajveer Kaur',
        class: 'Class 10 - Science',
        status: 'inProgress',
        progress: 45,
        quizResults: [
          { subject: 'Physics', score: 6, percentage: 60, date: '2024-01-15' },
          { subject: 'Chemistry', score: 7, percentage: 70, date: '2024-01-14' },
        ]
      },
      {
        id: '4',
        name: 'Manpreet Singh',
        class: 'Class 9 - Commerce',
        status: 'notStarted',
        progress: 0,
        quizResults: []
      },
      {
        id: '5',
        name: 'Simran Kaur',
        class: 'Class 12 - Humanities',
        status: 'inProgress',
        progress: 85,
        quizResults: [
          { subject: 'History', score: 9, percentage: 90, date: '2024-01-15' },
          { subject: 'Geography', score: 8, percentage: 80, date: '2024-01-14' },
          { subject: 'Political Science', score: 7, percentage: 70, date: '2024-01-13' },
        ]
      },
      {
        id: '6',
        name: 'Harpreet Singh',
        class: 'Class 11 - Science (PCB)',
        status: 'inProgress',
        progress: 60,
        quizResults: [
          { subject: 'Biology', score: 8, percentage: 80, date: '2024-01-15' },
          { subject: 'Chemistry', score: 6, percentage: 60, date: '2024-01-14' },
        ]
      }
    ];
    
    setStudents(mockStudents);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'inProgress':
        return 'warning';
      case 'notStarted':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('completed');
      case 'inProgress':
        return t('inProgress');
      case 'notStarted':
        return 'Not Started';
      default:
        return status;
    }
  };

  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => setSelectedStudent(null)} 
            variant="outline" 
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Button>

          <div className="text-center mb-12">
            <User className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              {selectedStudent.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {selectedStudent.class}
            </p>
            <Badge className={`bg-${getStatusColor(selectedStudent.status)} text-${getStatusColor(selectedStudent.status)}-foreground`}>
              {getStatusText(selectedStudent.status)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Overall Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Course Completion</span>
                    <span>{selectedStudent.progress}%</span>
                  </div>
                  <Progress value={selectedStudent.progress} className="h-3" />
                </div>
                <div className="text-center pt-4">
                  <div className="text-2xl font-bold text-primary">{selectedStudent.progress}%</div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-success" />
                Quiz Summary
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">
                    {selectedStudent.quizResults.length > 0 
                      ? Math.round(selectedStudent.quizResults.reduce((acc, result) => acc + result.percentage, 0) / selectedStudent.quizResults.length)
                      : 0
                    }%
                  </div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{selectedStudent.quizResults.length}</div>
                  <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-bold text-card-foreground mb-6">Recent Quiz Results</h3>
            {selectedStudent.quizResults.length > 0 ? (
              <div className="space-y-4">
                {selectedStudent.quizResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <h4 className="font-semibold text-foreground">{result.subject}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {result.score}/10
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No quiz results available yet.
              </p>
            )}
          </Card>
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
          Back to Main
        </Button>

        <div className="text-center mb-12">
          <Users className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Teacher Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Monitor student progress and performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-card border-border text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
            <div className="text-3xl font-bold text-foreground mb-2">{students.length}</div>
            <p className="text-muted-foreground">Total Students</p>
          </Card>
          
          <Card className="p-6 bg-card border-border text-center">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-success" />
            <div className="text-3xl font-bold text-foreground mb-2">
              {students.filter(s => s.status === 'completed').length}
            </div>
            <p className="text-muted-foreground">Completed Courses</p>
          </Card>
          
          <Card className="p-6 bg-card border-border text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-warning" />
            <div className="text-3xl font-bold text-foreground mb-2">
              {Math.round(students.reduce((acc, student) => acc + student.progress, 0) / students.length)}%
            </div>
            <p className="text-muted-foreground">Average Progress</p>
          </Card>
        </div>

        <Card className="p-6 bg-card border-border">
          <h2 className="text-2xl font-bold text-card-foreground mb-6">Student List</h2>
          <div className="space-y-4">
            {students.map((student) => (
              <div 
                key={student.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => setSelectedStudent(student)}
              >
                <div className="flex items-center space-x-4">
                  <User className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold text-foreground">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.class}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right mr-4">
                    <div className="text-sm font-medium text-foreground">
                      {student.progress}% Complete
                    </div>
                    <Progress value={student.progress} className="w-24 h-2" />
                  </div>
                  <Badge className={`bg-${getStatusColor(student.status)} text-${getStatusColor(student.status)}-foreground`}>
                    {getStatusText(student.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};