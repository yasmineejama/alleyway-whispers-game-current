import { Eye, Skull, Zap, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import demon images
import boneDemonImage from "@/assets/bone-demon.jpg";
import snakeDemonImage from "@/assets/snake-demon.jpg";
import yaoguaiImage from "@/assets/yaoguai.jpg";
import hulixianImage from "@/assets/hulixian.jpg";
import yanuoWangImage from "@/assets/yanluo-wang.jpg";

interface Demon {
  id: string;
  name: string;
  chineseName: string;
  image: string;
  description: string;
  dangerLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  abilities: string[];
  weakness: string;
  encountered: boolean;
  origin: string;
}

interface DemonBestiaryProps {
  encounteredDemons?: string[];
}

export const DemonBestiary = ({ encounteredDemons = [] }: DemonBestiaryProps) => {
  const demons: Demon[] = [
    {
      id: 'bone-demon',
      name: 'Bone Demon',
      chineseName: '白骨精 (Báigǔjīng)',
      image: boneDemonImage,
      description: 'A bone-white monster that was once human, transformed by divine chains. Retains fragments of its former self, making it both dangerous and tragic.',
      dangerLevel: 'Medium',
      abilities: ['Bone Manipulation', 'Fear Inducement', 'Memory Fragments'],
      weakness: 'Salt and purified water',
      encountered: encounteredDemons.includes('bone-demon'),
      origin: 'Former human enslaved by divine chains'
    },
    {
      id: 'snake-demon',
      name: 'Snake Demon',
      chineseName: '蛇妖 (Shéyāo)',
      image: snakeDemonImage,
      description: 'Appears meek and harmless in human form, but when enraged, reveals deadly serpentine features. Often misunderstood due to gentle nature.',
      dangerLevel: 'High',
      abilities: ['Shapeshifting', 'Venomous Strike', 'Hypnotic Gaze'],
      weakness: 'Mongoose essence and iron weapons',
      encountered: encounteredDemons.includes('snake-demon'),
      origin: 'Ancient serpent spirit bound by celestial decree'
    },
    {
      id: 'yaoguai',
      name: 'Yaoguai',
      chineseName: '妖怪 (Yāoguài)',
      image: yaoguaiImage,
      description: 'A monstrous half-human, half-beast creature. The transformation was incomplete, leaving it trapped between two forms and filled with rage.',
      dangerLevel: 'High',
      abilities: ['Enhanced Strength', 'Bestial Rage', 'Pack Mentality'],
      weakness: 'Buddhist sutras and blessed mirrors',
      encountered: encounteredDemons.includes('yaoguai'),
      origin: 'Incomplete transformation victim'
    },
    {
      id: 'hulixian',
      name: 'Fox Demon',
      chineseName: '狐狸仙 (Húlíxiān)',
      image: hulixianImage,
      description: 'Extremely beautiful and charismatic nine-tailed fox demon. Uses charm and wit to survive, but harbors deep resentment toward those who imprisoned her kind.',
      dangerLevel: 'Extreme',
      abilities: ['Illusion Magic', 'Mind Control', 'Nine-Tail Power'],
      weakness: 'True name binding and celestial bronze',
      encountered: encounteredDemons.includes('hulixian'),
      origin: 'Ancient fox spirit, once revered as a deity'
    },
    {
      id: 'yanluo-wang',
      name: 'Demon King Yanluo Wang',
      chineseName: '閻羅王 (Yánluó Wáng)',
      image: yanuoWangImage,
      description: 'The supreme ruler of the underworld, judge of the dead. Once served as a divine judge before being cast down and imprisoned with his people.',
      dangerLevel: 'Extreme',
      abilities: ['Reality Manipulation', 'Soul Judgment', 'Dimensional Control'],
      weakness: 'Divine artifacts and pure sacrifice',
      encountered: encounteredDemons.includes('yanluo-wang'),
      origin: 'Former celestial judge, now king of the imprisoned'
    }
  ];

  const getDangerColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-500/20 text-green-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'High': return 'bg-orange-500/20 text-orange-300';
      case 'Extreme': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getDangerIcon = (level: string) => {
    switch (level) {
      case 'Low': return Eye;
      case 'Medium': return Zap;
      case 'High': return Skull;
      case 'Extreme': return Crown;
      default: return Eye;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-display text-3xl font-bold text-gradient-mystical">
            Demon Bestiary
          </h1>
          <p className="text-muted-foreground">
            Chronicles of the imprisoned souls you've encountered
          </p>
          <div className="text-sm text-primary">
            Discovered: {encounteredDemons.length} / {demons.length}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demons.map((demon) => {
            const DangerIcon = getDangerIcon(demon.dangerLevel);
            const isRevealed = demon.encountered;
            
            return (
              <Card key={demon.id} className={`otome-card ${!isRevealed ? 'opacity-50' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-display">
                      {isRevealed ? demon.name : '???'}
                    </CardTitle>
                    <Badge className={getDangerColor(demon.dangerLevel)}>
                      <DangerIcon className="h-3 w-3 mr-1" />
                      {demon.dangerLevel}
                    </Badge>
                  </div>
                  {isRevealed && (
                    <p className="text-sm text-primary font-medium">
                      {demon.chineseName}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-mystical">
                    <img 
                      src={demon.image} 
                      alt={isRevealed ? demon.name : 'Unknown entity'}
                      className={`w-full h-full object-cover ${!isRevealed ? 'blur-md grayscale' : ''}`}
                    />
                  </div>

                  {isRevealed ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {demon.description}
                      </p>

                      <div className="space-y-2">
                        <div>
                          <h4 className="text-xs font-semibold text-foreground mb-1">Abilities:</h4>
                          <div className="flex flex-wrap gap-1">
                            {demon.abilities.map((ability, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {ability}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-foreground">Weakness:</h4>
                          <p className="text-xs text-red-300">{demon.weakness}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-foreground">Origin:</h4>
                          <p className="text-xs text-muted-foreground">{demon.origin}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Encounter this entity to reveal its secrets...
                      </p>
                      <div className="h-16 bg-muted/20 rounded animate-pulse"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};