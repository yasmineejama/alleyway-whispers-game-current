import { useState } from "react";
import { ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryChoice {
  id: string;
  text: string;
  consequence?: string;
}

interface StorySectionProps {
  title: string;
  content: string;
  image?: string;
  choices?: StoryChoice[];
  onChoice?: (choiceId: string) => void;
  onContinue?: () => void;
}

export const StorySection = ({ 
  title, 
  content, 
  image, 
  choices, 
  onChoice, 
  onContinue 
}: StorySectionProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);
    onChoice?.(choiceId);
  };

  return (
    <div className="fade-in">
      {image && (
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 shadow-[var(--shadow-mystical)]">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fantasy-dark/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="font-display font-bold text-2xl text-white mb-2">
              {title}
            </h2>
          </div>
        </div>
      )}

      <div className="otome-card p-6 mb-6">
        <div className="prose prose-pink max-w-none">
          <p className="text-foreground leading-relaxed text-base">
            {content}
          </p>
        </div>
      </div>

      {choices && choices.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4">
            Choose your response:
          </h3>
          {choices.map((choice) => (
            <Button
              key={choice.id}
              variant="choice"
              size="lg"
              className={`w-full justify-between text-left h-auto py-4 px-6 ${
                selectedChoice === choice.id ? 'border-primary bg-primary-soft' : ''
              }`}
              onClick={() => handleChoiceSelect(choice.id)}
            >
              <span className="flex-1">{choice.text}</span>
              <ChevronRight className="h-5 w-5 opacity-50" />
            </Button>
          ))}
        </div>
      )}

      {!choices && onContinue && (
        <div className="flex justify-center">
          <Button 
            variant="romantic" 
            size="lg"
            onClick={onContinue}
            className="gap-2"
          >
            <Play className="h-4 w-4" />
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};