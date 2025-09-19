import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import brokenSealsBg from "@/assets/broken-seals-bg.jpg";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Awakening ancient powers...");

  const loadingMessages = [
    "Awakening ancient powers...",
    "Unsealing forgotten memories...",
    "Connecting to the qi lines...",
    "Summoning protective charms...",
    "Opening the realm of Broken Seals..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update loading text based on progress
        const messageIndex = Math.floor(newProgress / 20);
        if (messageIndex < loadingMessages.length) {
          setLoadingText(loadingMessages[messageIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-gradient-radial from-fantasy-dark via-background to-card flex flex-col items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${brokenSealsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center space-y-8 max-w-md px-6">
        {/* Game Title */}
        <div className="space-y-4">
          <h1 className="font-display text-6xl font-bold text-gradient-romantic mb-2 animate-pulse">
            破印
          </h1>
          <h2 className="font-display text-4xl font-bold text-gradient-mystical">
            Broken Seals
          </h2>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-primary font-medium animate-pulse">
            {loadingText}
          </p>
        </div>

        {/* Mystical Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-60"></div>
          <div className="floating absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full opacity-40" style={{animationDelay: '1s'}}></div>
          <div className="floating absolute bottom-1/3 left-1/3 w-3 h-3 bg-secondary rounded-full opacity-30" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
    </div>
  );
};