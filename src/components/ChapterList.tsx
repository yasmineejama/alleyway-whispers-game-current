import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, Star, Play, Crown } from "lucide-react";
import brokenSealsBg from "@/assets/broken-seals-bg.jpg";

interface Chapter {
  id: number;
  title: string;
  description: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  isNext: boolean;
}

interface ChapterListProps {
  unlockedChapters: number[];
  completedChapters: number[];
  currentChapter: number;
  onChapterSelect: (chapterId: number) => void;
  onBack: () => void;
}

export const ChapterList = ({ 
  unlockedChapters, 
  completedChapters, 
  currentChapter, 
  onChapterSelect, 
  onBack 
}: ChapterListProps) => {
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);

  const acts = [
    {
      title: "Act I: Awakening",
      subtitle: "The seals begin to crack...",
      chapters: [
        { id: 1, title: "The Bone Demon's Warning", description: "Your first encounter with the supernatural truth" },
        { id: 2, title: "Kai's First Appearance", description: "A mysterious savior emerges from shadows" },
        { id: 3, title: "Min's Charm Shop", description: "Ancient wisdom and protective talismans" },
        { id: 4, title: "Captain Lee's Arrival", description: "Federal forces take interest in your work" },
        { id: 5, title: "Rescue at FIT", description: "Saving Jasmine from a demon at the fashion school" },
        { id: 6, title: "The First Dream", description: "Visions reveal hidden truths about the past" },
        { id: 7, title: "Building Bonds", description: "Growing closer to your mysterious allies" }
      ]
    },
    {
      title: "Act II: Revelation", 
      subtitle: "The truth behind the seals unfolds...",
      chapters: [
        { id: 8, title: "The Portal Discovery", description: "Reality tears and ancient portals emerge" },
        { id: 9, title: "Snake Demon's Testimony", description: "A demon reveals her tragic human past" },
        { id: 10, title: "The Yaoguai's Rage", description: "Confronting a creature's heartbroken fury" },
        { id: 11, title: "Kai's Ancient Connection", description: "The mysterious guardian reveals his demonic nature" },
        { id: 12, title: "The Hulixian's Seduction", description: "A nine-tailed fox offers dangerous knowledge" },
        { id: 13, title: "Team Fractures", description: "Truth threatens to tear your allies apart" },
        { id: 14, title: "The Ancient Massacre", description: "Discovering the genocide behind demon creation" },
        { id: 15, title: "Captain Lee's Choice", description: "A soldier faces the weight of truth" },
        { id: 16, title: "Kai's Memories", description: "Witnessing the tragic past of the demon prince" },
        { id: 17, title: "The Dying Realm", description: "Seeing the crumbling demon dimension" }
      ]
    },
    {
      title: "Act III: Resolution",
      subtitle: "Choose the fate of two worlds...", 
      chapters: [
        { id: 18, title: "The Summons", description: "Celestial beings demand your obedience" },
        { id: 19, title: "Heavenly Court", description: "Standing trial before the Jade Emperor" },
        { id: 20, title: "The Rescue", description: "Your allies storm heaven itself" },
        { id: 21, title: "The Truth Weapon", description: "Broadcasting the evidence of divine genocide" },
        { id: 22, title: "New World Order", description: "Rebuilding a world without oppression" },
        { id: 23, title: "Broken Seals, Mended Hearts", description: "A peaceful future for all beings" }
      ]
    }
  ];

  const getChapterData = (chapterId: number): Chapter => {
    const baseChapter = acts.flatMap(act => act.chapters).find(c => c.id === chapterId);
    const nextUnlockedChapter = Math.max(...unlockedChapters) + 1;
    
    return {
      id: chapterId,
      title: baseChapter?.title || "",
      description: baseChapter?.description || "",
      isUnlocked: unlockedChapters.includes(chapterId),
      isCompleted: completedChapters.includes(chapterId),
      isNext: chapterId === nextUnlockedChapter && chapterId <= 23
    };
  };

  const getActProgress = (actChapters: { id: number }[]) => {
    const completed = actChapters.filter(c => completedChapters.includes(c.id)).length;
    return (completed / actChapters.length) * 100;
  };

  const ChapterCard = ({ chapter }: { chapter: Chapter }) => (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer group ${
        chapter.isUnlocked 
          ? 'hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1' 
          : 'opacity-60 cursor-not-allowed'
      } ${chapter.isNext ? 'ring-2 ring-primary ring-opacity-50' : ''}`}
      onMouseEnter={() => setHoveredChapter(chapter.id)}
      onMouseLeave={() => setHoveredChapter(null)}
      onClick={() => chapter.isUnlocked && onChapterSelect(chapter.id)}
    >
      <div className="p-4 relative">
        {/* Status Icons */}
        <div className="absolute top-2 right-2 flex gap-1">
          {chapter.isCompleted && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
          {chapter.isNext && <Crown className="w-4 h-4 text-primary animate-pulse" />}
          {!chapter.isUnlocked && <Lock className="w-4 h-4 text-muted-foreground" />}
        </div>

        {/* Chapter Number */}
        <div className="text-xs font-medium text-muted-foreground mb-2">
          Chapter {chapter.id}
        </div>

        {/* Chapter Title */}
        <h3 className={`font-semibold text-sm mb-2 leading-tight ${
          chapter.isUnlocked ? 'text-foreground' : 'text-muted-foreground'
        }`}>
          {chapter.title}
        </h3>

        {/* Chapter Description */}
        <p className={`text-xs leading-relaxed ${
          chapter.isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'
        }`}>
          {chapter.description}
        </p>

        {/* Play Button for unlocked chapters */}
        {chapter.isUnlocked && (
          <Button 
            size="sm" 
            className={`mt-3 w-full transition-all duration-200 ${
              chapter.isNext ? 'bg-primary text-primary-foreground' : ''
            }`}
            variant={chapter.isNext ? "default" : "secondary"}
          >
            <Play className="w-3 h-3 mr-1" />
            {chapter.isCompleted ? 'Replay' : chapter.isNext ? 'Continue' : 'Play'}
          </Button>
        )}

        {/* Locked tooltip */}
        {!chapter.isUnlocked && hoveredChapter === chapter.id && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background border rounded text-xs whitespace-nowrap shadow-lg z-10">
            Complete previous chapter to unlock
          </div>
        )}

        {/* Hover overlay */}
        {chapter.isUnlocked && hoveredChapter === chapter.id && (
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        )}
      </div>
    </Card>
  );

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${brokenSealsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
            Broken Seals
          </h1>
          <p className="text-muted-foreground text-lg">Choose your chapter to continue the story</p>
        </div>

        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-background/80"
        >
          ← Back to Character Selection
        </Button>

        {/* Acts */}
        <div className="space-y-12">
          {acts.map((act, actIndex) => (
            <div key={actIndex} className="space-y-6">
              {/* Act Header */}
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{act.title}</h2>
                <p className="text-muted-foreground italic">{act.subtitle}</p>
                
                {/* Progress Bar */}
                <div className="max-w-md mx-auto space-y-2">
                  <Progress value={getActProgress(act.chapters)} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {act.chapters.filter(c => completedChapters.includes(c.id)).length} of {act.chapters.length} chapters completed
                  </p>
                </div>
              </div>

              {/* Chapters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {act.chapters.map(chapter => (
                  <ChapterCard 
                    key={chapter.id} 
                    chapter={getChapterData(chapter.id)} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 text-center space-y-2">
          <Badge variant="secondary" className="px-4 py-2">
            {completedChapters.length} / 23 Chapters Completed
          </Badge>
          {currentChapter <= 23 && (
            <p className="text-sm text-muted-foreground">
              Next: Chapter {Math.max(...unlockedChapters) + 1 <= 23 ? Math.max(...unlockedChapters) + 1 : 23}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};