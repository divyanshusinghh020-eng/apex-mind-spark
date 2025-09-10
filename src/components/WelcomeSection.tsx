import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "./LanguageContext";
import { BookOpen, Users, Zap, Globe } from "lucide-react";

interface WelcomeSectionProps {
  onGetStarted: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onGetStarted }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      
      {/* Main welcome content */}
      <div className="max-w-4xl mx-auto text-center z-10">
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 animate-pulse">
            {t('welcome')}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {t('subtitle')}
          </p>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: BookOpen, title: "Quality Content", color: "primary" },
            { icon: Users, title: "For Everyone", color: "secondary" },
            { icon: Zap, title: "Offline First", color: "accent" },
            { icon: Globe, title: "Multi-Language", color: "success" }
          ].map((feature, index) => (
            <Card key={index} className={`p-6 bg-card border-border hover:shadow-${feature.color} transition-all duration-300 hover:scale-105`}>
              <feature.icon className={`h-8 w-8 mx-auto mb-4 text-${feature.color}`} />
              <h3 className="font-semibold text-card-foreground">{feature.title}</h3>
            </Card>
          ))}
        </div>

        {/* How to use roadmap */}
        <Card className="bg-card/50 backdrop-blur-sm border-border p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t('howToUse')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", text: t('step1'), color: "primary" },
              { step: "2", text: t('step2'), color: "secondary" },
              { step: "3", text: t('step3'), color: "accent" },
              { step: "4", text: t('step4'), color: "success" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 rounded-full bg-${item.color} text-${item.color}-foreground flex items-center justify-center font-bold text-xl mx-auto mb-4`}>
                  {item.step}
                </div>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Get started button */}
        <Button 
          onClick={onGetStarted}
          className="bg-gradient-primary hover:shadow-primary text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
        >
          {t('getStarted')}
        </Button>
      </div>
    </div>
  );
};