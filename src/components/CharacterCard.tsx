import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Character {
  id: string;
  name: string;
  title: string;
  image: string;
  description: string;
  affection: number;
  isUnlocked: boolean;
}

interface CharacterCardProps {
  character: Character;
  onSelect: (characterId: string) => void;
}

export const CharacterCard = ({ character, onSelect }: CharacterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="character-card p-6 max-w-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4">
          <img 
            src={character.image} 
            alt={character.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {!character.isUnlocked && (
            <div className="absolute inset-0 bg-fantasy-dark/70 flex items-center justify-center">
              <span className="text-fantasy-dark-foreground font-medium">Locked</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-bold">
              {character.name}
            </p>
            <p>{character.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-primary fill-current" />
              <span className="text-sm font-medium text-primary">
                {character.affection}%
              </span>
            </div>
            
            {character.isUnlocked && (
              <Button 
                variant="romantic" 
                size="sm"
                onClick={() => onSelect(character.id)}
                className="gap-1"
              >
                <MessageCircle className="h-4 w-4" />
                Talk
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};