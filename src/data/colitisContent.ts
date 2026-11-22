export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  source: string;
  body: string;
  tags: string[];
}

export interface SuggestionInput {
  title: string;
  body: string;
  category: string;
}

interface SavedSuggestion extends SuggestionInput {
  id: string;
  createdAt: string;
}

interface LocalStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const SUGGESTIONS_STORAGE_KEY = 'colitis-gourmet-planner:suggestions:v1';

export const FAQS: FaqEntry[] = [
  {
    id: 'app-purpose',
    category: 'Using the app',
    question: 'What is Colitis Gourmet Planner for?',
    answer: 'It helps you plan meals, keep a shopping list and record your own food preferences in one place. It is an organiser, not a diagnostic tool or a personalised medical nutrition plan.',
  },
  {
    id: 'medical-advice',
    category: 'Food and wellbeing',
    question: 'Does the planner replace advice from my IBD team or dietitian?',
    answer: 'No. Crohn’s and colitis affect people differently. Use the planner to organise your own choices and questions, and speak with your GP, IBD team or registered dietitian before making significant dietary changes.',
  },
  {
    id: 'food-triggers',
    category: 'Food and wellbeing',
    question: 'Will the app tell me which foods are safe for everyone?',
    answer: 'No single food list works for everyone with Crohn’s or colitis. You can record your own preferences, but the app does not label foods as universally safe or unsafe.',
  },
  {
    id: 'local-data',
    category: 'Privacy and data',
    question: 'Where is my meal plan and shopping list saved?',
    answer: 'Your planner profile, meal plan, shopping list and preferences are saved in this browser’s local storage on this device. They are not synced to a Colitis cloud account.',
  },
  {
    id: 'multiple-devices',
    category: 'Privacy and data',
    question: 'Can I automatically sync my plan between devices?',
    answer: 'Not at the moment. Each browser or installed app keeps its own local copy. If you clear this app’s or browser’s site data, locally saved information may be deleted.',
  },
  {
    id: 'offline',
    category: 'Using the app',
    question: 'Does every part of the app work without an internet connection?',
    answer: 'Your saved planner information is stored locally. External support links need an internet connection, and this version does not provide cloud backup or cross-device sync.',
  },
];

export const RESOURCES: Resource[] = [
  {
    id: 'nhs-ibd',
    title: 'NHS: Inflammatory bowel disease',
    category: 'NHS',
    description: 'An overview of IBD, symptoms, treatment and when to seek help.',
    url: 'https://www.nhs.uk/conditions/inflammatory-bowel-disease/',
    source: 'NHS',
    body: 'Use this NHS overview for general information about inflammatory bowel disease. For personal medical advice, contact your GP or IBD team.',
    tags: ['IBD', 'overview', 'treatment', 'symptoms'],
  },
  {
    id: 'nhs-ulcerative-colitis',
    title: 'NHS: Ulcerative colitis',
    category: 'NHS',
    description: 'Information about ulcerative colitis, ongoing care and living with the condition.',
    url: 'https://www.nhs.uk/conditions/ulcerative-colitis/',
    source: 'NHS',
    body: 'The NHS explains that ulcerative colitis affects everyone differently and recommends discussing food diary observations and dietary changes with your care team.',
    tags: ['ulcerative colitis', 'care', 'food diary'],
  },
  {
    id: 'nhs-crohns',
    title: 'NHS: Crohn’s disease',
    category: 'NHS',
    description: 'Symptoms, diagnosis, treatment and practical information about Crohn’s disease.',
    url: 'https://www.nhs.uk/conditions/crohns-disease/',
    source: 'NHS',
    body: 'Crohn’s disease can affect different parts of the digestive system. The NHS advises getting individual dietary guidance from your healthcare team.',
    tags: ['Crohn’s', 'treatment', 'nutrition'],
  },
  {
    id: 'ccuk-food',
    title: 'Crohn’s & Colitis UK: Food',
    category: 'Charity',
    description: 'Evidence-based information about food, nutrition and individual differences.',
    url: 'https://www.crohnsandcolitis.org.uk/info-support/information-about-crohns-and-colitis/all-information-about-crohns-and-colitis/living-with-crohns-or-colitis/food',
    source: 'Crohn’s & Colitis UK',
    body: 'The charity explains that there is no single diet that works for everyone and recommends speaking with an IBD team or dietitian before major dietary changes.',
    tags: ['food', 'diet', 'nutrition', 'dietitian'],
  },
  {
    id: 'ccuk-helpline',
    title: 'Crohn’s & Colitis UK: Helpline',
    category: 'Charity',
    description: 'Confidential information and support by phone, email and live chat.',
    url: 'https://www.crohnsandcolitis.org.uk/info-support/support-for-you/helpline-service',
    source: 'Crohn’s & Colitis UK',
    body: 'The helpline provides information and support, not individual medical advice. Its published phone number is 0300 222 5700. Check the website for current opening hours and contact options.',
    tags: ['helpline', 'support', 'phone', 'community'],
  },
];

export function filterResources(items: Resource[], query: string, category = 'All'): Resource[] {
  const needle = query.trim().toLocaleLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const searchable = [item.title, item.description, item.category, item.source, ...item.tags].join(' ').toLocaleLowerCase();
    return matchesCategory && (!needle || searchable.includes(needle));
  });
}

export function saveSuggestion(input: SuggestionInput, storage?: LocalStorageLike): boolean {
  try {
    const target = storage ?? window.localStorage;
    const title = input.title.trim();
    if (!title) return false;

    let existing: SavedSuggestion[] = [];
    try {
      const raw = target.getItem(SUGGESTIONS_STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) existing = parsed as SavedSuggestion[];
    } catch {
      existing = [];
    }

    const saved: SavedSuggestion = {
      id: globalThis.crypto.randomUUID(),
      title,
      body: input.body.trim(),
      category: input.category,
      createdAt: new Date().toISOString(),
    };
    target.setItem(SUGGESTIONS_STORAGE_KEY, JSON.stringify([saved, ...existing].slice(0, 100)));
    return true;
  } catch {
    return false;
  }
}
