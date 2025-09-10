import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "./LanguageContext";
import { type Subject } from "@/data/educationData";
import { ArrowLeft, Check, X, Award, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizComponentProps {
  subject: Subject;
  onBack: () => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ subject, onBack }) => {
  const { t, language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Mock quiz questions (in a real app, these would come from a database)
  const generateQuestions = (subject: Subject): Question[] => {
    const baseQuestions: Record<string, Question[]> = {
      mathematics: [
        {
          id: '1',
          question: 'What is 15 + 27?',
          options: ['40', '42', '44', '46'],
          correctAnswer: 1,
          explanation: '15 + 27 = 42'
        },
        {
          id: '2',
          question: 'What is the square root of 64?',
          options: ['6', '7', '8', '9'],
          correctAnswer: 2,
          explanation: '8 × 8 = 64, so √64 = 8'
        },
        {
          id: '3',
          question: 'What is 12 × 8?',
          options: ['94', '96', '98', '100'],
          correctAnswer: 1,
          explanation: '12 × 8 = 96'
        },
        {
          id: '4',
          question: 'What is 144 ÷ 12?',
          options: ['10', '11', '12', '13'],
          correctAnswer: 2,
          explanation: '144 ÷ 12 = 12'
        },
        {
          id: '5',
          question: 'What is the value of π (pi) approximately?',
          options: ['3.14', '3.41', '4.13', '1.34'],
          correctAnswer: 0,
          explanation: 'π ≈ 3.14159...'
        }
      ],
      physics: [
        {
          id: '1',
          question: 'What is the speed of light in vacuum?',
          options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10⁷ m/s', '3 × 10⁹ m/s'],
          correctAnswer: 0,
          explanation: 'Speed of light in vacuum is approximately 3 × 10⁸ m/s'
        },
        {
          id: '2',
          question: 'What is the unit of force?',
          options: ['Joule', 'Newton', 'Watt', 'Pascal'],
          correctAnswer: 1,
          explanation: 'Newton (N) is the SI unit of force'
        },
        {
          id: '3',
          question: 'What is the acceleration due to gravity on Earth?',
          options: ['9.8 m/s²', '10.8 m/s²', '8.9 m/s²', '11.2 m/s²'],
          correctAnswer: 0,
          explanation: 'Standard acceleration due to gravity is 9.8 m/s²'
        },
        {
          id: '4',
          question: 'Which law states "For every action, there is an equal and opposite reaction"?',
          options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'],
          correctAnswer: 2,
          explanation: 'This is Newton\'s Third Law of Motion'
        },
        {
          id: '5',
          question: 'What is the formula for kinetic energy?',
          options: ['mgh', '½mv²', 'mv', 'F = ma'],
          correctAnswer: 1,
          explanation: 'Kinetic energy = ½mv² where m is mass and v is velocity'
        }
      ]
    };

    // Return subject-specific questions or default math questions
    return baseQuestions[subject.id] || baseQuestions.mathematics;
  };

  const [questions] = useState<Question[]>(generateQuestions(subject));

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and show results
      const correctAnswers = selectedAnswers.filter((answer, index) => 
        answer === questions[index].correctAnswer
      ).length;
      setScore(correctAnswers);
      setShowResults(true);
      
      // Save quiz result to localStorage
      const quizResult = {
        subject: subject.name,
        score: correctAnswers,
        totalQuestions: questions.length,
        percentage: Math.round((correctAnswers / questions.length) * 100),
        date: new Date().toISOString()
      };
      
      const existingResults = JSON.parse(localStorage.getItem('apexmind_quiz_results') || '[]');
      existingResults.push(quizResult);
      localStorage.setItem('apexmind_quiz_results', JSON.stringify(existingResults));
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

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

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 60;

    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Award className={`h-20 w-20 mx-auto mb-4 ${passed ? 'text-success' : 'text-warning'}`} />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Quiz {passed ? 'Completed!' : 'Complete'}
            </h1>
            <p className="text-xl text-muted-foreground">
              {getSubjectName(subject)}
            </p>
          </div>

          <Card className="p-8 bg-card border-border text-center">
            <div className="mb-6">
              <div className={`text-6xl font-bold mb-4 ${passed ? 'text-success' : 'text-warning'}`}>
                {percentage}%
              </div>
              <p className="text-xl text-muted-foreground">
                {score} out of {questions.length} correct
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span>Correct Answers:</span>
                <span className="text-success font-bold">{score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Incorrect Answers:</span>
                <span className="text-destructive font-bold">{questions.length - score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Accuracy:</span>
                <span className="font-bold">{percentage}%</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={restartQuiz}
                className="bg-gradient-secondary hover:shadow-secondary text-secondary-foreground w-full"
              >
                Retake Quiz
              </Button>
              <Button 
                onClick={onBack}
                variant="outline"
                className="w-full"
              >
                Back to Subject
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Button 
          onClick={onBack} 
          variant="outline" 
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Subject
        </Button>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-foreground">
              {getSubjectName(subject)} Quiz
            </h1>
            <span className="text-muted-foreground">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 bg-card border-border">
          <h2 className="text-xl font-bold text-card-foreground mb-6">
            {question.question}
          </h2>

          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                className="w-full text-left justify-start p-4 h-auto"
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="mr-4 font-bold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button 
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-gradient-primary hover:shadow-primary text-primary-foreground"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};