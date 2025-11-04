import { MotivationalQuote, StudyTip, Language } from "../types";

export const motivationalQuotes: MotivationalQuote[] = [
  // English
  {
    id: "1",
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    language: "en",
  },
  {
    id: "2",
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    language: "en",
  },
  {
    id: "3",
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    language: "en",
  },
  {
    id: "4",
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    language: "en",
  },
  {
    id: "5",
    text: "Believe you can and you are halfway there.",
    author: "Theodore Roosevelt",
    language: "en",
  },
  {
    id: "6",
    text: "In a world where you can be anything, be kind.",
    author: "Big Life Journal",
    language: "en",
  },
  {
    id: "7",
    text: "Mistakes are proof that you are trying.",
    author: "Big Life Journal",
    language: "en",
  },
  {
    id: "8",
    text: "The parent we are matters more than the parent we think we should be.",
    author: "Dr. Shefali Tsabary",
    language: "en",
  },
  {
    id: "9",
    text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "Albert Einstein",
    language: "en",
  },
  {
    id: "10",
    text: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
    language: "en",
  },
  // Spanish
  {
    id: "11",
    text: "El futuro pertenece a quienes creen en la belleza de sus sueños.",
    author: "Eleanor Roosevelt",
    language: "es",
  },
  {
    id: "12",
    text: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.",
    author: "Nelson Mandela",
    language: "es",
  },
  // French
  {
    id: "13",
    text: "L'avenir appartient à ceux qui croient en la beauté de leurs rêves.",
    author: "Eleanor Roosevelt",
    language: "fr",
  },
  // Add more languages as needed
];

export const studyTips: StudyTip[] = [
  // English
  {
    id: "1",
    title: "The Pomodoro Technique",
    description: "Study for 25 minutes, then take a 5-minute break. After four sessions, take a longer 15-30 minute break.",
    category: "Time Management",
    language: "en",
  },
  {
    id: "2",
    title: "Active Recall",
    description: "Test yourself regularly instead of just re-reading notes. This strengthens memory retention.",
    category: "Study Methods",
    language: "en",
  },
  {
    id: "3",
    title: "Spaced Repetition",
    description: "Review material at increasing intervals over time to improve long-term retention.",
    category: "Memory",
    language: "en",
  },
  {
    id: "4",
    title: "Create a Study Space",
    description: "Designate a specific area for studying to help your brain associate that space with focus and productivity.",
    category: "Environment",
    language: "en",
  },
  {
    id: "5",
    title: "Take Regular Breaks",
    description: "Your brain needs rest to process information. Stand up, stretch, and give your mind a break.",
    category: "Wellness",
    language: "en",
  },
  {
    id: "6",
    title: "Stay Hydrated",
    description: "Drink water regularly. Even mild dehydration can affect concentration and cognitive function.",
    category: "Wellness",
    language: "en",
  },
  {
    id: "7",
    title: "Sleep Well",
    description: "Get 7-9 hours of sleep. Sleep is crucial for memory consolidation and learning.",
    category: "Wellness",
    language: "en",
  },
  {
    id: "8",
    title: "Teach Someone Else",
    description: "Explaining concepts to others helps you understand them better and identify gaps in your knowledge.",
    category: "Study Methods",
    language: "en",
  },
  {
    id: "9",
    title: "Use Mind Maps",
    description: "Create visual diagrams to connect ideas and see the big picture of complex topics.",
    category: "Study Methods",
    language: "en",
  },
  {
    id: "10",
    title: "Eliminate Distractions",
    description: "Put your phone away and use website blockers to stay focused during study sessions.",
    category: "Focus",
    language: "en",
  },
  // Spanish
  {
    id: "11",
    title: "La Técnica Pomodoro",
    description: "Estudia durante 25 minutos, luego toma un descanso de 5 minutos. Después de cuatro sesiones, toma un descanso más largo de 15-30 minutos.",
    category: "Gestión del tiempo",
    language: "es",
  },
  {
    id: "12",
    title: "Recuerdo Activo",
    description: "Ponte a prueba regularmente en lugar de solo releer tus notas. Esto fortalece la retención de memoria.",
    category: "Métodos de estudio",
    language: "es",
  },
  // French
  {
    id: "13",
    title: "La Technique Pomodoro",
    description: "Étudiez pendant 25 minutes, puis prenez une pause de 5 minutes. Après quatre sessions, prenez une pause plus longue de 15-30 minutes.",
    category: "Gestion du temps",
    language: "fr",
  },
  // Add more languages as needed
];

export const getRandomQuote = (language: Language): MotivationalQuote => {
  const quotesInLanguage = motivationalQuotes.filter((q) => q.language === language);
  const quotes = quotesInLanguage.length > 0 ? quotesInLanguage : motivationalQuotes.filter((q) => q.language === "en");
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const getRandomTip = (language: Language): StudyTip => {
  const tipsInLanguage = studyTips.filter((t) => t.language === language);
  const tips = tipsInLanguage.length > 0 ? tipsInLanguage : studyTips.filter((t) => t.language === "en");
  return tips[Math.floor(Math.random() * tips.length)];
};
