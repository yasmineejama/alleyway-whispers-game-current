import { useState, useEffect } from "react";
import { GameHeader } from "@/components/GameHeader";
import { GameMenu } from "@/components/GameMenu";
import { CharacterCard } from "@/components/CharacterCard";
import { StorySection } from "@/components/StorySection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CharacterPage } from "@/components/CharacterPage";
import { DemonBestiary } from "@/components/DemonBestiary";
import { ChapterList } from "@/components/ChapterList";
import { CreditsSystem } from "@/components/CreditsSystem";
import { Button } from "@/components/ui/button";
import { Sparkles, Play } from "lucide-react";
import { toast } from "sonner";

// Import character images
import mainCharacterImage from "@/assets/main-character.jpg";
import captainLeeImage from "@/assets/captain-lee.jpg";
import minSupplierImage from "@/assets/min-supplier.jpg";
import kaiMysteriousImage from "@/assets/kai-mysterious.jpg";
import brokenSealsBg from "@/assets/broken-seals-bg.jpg";
import boneDemonImage from "@/assets/bone-demon.jpg";

// Import chapter images
import chapter1Image from "@/assets/chapter-1.jpg";
import chapter2Image from "@/assets/chapter-2.jpg";
import chapter3Image from "@/assets/chapter-3.jpg";
import chapter4Image from "@/assets/chapter-4.jpg";
import chapter5Image from "@/assets/chapter-5.jpg";
import chapter6Image from "@/assets/chapter-6.jpg";
import chapter7Image from "@/assets/chapter-7.jpg";
import chapter8Image from "@/assets/chapter-8.jpg";
import chapter9Image from "@/assets/chapter-9.jpg";
import chapter10Image from "@/assets/chapter-10.jpg";
import chapter11Image from "@/assets/chapter-11.jpg";
import chapter12Image from "@/assets/chapter-12.jpg";
import chapter13Image from "@/assets/chapter-13.jpg";
import chapter14Image from "@/assets/chapter-14.jpg";
import chapter15Image from "@/assets/chapter-15.jpg";
import chapter16Image from "@/assets/chapter-16.jpg";
import chapter17Image from "@/assets/chapter-17.jpg";
import chapter18Image from "@/assets/chapter-18.jpg";
import chapter19Image from "@/assets/chapter-19.jpg";
import chapter20Image from "@/assets/chapter-20.jpg";
import chapter21Image from "@/assets/chapter-21.jpg";
import chapter22Image from "@/assets/chapter-22.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCharacterSelection, setShowCharacterSelection] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [selectedLoveInterest, setSelectedLoveInterest] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [encounteredDemons, setEncounteredDemons] = useState<string[]>([]);
  const [storyBranch, setStoryBranch] = useState<string>('main'); // For multiple storylines
  const [unlockedChapters, setUnlockedChapters] = useState<number[]>([1]); // Start with Chapter 1 unlocked
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [credits, setCredits] = useState(5); // Start with 5 free credits
  const [lastCreditRefresh, setLastCreditRefresh] = useState(new Date());
  
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
      name: 'Kai',
      title: 'The Mysterious Guardian',
      image: kaiMysteriousImage,
      description: 'A man whose origins are unknown',
      affection: 0,
      isUnlocked: true,
    },
  ];

  const [characters, setCharacters] = useState([
    {
      id: 'min-supplier',
      name: 'Min',
      title: 'Supernatural Weapons Supplier',
      image: minSupplierImage,
      description: 'A charismatic Taoist practitioner from Macau who creates and sells supernatural charms and weapons. His broad shoulders and wicked smile hide deeper protective instincts.',
      affection: 15,
      isUnlocked: true,
      relationship: 'A steady presence who always has your back with both supplies and emotional support.',
      age: 'Mid-twenties',
      origin: 'Macau native, half Cantonese/half Portuguese'
    },
    {
      id: 'captain-lee',
      name: 'Captain Lee',
      title: 'Supernatural Investigation Unit Captain',
      image: captainLeeImage,
      description: 'A commanding Korean American investigator in his early thirties. Tall and broad-shouldered, he leads the worldwide investigation into demon activity with military precision.',
      affection: 10,
      isUnlocked: true,
      relationship: 'Professional tension with undeniable chemistry. His protection comes with structure.',
      age: 'Early thirties',
      origin: 'Korean American, NYC-based federal agent'
    },
    {
      id: 'kai-mysterious',
      name: 'Kai',
      title: 'Timeless Guardian',
      image: kaiMysteriousImage,
      description: 'A mysterious figure of ancient origins. East Asian with a handsome face and swimmer\'s build, he appears in your dreams and during critical moments.',
      affection: 5,
      isUnlocked: true,
      relationship: 'Dangerous attraction. His ancient knowledge and protection come with hidden truths.',
      age: 'Thousands of years old (appears timeless)',
      origin: 'Ancient East Asian entity of unknown origins'
    },
  ]);

  const storyContent = {
    // ACT I: AWAKENING (Chapters 1-6)
    1: {
      title: "ACT I: Chapter 1 - The Bone Demon's Warning",
      content: "The narrow alley behind Macau's glittering casinos reeks of decay and something far worse. Your silver dagger gleams as you corner the baigujing—its bone-white face contorting into a grotesque smile. 'You think you understand the hunt, little slayer?' it hisses, its voice like grinding glass. 'The qi lines grow weak. Soon, your precious world will learn the truth about the chains that bind us.' The demon's words echo with an unsettling sincerity, as if it's not threatening but warning. You've hunted dozens of demons before, but none have ever spoken with such... sadness. You lunge forward, but the demon dissolves into mist, leaving behind only strange, pulsing energy residue and whispers of forgotten sorrow. Something about this encounter feels different. Wrong. As if you're missing a crucial piece of the puzzle.",
      image: chapter1Image,
      choices: [
        { id: 'examine_residue', text: 'Examine the strange qi energy residue carefully' },
        { id: 'chase_demon', text: 'Try to track where the demon went' },
        { id: 'seek_min', text: 'Go to Min for answers about weakening qi lines' },
      ]
    },
    2: {
      title: "Chapter 2 - Kai's First Appearance",
      content: "As you kneel to examine the residue, shadows move at the alley's mouth. Three more baigujing emerge from the darkness, their bone faces gleaming in the neon light, drawn by the lingering qi of their fallen kin. Your charms are nearly depleted from the first fight, and you can feel exhaustion creeping into your limbs. This is bad—really bad. As skeletal claws reach for your throat, death seems inevitable. Then—a figure drops from above, silent as falling silk but deadly as a blade. He dispatches two demons before you can blink, movements almost too fast to follow, each strike precise and impossibly elegant. The third demon lunges at you, but he's already there, intercepting with inhuman speed. When you finally turn to thank him, piercing dark eyes meet yours for just a heartbeat—eyes that hold millennia of sorrow and fierce protection. 'The seals are breaking,' he whispers, his voice carrying an otherworldly resonance that makes your bones vibrate. 'Trust no one who claims to serve heaven.' Before you can ask what he means, he melts back into the shadows, leaving you with more questions than answers and a strange warmth where his hand briefly touched your shoulder.",
      image: chapter2Image,
      choices: [
        { id: 'follow_kai', text: 'Try to follow the mysterious savior' },
        { id: 'analyze_technique', text: 'Analyze his fighting technique - it seemed ancient' },
        { id: 'focus_supplies', text: 'Focus on getting more supplies from Min first' },
      ]
    },
    3: {
      title: "Chapter 3 - Min's Charm Shop",
      content: "Min's shop smells like sage, sandalwood, and old incense—comforting scents that wrap around you like a warm embrace after the night's terrors. Ancient Taoist talismans hang from every surface, their inscriptions glowing faintly with protective qi. The air hums with carefully maintained spiritual energy. He looks up from inscribing a charm, those broad shoulders hunched over delicate work, and that characteristic wicked grin spreading across his handsome face when he sees you. 'Let me guess—used up all your demon-catching charms on some nasty baigujing?' His Portuguese-accented Cantonese is warm with genuine concern despite the teasing tone. 'You know I worry when you come in looking like you've been through a blender, querida.' He slides stronger charms across the counter, fingers lingering near yours for just a moment. 'These are infused with genuine Mazu blessings from the A-Ma Temple. But...' His expression turns serious, troubled. 'Something's wrong with the qi flow lately. The ley lines—the qi lines—they're destabilizing. I've never seen anything like it in three generations of my family's records.' He shows you his detection instruments, the needles swinging wildly. 'Whatever's happening, it's big. And it scares me.'",
      image: chapter3Image,
      choices: [
        { id: 'flirt_min', text: 'Appreciate his protective concern - and his smile' },
        { id: 'ask_qi_lines', text: 'Ask him about the disrupted qi lines' },
        { id: 'professional_only', text: 'Keep things professional - focus on the supplies' },
      ]
    },
    4: {
      title: "Chapter 4 - Captain Lee's Arrival",
      content: "Your apartment building's lobby feels different when you drag yourself home at 3 AM, exhausted and bruised. A stranger in black tactical fatigues leans against the mailboxes with the casual confidence of someone who owns every space he enters, and you instinctively reach for your silver blade. Then you notice the badge glinting under harsh fluorescent lights—federal, but with symbols you don't recognize. Supernatural division? 'Easy,' he says, raising his hands slowly, palms out. His voice carries natural military authority—the kind you can't fake, earned through real command. 'Captain Lee, Supernatural Investigation Unit.' His steel-gray eyes assess you with professional thoroughness, taking in your weapons, your defensive stance, the demon blood still staining your jacket. 'You're the demon hunter active in Macau. We need to talk. Supernatural activity has spiked 400% worldwide in the last month—portals opening, demons manifesting in broad daylight, civilian casualties climbing.' He straightens to his full, imposing height, somehow making the cramped lobby feel smaller. 'My unit is taking point on global coordination. Question is: are you going to cooperate and help us save lives, or do I have to make this official with warrants and surveillance?' Despite the threat, something in his eyes suggests he'd rather have you as an ally.",
      image: chapter4Image,
      choices: [
        { id: 'cooperate_lee', text: 'Agree to cooperate - you need his resources' },
        { id: 'resist_authority', text: 'Resist - you work alone for good reasons' },
        { id: 'negotiate_terms', text: 'Negotiate - cooperation, but on your terms' },
      ]
    },
    5: {
      title: "Chapter 5 - The First Dream",
      content: "That night, your dreams are unlike any before—vivid, tangible, impossibly real. You stand in a realm of impossible beauty: ancient Chinese gardens where qi flows visibly through crystal streams like liquid starlight, where cherry blossoms fall upward, where the very air shimmers with magic. It's breathtaking and terrifying in equal measure. Kai appears beside you, no longer hiding in shadows or wearing the mask of mere humanity. His presence feels both protective and ancient, like standing next to a mountain that's learned to walk. 'This is the realm between,' he says softly, his hand almost touching yours, close enough to feel his warmth but maintaining respectful distance. 'Here, I can speak truth without divine observers.' His voice carries pain that spans centuries. 'The demons you hunt—they were human once. Thousands of years ago, people with gifts like yours: they could see spirits, heal with herbs, commune with nature, sense qi flows. The gods called this corruption and demonic taint, but it was just... difference. Human potential that threatened divine control.' In the dream, you see flashes of memory: families with glowing hands healing the sick, children laughing as they played with friendly spirits, villages living in harmony with the supernatural world. Then golden chains descending from heaven, screams of agony as divine magic twists human souls into monsters, parents forced to watch their children transform. 'I was one of the first taken,' Kai whispers, and you can hear millennia of guilt in his voice. 'I tried to protect my village. Instead, I became what they feared most.' You wake with tears on your cheeks and the phantom sensation of his hand finally touching yours, grounding you before the nightmare consumed you.",
      image: chapter5Image,
      choices: [
        { id: 'trust_dream', text: 'Trust the dream vision - it felt too real to be false' },
        { id: 'question_dream', text: 'Question everything - dreams can be manipulations' },
        { id: 'research_history', text: 'Research your family history for clues' },
      ]
    },
    6: {
      title: "Chapter 6 - Building Bonds",
      content: "The investigation consumes your days, but it's the quiet moments that reveal who these men truly are. Min stays up all night researching ancient texts, bringing you Macanese coffee at 3 AM with that gentle smile. 'Found something about divine seals,' he whispers, showing you a passage in classical Chinese. Captain Lee surprises you by remembering how you take your tea, his stern exterior softening. 'You don't have to carry this alone,' he says after a brutal encounter. In your dreams, Kai's presence grows stronger, more protective. 'Whatever comes,' his dream-voice promises, 'I will not let them harm you.' Each man offers something different, but all three are becoming impossible to imagine living without.",
      image: brokenSealsBg,
      choices: [
        { id: 'confide_min', text: 'Confide in Min about your growing fears' },
        { id: 'accept_lee_protection', text: 'Accept Lee\'s offer to stay close during missions' },
        { id: 'strengthen_kai_bond', text: 'Try to strengthen your dream connection with Kai' },
      ]
    },

    // ACT II: REVELATION (Chapters 7-16)  
    7: {
      title: "ACT II: Chapter 7 - The Portal Discovery",
      content: "Three weeks later, you stand before a shimmering tear in reality beneath the Brooklyn Bridge. This is the seventh portal you've documented across three continents. Each pulses with corrupted qi that makes your teeth ache. Captain Lee coordinates his tactical team while Min unpacks modified containment charms. 'The pattern is accelerating,' Lee reports grimly. 'We're seeing manifestations every 48 hours now.' Min frowns at his readings. 'The dimensional barriers are weakening faster than we calculated. If this continues...' A child's cry echoes from within the portal—distinctly human, distinctly terrified.",
      image: brokenSealsBg,
      choices: [
        { id: 'enter_portal', text: 'Insist on entering the portal to investigate' },
        { id: 'seal_immediately', text: 'Focus on sealing it immediately' },
        { id: 'study_pattern', text: 'Study the pattern more before acting' },
      ]
    },
    8: {
      title: "Chapter 8 - Snake Demon's Testimony", 
      content: "The snake demon you capture doesn't fight—she weeps. In her human form, she's breathtakingly beautiful but fragile, with ancient sadness in her eyes. 'Please,' she whispers in Mandarin, 'I was once like you. I had a name—Lian. I had a family.' Min translates, his usual confidence shaken. She continues: 'The gods came to our village during the Han Dynasty. They said we were 'tainted by demonic qi' but we were just... different. We could see spirits, heal with herbs.' Her form flickers between human and serpentine. 'The golden chains burned away our humanity, left only hunger and rage. But some of us... some of us remember.' Captain Lee's hand moves toward his weapon, but something in her testimony stops him.",
      image: brokenSealsBg,
      choices: [
        { id: 'believe_lian', text: 'Believe her story - it explains too much' },
        { id: 'remain_skeptical', text: 'Remain skeptical - demons are master manipulators' },
        { id: 'demand_proof', text: 'Demand proof of her claims' },
      ]
    },
    9: {
      title: "Chapter 9 - The Yaoguai's Rage",
      content: "The half-human, half-beast creature you corner in Shanghai is different from the others. His rage isn't mindless—it's focused, intelligent, heartbroken. 'You hunt us like animals,' he snarls in broken English, 'but we were your people once!' Through Min's translation, his story emerges: a peaceful mountain village that could commune with nature spirits. 'The gods called it 'corruption.' They chained us, twisted us, made us into the monsters they claimed we already were.' His partially human face contorts with grief. 'My wife... my children... they died in the transformation. Only I survived, and for what? To be hunted by their descendants?' Captain Lee's tactical team surrounds him, but you see something in the creature's eyes that makes you hesitate.",
      image: brokenSealsBg,
      choices: [
        { id: 'show_mercy', text: 'Show mercy - he\'s suffered enough' },
        { id: 'capture_for_study', text: 'Capture him for further study' },
        { id: 'end_suffering', text: 'End his suffering - death might be kindness' },
      ]
    },
    10: {
      title: "Chapter 10 - Kai's True Nature Revealed",
      content: "The confrontation comes when you're overwhelmed by a pack of desperate demons in Tokyo. As they close in, Kai appears—but this time, he doesn't hide what he is. Wings unfold from his back, dark and magnificent. His eyes burn with otherworldly power as he shields you from claws and fangs. 'Stay behind me,' he commands, his voice carrying harmonics that make reality shimmer. When the fighting ends, he turns to you, vulnerable despite his terrifying power. 'Now you know,' he says quietly. 'I am what you've been taught to hunt. I am the Demon Prince—but I was human once, long ago. My name was Kai, and I loved a mortal woman who looked... very much like you.'",
      image: brokenSealsBg,
      choices: [
        { id: 'accept_kai', text: 'Accept him - his protection has always been real' },
        { id: 'feel_betrayed', text: 'Feel betrayed by his deception' },
        { id: 'demand_truth', text: 'Demand the full truth about his past' },
      ]
    },
    11: {
      title: "Chapter 11 - The Hulixian's Seduction",
      content: "The nine-tailed fox demon is everything the legends say—breathtakingly beautiful, impossibly charismatic, and utterly dangerous. She appears in your hotel room in Beijing, lounging on your bed like she belongs there. 'Hello, little hunter,' she purrs, her voice like silk and honey. 'I am Meihua, and I have a proposition.' Her tails fan behind her hypnotically. 'You seek truth about the divine seals? I can give it to you—for a price.' She rises gracefully, her form shifting between devastatingly beautiful woman and fox spirit. 'I was a goddess once, worshipped and beloved. Until jealous celestials decided I was too 'close' to humanity.' Her eyes flash with ancient fury. 'They made me into this. But unlike the others, I learned to use what they made me.'",
      image: brokenSealsBg,
      choices: [
        { id: 'make_deal', text: 'Make a deal with Meihua - her information could be crucial' },
        { id: 'resist_seduction', text: 'Resist her seduction and refuse the deal' },
        { id: 'negotiate_carefully', text: 'Negotiate carefully - she\'s too dangerous to trust fully' },
      ]
    },
    12: {
      title: "Chapter 12 - Team Fractures",
      content: "The revelations are tearing your team apart. Captain Lee struggles with the implications—his entire career built on hunting people transformed against their will. 'If this is true,' he says, staring at case files with new eyes, 'then we're not law enforcement. We're... we're genocidal.' Min paces his shop, ancient texts scattered everywhere. 'My family taught me these charms to protect against demons. But if demons are just... traumatized humans...' His voice breaks. Meanwhile, Kai watches from the shadows, patient but pained. 'I should have told you sooner,' he says in your dreams. 'But would you have believed me? Would any of you?' The team you've grown to love is fracturing under the weight of impossible truth.",
      image: brokenSealsBg,
      choices: [
        { id: 'hold_team_together', text: 'Fight to hold the team together despite everything' },
        { id: 'choose_side', text: 'Choose a side - the truth is too important' },
        { id: 'seek_middle_ground', text: 'Seek middle ground - there has to be another way' },
      ]
    },
    13: {
      title: "Chapter 13 - The Ancient Massacre",
      content: "Min discovers the truth in his grandfather's hidden journals—documents that predate the modern demon hunting families. The Chinese characters are faded but legible: detailed accounts of the 'Great Purification' during the Tang Dynasty. Village after village of people with spiritual gifts, systematically rounded up by celestial decree. 'They called us 'qi-touched,'' Min reads, his voice hollow. 'We could see spirits, heal with herbs, communicate with nature. The gods declared this 'demonic corruption.'' The illustrations show golden chains descending from heaven, transforming families into monsters before the eyes of their children. 'My ancestor... he helped them,' Min whispers, staring at his own hands. 'We've been unknowing executioners for generations.'",
      image: brokenSealsBg,
      choices: [
        { id: 'comfort_min', text: 'Comfort Min - this isn\'t his fault' },
        { id: 'focus_stopping_it', text: 'Focus on stopping it now, not past guilt' },
        { id: 'research_more', text: 'Research more - there might be survivors' },
      ]
    },
    14: {
      title: "Chapter 14 - Captain Lee's Choice",
      content: "Captain Lee stands before a mirror in his federal office, staring at commendations and photos from a distinguished career. His team waits for orders, but he can't speak. Everything he's believed, everything he's done—it's built on a lie so massive it threatens to crush him. 'Sir?' his lieutenant asks. 'The Seoul team is waiting for guidance on the portal situation.' Lee's reflection stares back, and for the first time, he sees not a protector but a tool of oppression. 'Stand down,' he says quietly. Then louder: 'All teams, stand down. We... we need to reevaluate our mission parameters.' His career is over. But maybe, for the first time in years, he's doing the right thing.",
      image: brokenSealsBg,
      choices: [
        { id: 'support_lee', text: 'Support Lee\'s decision completely' },
        { id: 'worry_consequences', text: 'Worry about the consequences of his choice' },
        { id: 'plan_together', text: 'Plan your next moves together as a team' },
      ]
    },
    15: {
      title: "Chapter 15 - Kai's Memories",
      content: "In your deepest dream yet, Kai shows you his true past. You stand beside him in ancient China, watching a young scholar named Kai laugh with friends at a mountain temple. He's studying Taoist philosophy, learning to see qi flows, falling in love with a village girl named Lian. 'I was twenty-three,' Kai's present voice whispers as you watch his past self. 'We thought we were blessed by the gods to see the spirit world so clearly.' The scene shifts: golden chains descending from heaven, celestial soldiers dragging away everyone Kai loved. 'They transformed me first, as punishment for teaching others to see qi. I watched them change Lian into a snake demon.' His voice breaks across millennia. 'I became their prince only by accepting the chains willingly, hoping to protect the others. But I failed them all.'",
      image: brokenSealsBg,
      choices: [
        { id: 'comfort_kai', text: 'Comfort Kai - he\'s carried this pain for millennia' },
        { id: 'ask_about_lian', text: 'Ask about Lian - is she the snake demon you met?' },
        { id: 'plan_revenge', text: 'Plan revenge against the gods who did this' },
      ]
    },
    16: {
      title: "Chapter 16 - The Dying Realm",
      content: "Kai brings you to the edge of the demon realm in a vision more real than any dream. What you see breaks your heart: a once-beautiful dimension now crumbling into nothing. Families huddle together as reality dissolves around them. Children with small horns and frightened eyes cling to parents who remember being human. The qi prison that holds them is contracting daily, crushing everything within. 'This is what your seals maintain,' Kai says, his voice heavy with grief. 'Not just imprisonment—slow execution. Every portal you close, every seal you strengthen, brings them closer to complete annihilation.' A small demon child approaches, her eyes wide with innocent hope. 'Are you here to save us, pretty lady?' she asks in perfect Mandarin. The weight of genocide settles on your shoulders.",
      image: brokenSealsBg,
      choices: [
        { id: 'promise_help', text: 'Promise to help find a way to save them' },
        { id: 'feel_overwhelmed', text: 'Feel overwhelmed by the magnitude of suffering' },
        { id: 'seek_alternatives', text: 'Seek alternatives to both imprisonment and freedom' },
      ]
    },

    // ACT III: CHOICE (Chapters 17-22)
    17: {
      title: "ACT III: Chapter 17 - The Summons",
      content: "You wake from the vision to find your apartment surrounded by celestial light. Three figures in flowing robes and impossible beauty stand in your living room, their presence making the air itself sing with divine power. 'Demon Slayer,' their voices harmonize perfectly, 'you have been compromised by enemy influences. You will come with us for purification.' Min and Captain Lee burst through your door, weapons drawn, but their bullets pass harmlessly through the celestial beings. 'Choose now,' the lead figure intones. 'Serve heaven as your bloodline demands, or be cleansed of corruption forever.' Behind them, Kai's shadow writhes against the wall, unable to approach but radiating desperate fury.",
      image: brokenSealsBg,
      choices: [
        { id: 'refuse_gods', text: 'Refuse the gods - your loyalty lies with the truth' },
        { id: 'pretend_compliance', text: 'Pretend to comply to learn their plans' },
        { id: 'demand_answers', text: 'Demand answers about the true history' },
      ]
    },
    18: {
      title: "Chapter 18 - Heavenly Court",
      content: "The Heavenly Court is magnificent and terrible—a realm of perfect order where every surface gleams with oppressive purity. Before the Jade Emperor's throne, you stand trial for 'consorting with demonic influences.' The assembled gods are breathtaking and cold, their beauty unmarred by empathy. 'Your bloodline has served us faithfully for millennia,' the Jade Emperor intones, his voice like crystal bells. 'But you have been tainted by lies.' Around the court, you see other Hunter families—all bound by golden chains of obligation, their eyes vacant with forced loyalty. 'The demons are a plague,' he continues. 'Their existence threatens the cosmic order. You will help us complete the Final Purification, or join them in oblivion.'",
      image: brokenSealsBg,
      choices: [
        { id: 'challenge_emperor', text: 'Challenge the Jade Emperor\'s authority' },
        { id: 'play_for_time', text: 'Play for time - your friends are planning something' },
        { id: 'accept_chains', text: 'Pretend to accept the binding chains' },
      ]
    },
    19: {
      title: "Chapter 19 - The Rescue",
      content: "Just as golden chains descend toward you, reality explodes into chaos. Kai crashes through the heavenly barriers, his demonic power blazing like a dark star. Min follows, wielding Taoist talismans that actually wound celestial beings. Captain Lee brings federal weapons modified with Min's enchantments. 'Nobody takes our girl,' Min snarls in Portuguese, his protective fury magnificent. Lee's tactical precision cuts through divine ranks with lethal efficiency. 'Federal jurisdiction says these are crimes against humanity,' he barks, his weapon carving through celestial guards. But it's Kai who faces the Jade Emperor directly, centuries of pain and rage finally unleashed. 'You destroyed everything I loved,' he roars. 'Now face the monster you created!'",
      image: brokenSealsBg,
      choices: [
        { id: 'fight_alongside', text: 'Fight alongside all three men as equals' },
        { id: 'protect_weakest', text: 'Focus on protecting whoever needs it most' },
        { id: 'target_emperor', text: 'Target the Jade Emperor - end this at the source' },
      ]
    },
    20: {
      title: "Chapter 20 - The Truth Weapon",
      content: "In the climactic battle, Min reveals his secret weapon—not a charm or spell, but evidence. Recordings of demon testimonies, documentation of the ancient massacres, proof of the gods' systematic genocide broadcast across all realms simultaneously. 'The truth is the ultimate talisman,' he shouts over the chaos, his technical skills merging with Taoist power. Suddenly, every human Hunter family sees the reality of what they've been doing. The golden chains binding them weaken as free will reasserts itself. Captain Lee coordinates the rebellion with military efficiency, turning Hunter families against their divine masters. But the battle's turning point comes when you make your choice—not just between sides, but between the three men who've fought to save both you and an entire people.",
      image: brokenSealsBg,
      choices: [
        { id: 'choose_min', text: 'Choose Min - his protection and innovation won your heart' },
        { id: 'choose_lee', text: 'Choose Captain Lee - his honor and strength inspire you' },
        { id: 'choose_kai', text: 'Choose Kai - your connection transcends time and species' },
      ]
    },
    21: {
      title: "Chapter 21 - New World Order",
      content: "The aftermath reshapes everything. The Jade Emperor, stripped of his enslaved Hunters, retreats to pure celestial realms. The demon realm stabilizes as the dying qi prison transforms into a peaceful parallel dimension. Min establishes new protective wards that defend rather than imprison. Captain Lee leads a reformed supernatural investigation unit focused on justice rather than extermination. Kai works to heal the trauma of his people while building bridges between realms. Your choice of partner shapes how you help rebuild: Min's innovation creates new harmonies between realms, Lee's leadership establishes just laws for all beings, or Kai's ancient wisdom guides healing for both sides. But regardless of romance, all three remain your trusted allies in building a better world.",
      image: brokenSealsBg,
      choices: [
        { id: 'focus_healing', text: 'Focus on healing the trauma across all realms' },
        { id: 'establish_justice', text: 'Establish new systems of justice and protection' },
        { id: 'build_bridges', text: 'Build lasting bridges between human and demon communities' },
      ]
    },
    22: {
      title: "Chapter 22 - Broken Seals, Mended Hearts",
      content: "One year later, you stand where it all began—in Macau's narrow alleys, now patrolled by mixed teams of humans and reformed demons working together. The qi lines flow freely but safely, monitored by Min's new detection systems and protected by Captain Lee's reformed units. Former demons like Lian teach at integration centers, sharing their stories to prevent future tragedies. Kai, no longer hiding his nature, serves as an ambassador between realms. The seals are truly broken—not the prison walls, but the barriers of hatred and misunderstanding. Your chosen partner stands beside you, but all three men remain part of your extended family. The broken seals have mended hearts across species, and for the first time in millennia, both humans and demons can dream of genuine peace.",
      image: brokenSealsBg,
      choices: [
        { id: 'continue_adventure', text: 'Continue your adventures in this new world' },
        { id: 'start_family', text: 'Start building a family in this peaceful future' },
        { id: 'teach_others', text: 'Teach the next generation about unity and understanding' },
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
    if (currentChapter < 22) {
      // Mark current chapter as completed
      handleChapterComplete(currentChapter);
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
    setShowChapterList(true); // Show chapter list instead of starting game directly
  };

  const handleChapterSelect = (chapterId: number) => {
    setCurrentChapter(chapterId);
    setShowChapterList(false);
    setGameStarted(true);
    
    // Mark chapter as unlocked if not already
    if (!unlockedChapters.includes(chapterId)) {
      setUnlockedChapters(prev => [...prev, chapterId]);
    }
  };

  const handleChapterComplete = (chapterId: number) => {
    // Mark chapter as completed
    if (!completedChapters.includes(chapterId)) {
      setCompletedChapters(prev => [...prev, chapterId]);
    }
    
    // Unlock next chapter
    const nextChapter = chapterId + 1;
    if (nextChapter <= 22 && !unlockedChapters.includes(nextChapter)) {
      setUnlockedChapters(prev => [...prev, nextChapter]);
    }
  };

  // Character Selection Screen
  if (showCharacterSelection) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${brokenSealsBg})` }}
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

  // Chapter List Screen
  if (showChapterList) {
    return (
      <ChapterList 
        unlockedChapters={unlockedChapters}
        completedChapters={completedChapters}
        currentChapter={currentChapter}
        onChapterSelect={handleChapterSelectWithCredits}
        onBack={() => {
          setShowChapterList(false);
          setShowCharacterSelection(true);
        }}
      />
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${brokenSealsBg})` }}
        >
          <div className="absolute inset-0 gradient-fantasy opacity-80" />
        </div>

        {/* Title Screen */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
          <div className="floating mb-8">
            <Sparkles className="h-16 w-16 text-accent mx-auto mb-4" />
          </div>
          
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-4 drop-shadow-lg">
            Broken Seals
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

  // Check and refresh credits daily
  useEffect(() => {
    const now = new Date();
    const lastRefresh = new Date(lastCreditRefresh);
    if (now.getDate() !== lastRefresh.getDate()) {
      setCredits(5);
      setLastCreditRefresh(now);
      toast.success("Your daily 5 credits have been refreshed!");
    }
  }, [lastCreditRefresh]);

  const handlePurchaseCredits = (amount: number) => {
    setCredits(prev => prev + amount);
    toast.success(`Successfully purchased ${amount} credits!`);
  };

  const handleChapterSelectWithCredits = (chapterId: number) => {
    if (chapterId === 1 || completedChapters.includes(chapterId)) {
      handleChapterSelect(chapterId);
    } else if (credits >= 1) {
      setCredits(prev => prev - 1);
      handleChapterSelect(chapterId);
      toast.success("Chapter unlocked! 1 credit used.");
    } else {
      toast.error("Not enough credits! Purchase more or wait for daily refresh.");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <GameHeader 
        title="Broken Seals"
        chapter={storyContent[currentChapter]?.title || `Chapter ${currentChapter}`}
      />
      
      <main className="pt-20 container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <CreditsSystem credits={credits} onPurchase={handlePurchaseCredits} />
        </div>
        
        {activeTab === 'story' && (
          <div className="max-w-4xl mx-auto">
            <StorySection
              title={storyContent[currentChapter]?.title || "To Be Continued..."}
              content={storyContent[currentChapter]?.content || "You've reached a pivotal moment in your journey. The truth about the demons, the gods, and your own family's legacy has shattered everything you thought you knew. Standing in Diyu with the Demon Prince beside you and the fate of two worlds in your hands, you must choose: Will you help break the divine chains and free the trapped souls, knowing it might endanger humanity? Will you find another way to save both worlds? Or will you trust in the bonds you've forged with Marcus and Hayes to find a solution together? The choice is yours, and the consequences will reshape the very fabric of reality. Your story continues in the next chapter of Portal Hearts..."}
              image={storyContent[currentChapter]?.image || brokenSealsBg}
              choices={storyContent[currentChapter]?.choices || []}
              onChoice={handleChoice}
              onBack={() => setShowChapterList(true)}
            />
          </div>
        )}

          {activeTab === 'characters' && (
            <CharacterPage 
              characters={characters} 
              onCharacterSelect={handleCharacterSelect}
            />
          )}

          {activeTab === 'bestiary' && (
            <DemonBestiary encounteredDemons={encounteredDemons} />
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
