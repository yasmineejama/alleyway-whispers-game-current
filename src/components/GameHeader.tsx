import { Heart, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  title: string;
  chapter?: string;
}

export const GameHeader = ({ title, chapter }: GameHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display font-semibold text-lg text-gradient-romantic">
              {title}
            </h1>
            {chapter && (
              <p className="text-sm text-muted-foreground">{chapter}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-primary-soft px-3 py-1 rounded-full">
            <Heart className="h-4 w-4 text-primary fill-current" />
            <span className="text-sm font-medium text-primary">100</span>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};