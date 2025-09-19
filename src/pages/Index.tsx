import { useState } from "react";
import { GameHeader } from "@/components/GameHeader";
import { GameMenu } from "@/components/GameMenu";
import { CharacterCard } from "@/components/CharacterCard";
import { StorySection } from "@/components/StorySection";
import { Button } from "@/components/ui/button";
import { Sparkles, Play } from "lucide-react";

// Import character images
import mainCharacterImage from "@/assets/main-character.jpg";
import captainLeeImage from "@/assets/captain-lee.jpg";
import minSupplierImage from "@/assets/min-supplier.jpg";
import kaiMysteriousImage from "@/assets/kai-mysterious.jpg";
import portalBgImage from "@/assets/portal-bg.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCharacterSelection, setShowCharacterSelection] = useState(false);
  const [selectedLoveInterest, setSelectedLoveInterest] = useState<string | null>(null);
  // Love interest characters for selection
  const loveInterests = [
    {
      id: 'captain-lee',
      name: 'Lee',
      title: 'Military Leader',
      image: captainLeeImage,
      description: 'Captain of the Supernatural Investigation Unit',
      affection: 0,
      isUnlocked: true,
    },
    {
      id: 'min-supplier',
      name: 'Min',
      title: 'The Supplier',
      image: minSupplierImage,
      description: 'Taoist practitioner who makes and sells supernatural charms, weapons, etc.',
      affection: 0,
      isUnlocked: true,
    },
    {
      id: 'kai-mysterious',
      name: 'Mysterious Guardian',
      title: 'The Mysterious Man',
      image: kaiMysteriousImage,
      description: 'A man whose origins are unknown',
      affection: 0,
      isUnlocked: true,
    },
  ];

  const [characters, setCharacters] = useState([
    {
      id: 'weapons-supplier',
      name: 'Marcus',
      title: 'Weapons Supplier',
      image: minSupplierImage,
      description: 'Your reliable supplier of enchanted weapons and charms. Easygoing and flirtatious, but his quiet devotion runs deeper than his jokes. Represents the safe, familiar choice—but warns you not to trust outsiders.',
      affection: 15,
      isUnlocked: true,
      relationship: 'A steady presence who always has your back, but his protective nature might be stifling your independence.'
    },
    {
      id: 'captain',
      name: 'Commander Hayes',
      title: 'Captain of Supernatural Investigation Unit',
      image: captainLeeImage,
      description: 'An authoritative law-and-order type from NYC investigating the worldwide spike in demon activity. Pushes you to work "by the book" which clashes with your independence, but his protection comes with structure and control.',
      affection: 10,
      isUnlocked: true,
      relationship: 'Professional tension with undeniable chemistry. His way would keep you safe but suffocate your freedom.'
    },
    {
      id: 'mysterious-man',
      name: '???',
      title: 'Mysterious Savior',
      image: kaiMysteriousImage,
      description: 'A silent, magnetic figure who appears during fights just when you need him most. Disappears before you can question him, but the undeniable chemistry and his uncanny knowledge of your situation is both thrilling and unsettling.',
      affection: 5,
      isUnlocked: true,
      relationship: 'Dangerous attraction. You sense he\'s hiding something, but can\'t help trusting him when he saves your life.'
    },
  ]);

  const storyContent = {
    1: {
      title: "ACT I: The Hunt - Opening Battle",
      content: "The narrow alley behind Macau's glittering casinos reeks of decay and something far worse. Your silver dagger gleams as you corner the baigujing—its bone-white face contorting into a grotesque smile. 'You think you understand the hunt, little slayer?' it hisses, its voice like grinding glass. 'The chains of the gods grow weak. Soon, your precious world will learn the truth.' You lunge forward, but the demon dissolves into mist, leaving behind only strange, pulsing energy residue and the echo of its cryptic words.",
      image: portalBgImage,
      choices: [
        { id: 'examine_residue', text: 'Examine the strange energy residue carefully' },
        { id: 'chase_demon', text: 'Try to track where the demon went' },
        { id: 'call_contacts', text: 'Contact your network for information about "chains of the gods"' },
      ]
    },
    2: {
      title: "The Mysterious Savior",
      content: "Just as you kneel to examine the residue, shadows move at the alley's mouth. Three more baigujing emerge, their bone faces gleaming in the neon light. Your charms are nearly depleted from the first fight. As claws reach for your throat, a figure drops from the fire escape above—silent, precise, deadly. He dispatches two demons before you can blink, his movements almost too fast to follow. When you turn to thank him, piercing dark eyes meet yours for just a moment before he melts back into the shadows. Gone. Like he was never there at all.",
      image: portalBgImage,
      choices: [
        { id: 'follow_mysterious', text: 'Try to follow the mysterious man' },
        { id: 'analyze_fighting', text: 'Analyze his fighting technique - it seemed familiar' },
        { id: 'focus_mission', text: 'Focus on the mission - you need more supplies first' },
      ]
    },
    3: {
      title: "The Weapons Supplier",
      content: "Marcus's shop smells like sage and old leather. He looks up from polishing a silver blade, that familiar easy grin spreading across his face. 'Let me guess—used up all your entrapment charms on some nasty piece of work?' His tone is light, but you catch the concern in his eyes as he takes in your torn jacket and the energy burns on your hands. 'You know I worry when you come in looking like you've been through a blender, sweetheart. Maybe it's time to consider taking on a partner?' He slides a fresh set of charms across the counter. 'These ones are stronger. But promise me you'll be careful?'",
      image: portalBgImage,
      choices: [
        { id: 'flirt_marcus', text: 'Flirt back - his concern is sweet' },
        { id: 'ask_about_chains', text: 'Ask him about "chains of the gods"' },
        { id: 'keep_professional', text: 'Keep things professional - you need supplies, not complications' },
      ]
    },
    4: {
      title: "The Captain Arrives",
      content: "Your apartment building's lobby feels different when you finally drag yourself home. A stranger in a sharp suit leans against the mailboxes, and you instinctively reach for the silver blade at your hip. Then you notice the federal badge glinting under fluorescent lights. 'Easy,' he says, raising his hands slightly. 'Commander Hayes, Supernatural Investigation Unit.' His steel-gray eyes assess you with professional interest. 'You're the demon hunter who's been active in Macau. We need to talk. Demon activity has spiked 400% worldwide in the last month, and whatever you're hunting isn't isolated. My unit is taking point on this investigation.' He straightens, all business. 'The question is: are you going to cooperate, or do I need to make this official?'",
      image: portalBgImage,
      choices: [
        { id: 'cooperate_hayes', text: 'Agree to cooperate - you need resources' },
        { id: 'resist_authority', text: 'Resist - you work alone for a reason' },
        { id: 'negotiate_terms', text: 'Negotiate - cooperation, but on your terms' },
      ]
    },
    5: {
      title: "ACT II: The Pattern - Portal Investigation",
      content: "Three weeks later, you stand before a shimmering tear in reality beneath the Brooklyn Bridge. This is the seventh portal you've documented across three continents. Each one pulses with the same strange energy you first encountered in Macau. Hayes coordinates his tactical team while Marcus unpacks modified containment charms. 'The pattern is accelerating,' Hayes reports, his voice tight with concern. 'We're seeing manifestations every 48 hours now.' Marcus frowns at his readings. 'The dimensional barriers are weakening faster than we calculated. At this rate...' He doesn't finish, but you all know what he means. The mysterious figure from your dreams warned you this would happen, but seeing it firsthand chills you to the bone.",
      image: portalBgImage,
      choices: [
        { id: 'focus_research', text: 'Focus on researching the pattern with Marcus' },
        { id: 'coordinate_hayes', text: 'Work closely with Hayes on tactical approaches' },
        { id: 'seek_mysterious', text: 'Try to contact the mysterious man from your dreams' },
      ]
    },
    6: {
      title: "Deeper Bonds",
      content: "The investigation consumes your days, but it's the quiet moments that reveal who these men really are. Marcus stays up all night researching ancient texts, bringing you coffee at 3 AM with that gentle smile that makes your heart skip. 'Found something,' he whispers, showing you a passage about divine chains. Hayes surprises you by remembering how you take your tea, his stern exterior softening when he thinks you're not looking. 'You don't have to carry this alone,' he says quietly after a particularly brutal demon encounter. And in your dreams, the mysterious man's presence grows stronger, more protective. When you wake, you swear you can still feel his hand in yours. Each man offers something different, but all three are becoming impossible to imagine living without.",
      image: portalBgImage,
      choices: [
        { id: 'confide_marcus', text: 'Confide in Marcus about your growing fears' },
        { id: 'accept_hayes_protection', text: 'Accept Hayes\' offer to stay close during missions' },
        { id: 'chase_dream_connection', text: 'Try to strengthen your connection with the mysterious man' },
      ]
    },
    7: {
      title: "The Discovery",
      content: "The breakthrough comes at 4 AM in Marcus's cluttered shop. Ancient texts spread across every surface, Hayes's tactical reports mixed with your own field notes, and the mysterious energy readings that have haunted your dreams finally make sense. 'The portals aren't random,' you breathe, connecting the final pieces. 'They're following ley lines, but in reverse. Someone—or something—is systematically weakening the barriers.' Marcus's eyes widen as he traces the pattern on his map. 'If we combine the ancient sealing charms with Hayes's containment technology...' Hayes leans over your shoulder, his presence warm and solid. 'We could close them. All of them.' For the first time in weeks, hope blooms in your chest. But in the back of your mind, a familiar voice whispers a warning you can't quite remember.",
      image: portalBgImage,
      choices: [
        { id: 'plan_sealing', text: 'Begin planning the portal sealing operation' },
        { id: 'investigate_warning', text: 'Try to remember the warning from your dreams' },
        { id: 'celebrate_breakthrough', text: 'Take a moment to celebrate this breakthrough' },
      ]
    },
    8: {
      title: "False Victory",
      content: "The final portal shimmers and collapses with a sound like breaking glass. Around you, the combined forces of Hayes's unit, Marcus's enchanted arsenal, and your own determination have achieved the impossible. The last dimensional tear seals with a brilliant flash, and suddenly the oppressive weight you've carried for months lifts from your shoulders. 'We did it,' Hayes says, disbelief and relief warring in his voice. Marcus pulls you into a fierce hug, spinning you around as his laughter echoes off the warehouse walls. Even the mysterious man appears one last time, a proud smile on his usually serious face before he fades into shadow. The world is safe. The portals are sealed. For the first time since Macau, you allow yourself to imagine a future—and wonder which of these three men might be part of it.",
      image: portalBgImage,
      choices: [
        { id: 'choose_marcus', text: 'Realize your heart belongs with Marcus' },
        { id: 'choose_hayes', text: 'Acknowledge your growing feelings for Hayes' },
        { id: 'choose_mysterious', text: 'Seek out the mysterious man to confess your feelings' },
      ]
    },
    9: {
      title: "ACT III: The Betrayal - Kidnapped",
      content: "Your choice hangs in the air, unspoken but decided, when the world tilts sideways. The mysterious man steps from shadow, but something is wrong—his eyes burn with an otherworldly light, and power radiates from him in waves that make your teeth ache. 'I'm sorry,' he says, and his voice carries harmonics that shouldn't exist in human throats. 'But you need to understand the truth.' Before you can react, darkness swallows you whole. When consciousness returns, you're somewhere impossible—a realm of obsidian spires and crimson skies, where the air itself whispers of ancient power and endless night. The mysterious man stands before you, but now you see him clearly: horns curving from his temple, wings folded against his back, and in his eyes, centuries of pain. 'Welcome to Diyu,' he says softly. 'Welcome to hell.'",
      image: portalBgImage,
      choices: [
        { id: 'demand_answers', text: 'Demand to know why he deceived you' },
        { id: 'try_escape', text: 'Look for a way to escape back to Earth' },
        { id: 'stay_calm', text: 'Stay calm and try to understand the situation' },
      ]
    },
    10: {
      title: "The Demon King's Truth",
      content: "The throne room stretches impossibly high, carved from black stone that pulses with its own malevolent life. Upon a throne of bone and shadow sits a figure that makes your mysterious savior look almost human by comparison. The Demon King's presence presses against your mind like a physical weight, and when he speaks, reality itself seems to listen. 'Child of the hunter bloodline,' his voice resonates through your bones, 'do you know what your ancestors really did?' Images flood your mind—not of demons as monsters, but as humans. Families torn apart, children screaming as divine chains drag them into darkness. 'We were people once. Enslaved by the gods your family served, transformed into the very monsters you hunt.' His eyes, ancient and terrible, bore into yours. 'Every demon you've slain was once someone's child, someone's parent, someone's love.'",
      image: portalBgImage,
      choices: [
        { id: 'reject_truth', text: 'Reject this version of history' },
        { id: 'question_ancestors', text: 'Question everything you believed about your family' },
        { id: 'ask_evidence', text: 'Demand proof of these claims' },
      ]
    },
    11: {
      title: "The Shrinking Prison",
      content: "The Demon King gestures, and the walls of the throne room become transparent, revealing the true horror of Diyu. What you see breaks your heart: families huddled together in the dying light, children with small horns and frightened eyes, elderly demons whose human memories still shine in their faces. 'This realm is dying,' the king's voice cracks with millennia of grief. 'The gods' prison shrinks each day. Soon, there will be nothing left.' A small demon child approaches, tugging on your sleeve with claws that should terrify you but instead fill you with protective fury. She can't be more than seven, her eyes wide with innocent trust. 'Are you here to save us?' she whispers. The weight of genocide settles on your shoulders. If you do nothing, if you maintain the seals you helped create, an entire people—transformed but still fundamentally human—will die.",
      image: portalBgImage,
      choices: [
        { id: 'help_demons', text: 'Agree to help free the trapped souls' },
        { id: 'find_alternative', text: 'Search for an alternative solution' },
        { id: 'need_time', text: 'Ask for time to process this revelation' },
      ]
    },
    12: {
      title: "The Choice That Changes Everything",
      content: "Back on Earth, chaos reigns. Marcus paces his shop like a caged animal, ancient tomes scattered around him as he searches frantically for a way to reach you. His usual easy smile is gone, replaced by desperate determination. Hayes has mobilized every resource at his disposal, federal agents and supernatural units converging on known dimensional weak points. His controlled facade cracks as he barks orders, the professional mask slipping to reveal raw panic underneath. Neither knows about your revelation in Diyu, about the choice that now tears at your soul. The mysterious man—the Demon Prince—stands beside you, his deception laid bare but his feelings somehow still genuine. 'I saved you because I had to,' he admits quietly. 'But somewhere along the way, it became real.' The gods are your true enemies, he says. Your ancestors were deceived. Help break the chains, or remain their unwitting pawn forever. The child demon takes your hand, her small fingers trembling with hope and fear.",
      image: portalBgImage,
      choices: [
        { id: 'break_chains', text: 'Decide to help break the divine chains' },
        { id: 'return_earth', text: 'Demand to return to Earth to think' },
        { id: 'confront_prince', text: 'Confront the Demon Prince about his true feelings' },
      ]
    }
  };

  const handleChoice = (choiceId: string) => {
    console.log('Player chose:', choiceId);
    
    // Handle relationship changes based on choices
    if (choiceId === 'flirt_marcus' || choiceId === 'focus_research' || choiceId === 'confide_marcus' || choiceId === 'choose_marcus') {
      setCharacters(prev => prev.map(char => 
        char.id === 'weapons-supplier' ? {...char, affection: char.affection + 5} : char
      ));
    } else if (choiceId === 'cooperate_hayes' || choiceId === 'coordinate_hayes' || choiceId === 'accept_hayes_protection' || choiceId === 'choose_hayes') {
      setCharacters(prev => prev.map(char => 
        char.id === 'captain' ? {...char, affection: char.affection + 5} : char
      ));
    } else if (choiceId === 'follow_mysterious' || choiceId === 'seek_mysterious' || choiceId === 'chase_dream_connection' || choiceId === 'choose_mysterious') {
      setCharacters(prev => prev.map(char => 
        char.id === 'mysterious-man' ? {...char, affection: char.affection + 5} : char
      ));
    }
    
    // Handle special story branches
    if (choiceId === 'choose_marcus' || choiceId === 'choose_hayes' || choiceId === 'choose_mysterious') {
      // Mark the chosen love interest
      setCharacters(prev => prev.map(char => ({
        ...char,
        isChosen: choiceId === `choose_${char.id.replace('-', '_')}`
      })));
    }
    
    // Progress to next chapter
    if (currentChapter < 12) {
      setCurrentChapter(prev => prev + 1);
    }
  };

  const handleCharacterSelect = (characterId: string) => {
    console.log('Selected character:', characterId);
    // Handle character interaction
  };

  const handleLoveInterestSelection = (characterId: string) => {
    setSelectedLoveInterest(characterId);
    setShowCharacterSelection(false);
    setGameStarted(true);
  };

  // Character Selection Screen
  if (showCharacterSelection) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${portalBgImage})` }}
        >
          <div className="absolute inset-0 gradient-fantasy opacity-80" />
        </div>

        {/* Character Selection */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
          <div className="text-center mb-12">
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-4 drop-shadow-lg">
              Choose Your Love Interest
            </h1>
            <p className="text-xl text-white/90 mb-2 max-w-2xl">
              Select your romantic companion for this mystical journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loveInterests.map((character) => (
              <div 
                key={character.id}
                className="character-card p-6 max-w-sm cursor-pointer transform hover:scale-105 transition-transform duration-300"
                onClick={() => handleLoveInterestSelection(character.id)}
              >
                <div className="relative">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4">
                    <img 
                      src={character.image} 
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3 text-center">
                    <div>
                      <p className="font-bold text-2xl text-white mb-2">
                        {character.name}
                      </p>
                      <p className="text-lg text-primary">{character.description}</p>
                    </div>


                    <Button 
                      variant="romantic" 
                      size="lg"
                      className="w-full mt-4"
                    >
                      Choose {character.name}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button 
            variant="ghost" 
            className="mt-8 text-white/70 hover:text-white"
            onClick={() => setShowCharacterSelection(false)}
          >
            ← Back to Title
          </Button>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${portalBgImage})` }}
        >
          <div className="absolute inset-0 gradient-fantasy opacity-80" />
        </div>

        {/* Title Screen */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
          <div className="floating mb-8">
            <Sparkles className="h-16 w-16 text-accent mx-auto mb-4" />
          </div>
          
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-4 drop-shadow-lg">
            Portal Hearts
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-2 max-w-2xl">
            A Journey Through Worlds
          </p>
          
          <p className="text-lg text-white/70 mb-12 max-w-xl">
            Uncover the truth behind the mysterious portals and find love in the most unexpected places.
          </p>

          <div className="space-y-4">
            <Button 
              variant="romantic" 
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => setShowCharacterSelection(true)}
            >
              <Play className="h-5 w-5 mr-2" />
              Begin Your Journey
            </Button>
            
            <div className="flex gap-4">
              <Button variant="secondary" size="lg">
                Load Game
              </Button>
              <Button variant="secondary" size="lg">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <GameHeader 
        title="Portal Hearts" 
        chapter={storyContent[currentChapter]?.title || `Chapter ${currentChapter}`}
      />
      
      <main className="pt-20 container mx-auto px-4 py-8">
        {activeTab === 'story' && (
          <div className="max-w-4xl mx-auto">
            <StorySection
              title={storyContent[currentChapter]?.title || "To Be Continued..."}
              content={storyContent[currentChapter]?.content || "You've reached a pivotal moment in your journey. The truth about the demons, the gods, and your own family's legacy has shattered everything you thought you knew. Standing in Diyu with the Demon Prince beside you and the fate of two worlds in your hands, you must choose: Will you help break the divine chains and free the trapped souls, knowing it might endanger humanity? Will you find another way to save both worlds? Or will you trust in the bonds you've forged with Marcus and Hayes to find a solution together? The choice is yours, and the consequences will reshape the very fabric of reality. Your story continues in the next chapter of Portal Hearts..."}
              image={storyContent[currentChapter]?.image || portalBgImage}
              choices={storyContent[currentChapter]?.choices || []}
              onChoice={handleChoice}
            />
          </div>
        )}

        {activeTab === 'characters' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display font-bold text-3xl text-gradient-romantic mb-4">
                Characters
              </h2>
              <p className="text-muted-foreground">
                Build relationships and uncover their secrets
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onSelect={handleCharacterSelect}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'memories' && (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl text-gradient-romantic mb-4">
              Memories
            </h2>
            <p className="text-muted-foreground mb-8">
              Revisit special moments and scenes you've unlocked
            </p>
            <div className="otome-card p-8">
              <p className="text-muted-foreground">
                No memories unlocked yet. Progress through the story to collect special moments!
              </p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-3xl text-gradient-romantic mb-8 text-center">
              Settings
            </h2>
            <div className="space-y-4">
              <div className="otome-card p-6">
                <h3 className="font-semibold mb-4">Audio Settings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Master Volume</span>
                    <div className="w-32 h-2 bg-muted rounded-full">
                      <div className="w-3/4 h-full bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Music Volume</span>
                    <div className="w-32 h-2 bg-muted rounded-full">
                      <div className="w-2/3 h-full bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="otome-card p-6">
                <h3 className="font-semibold mb-4">Game Settings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Auto-play Speed</span>
                    <Button variant="secondary" size="sm">Medium</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Text Speed</span>
                    <Button variant="secondary" size="sm">Normal</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <GameMenu activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
