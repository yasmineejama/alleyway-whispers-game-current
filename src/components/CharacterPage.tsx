import { Heart, Lock, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Character {
  id: string;
  name: string;
  title: string;
  image: string;
  description: string;
  affection: number;
  isUnlocked: boolean;
  relationship?: string;
  age?: string;
  origin?: string;
  personality?: string;
}

interface CharacterPageProps {
  characters: Character[];
  onCharacterSelect: (characterId: string) => void;
}

export const CharacterPage = ({ characters, onCharacterSelect }: CharacterPageProps) => {
  const getRelationshipLevel = (affection: number) => {
    if (affection >= 80) return { level: "Devoted", color: "text-red-400" };
    if (affection >= 60) return { level: "In Love", color: "text-pink-400" };
    if (affection >= 40) return { level: "Close", color: "text-primary" };
    if (affection >= 20) return { level: "Friendly", color: "text-blue-400" };
    return { level: "Acquainted", color: "text-muted-foreground" };
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-display text-3xl font-bold text-gradient-romantic">
            Character Bonds
          </h1>
          <p className="text-muted-foreground">
            Track your relationships and unlock deeper connections
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => {
            const relationship = getRelationshipLevel(character.affection);
            
            return (
              <Card key={character.id} className="otome-card group">
                <CardContent className="p-6 space-y-4">
                  <div className="relative">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-gradient-mystical">
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {!character.isUnlocked && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <Lock className="h-8 w-8 text-white/60" />
                        </div>
                      )}
                    </div>

                    {/* Affection Level Indicator */}
                    <div className="absolute -top-2 -right-2 bg-primary rounded-full p-2">
                      <Heart className="h-4 w-4 text-white fill-current" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-center">
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {character.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {character.title}
                      </p>
                    </div>

                    {/* Affection Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Affection</span>
                        <span className={`text-xs font-medium ${relationship.color}`}>
                          {relationship.level}
                        </span>
                      </div>
                      <Progress value={character.affection} className="h-2" />
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">
                          {character.affection}%
                        </span>
                      </div>
                    </div>

                    {/* Character Details */}
                    <div className="space-y-2 text-sm">
                      {character.age && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Age:</span>
                          <span>{character.age}</span>
                        </div>
                      )}
                      {character.origin && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Origin:</span>
                          <span>{character.origin}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {character.description}
                    </p>

                    {character.isUnlocked && (
                      <Button 
                        variant="romantic" 
                        size="sm"
                        onClick={() => onCharacterSelect(character.id)}
                        className="w-full"
                      >
                        <Star className="h-4 w-4" />
                        View Memories
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};