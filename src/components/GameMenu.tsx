import { Book, Users, Settings, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const GameMenu = ({ activeTab, onTabChange }: GameMenuProps) => {
  const menuItems = [
    { id: 'story', label: 'Story', icon: Book },
    { id: 'characters', label: 'Bonds', icon: Users },
    { id: 'bestiary', label: 'Bestiary', icon: BookOpen },
    { id: 'memories', label: 'Memories', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-around">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`flex-col gap-1 h-auto py-2 px-4 transition-[var(--transition-magical)] ${
                  isActive 
                    ? 'text-primary bg-primary-soft' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};