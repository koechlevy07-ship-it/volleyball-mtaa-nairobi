export interface Tournament {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  venue: string;
  location?: string;
  startDate: string;
  endDate?: string;
  maxTeams?: number;
  entryFee?: number | string;
  prizePool?: number | string;
  status?: string;
  category?: string;
  comments?: number;
  saves?: number;
  views?: number;
}

export const getTournamentId = (t: Tournament) => t._id || t.id || t.title;

export const getDateParts = (iso: string) => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return { day: "--", month: "---" };
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
  };
};

export const getStartDate = (t: Tournament) => new Date(t.startDate);

export const AREAS = [
  "Nairobi",
  "Juja",
  "Thika",
  "Ruiru",
  "Rongai",
  "Kitengela",
  "Syokimau",
  "Athi River",
] as const;

export const matchArea = (t: Tournament, area: string) => {
  if (area === "All") return true;
  const haystack = `${t.location ?? ""} ${t.venue ?? ""} ${t.title ?? ""}`.toLowerCase();
  return haystack.includes(area.toLowerCase());
};

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: "mock-1",
    title: "Kasarani Open Championship",
    venue: "Kasarani Indoor Arena",
    location: "Nairobi",
    startDate: "2026-08-14T09:00:00.000Z",
    endDate: "2026-08-16T18:00:00.000Z",
    maxTeams: 16,
    entryFee: "KES 2,500",
    prizePool: "KES 120,000",
    status: "Live",
    category: "Open",
    comments: 34,
    saves: 128,
    views: 2400,
  },
  {
    id: "mock-2",
    title: "Juja Estates Street Cup",
    venue: "Juja Grounds",
    location: "Juja",
    startDate: "2026-08-21T09:00:00.000Z",
    maxTeams: 8,
    entryFee: "KES 1,000",
    prizePool: "KES 25,000",
    status: "Approved",
    comments: 12,
    saves: 45,
  },
  {
    id: "mock-3",
    title: "Thika Classic 6s",
    venue: "Thika Stadium",
    location: "Thika",
    startDate: "2026-08-28T10:00:00.000Z",
    maxTeams: 12,
    entryFee: "KES 1,500",
    prizePool: "KES 40,000",
    status: "Approved",
    comments: 8,
    saves: 62,
  },
  {
    id: "mock-4",
    title: "Ruiru Sunset League",
    venue: "Ruiru Sports Club",
    location: "Ruiru",
    startDate: "2026-09-05T15:00:00.000Z",
    maxTeams: 10,
    entryFee: "KES 1,200",
    prizePool: "KES 30,000",
    status: "Pending",
    comments: 5,
    saves: 23,
  },
  {
    id: "mock-5",
    title: "Rongai Mini Volley Fest",
    venue: "Rongai School Courts",
    location: "Rongai",
    startDate: "2026-09-12T08:00:00.000Z",
    maxTeams: 6,
    entryFee: "KES 800",
    prizePool: "KES 15,000",
    status: "Pending",
    comments: 3,
    saves: 18,
  },
  {
    id: "mock-6",
    title: "Kitengela Weekend Open",
    venue: "Kitengela Town Courts",
    location: "Kitengela",
    startDate: "2026-09-19T09:00:00.000Z",
    maxTeams: 8,
    entryFee: "KES 1,000",
    prizePool: "KES 20,000",
    status: "Draft",
    comments: 2,
    saves: 9,
  },
  {
    id: "mock-7",
    title: "Syokimau Community Cup",
    venue: "Syokimau Grounds",
    location: "Syokimau",
    startDate: "2026-09-26T10:00:00.000Z",
    maxTeams: 10,
    entryFee: "KES 1,500",
    prizePool: "KES 35,000",
    status: "Pending",
    comments: 6,
    saves: 31,
  },
  {
    id: "mock-8",
    title: "Athi River Grass Court Open",
    venue: "Athi River Sports Park",
    location: "Athi River",
    startDate: "2026-10-03T09:00:00.000Z",
    maxTeams: 12,
    entryFee: "KES 2,000",
    prizePool: "KES 50,000",
    status: "Approved",
    comments: 15,
    saves: 77,
  },
];

export const FEATURED_FALLBACK: Tournament = MOCK_TOURNAMENTS[0];

export interface Poster {
  id: string;
  title: string;
  organizer: string;
  time: string;
  location: string;
  likes: number;
  comments: number;
  caption: string;
  gradient: string;
}

export const MOCK_POSTERS: Poster[] = [
  {
    id: "1",
    title: "Kayole Fest",
    organizer: "Kayole Volleyball Club",
    time: "2h",
    location: "Nairobi",
    likes: 214,
    comments: 18,
    caption: "Kayole Fest returns! 16 teams, 3 days of pure energy. Register your squad today.",
    gradient: "from-vball-yellow to-vball-blue",
  },
  {
    id: "2",
    title: "South B Cup",
    organizer: "South B Sports Initiative",
    time: "5h",
    location: "Nairobi",
    likes: 168,
    comments: 11,
    caption: "The South B Cup is back. Get your team in before slots fill up.",
    gradient: "from-vball-blue to-vball-navy",
  },
  {
    id: "3",
    title: "Ruiru Open",
    organizer: "Ruiru Volleyball Association",
    time: "8h",
    location: "Ruiru",
    likes: 132,
    comments: 9,
    caption: "Sunset volleyball at its finest. Ruiru Open welcomes all levels.",
    gradient: "from-vball-navy via-vball-blue to-vball-yellow",
  },
];

export interface Announcement {
  id: string;
  title: string;
  body: string;
  time: string;
  pinned?: boolean;
  category: string;
}

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "Kasarani Open 2026 dates confirmed",
    body: "Registration closes 31st July. Playoffs move to Sunday morning — full schedule posted in the room.",
    time: "30m",
    pinned: true,
    category: "Tournament",
  },
  {
    id: "2",
    title: "New chat rooms unlocked",
    body: "Rongai, Kitengela, Syokimau and Athi River rooms are now live. Find players near your estate.",
    time: "2h",
    category: "Community",
  },
  {
    id: "3",
    title: "Rule update: substitution window",
    body: "Teams now get 3 substitution windows per set. Read the full rules before the weekend.",
    time: "6h",
    category: "Rules",
  },
];

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  online: number;
  members: number;
  gradient: string;
  href: string;
}

export const MOCK_CHAT_ROOMS: ChatRoom[] = [
  {
    id: "chat-1",
    name: "Kasarani Open 2026",
    lastMessage: "Kevin: Squad list confirmed, see you at the arena 🔥",
    time: "2m",
    online: 12,
    members: 48,
    gradient: "from-vball-blue to-vball-navy",
    href: "/chat",
  },
  {
    id: "chat-2",
    name: "Mtaa Players Lounge",
    lastMessage: "Mwende: Who is training at Juja this Saturday?",
    time: "8m",
    online: 27,
    members: 120,
    gradient: "from-vball-navy to-vball-blue",
    href: "/chat",
  },
  {
    id: "chat-3",
    name: "Eastlands Pickup Games",
    lastMessage: "Otieno: Need 2 setters for Kayole Fest team",
    time: "15m",
    online: 9,
    members: 64,
    gradient: "from-vball-yellow to-vball-navy",
    href: "/chat",
  },
  {
    id: "chat-4",
    name: "Ruiru Sunset League",
    lastMessage: "Nyambura: Game times posted for the weekend",
    time: "1h",
    online: 5,
    members: 36,
    gradient: "from-vball-blue to-[#0072c6]",
    href: "/chat",
  },
];

export interface Discussion {
  id: string;
  topic: string;
  replies: number;
  lastActive: string;
  hot?: boolean;
  tag: string;
}

export const MOCK_DISCUSSIONS: Discussion[] = [
  {
    id: "d1",
    topic: "Best way to practice jump serve at home?",
    replies: 34,
    lastActive: "5m",
    hot: true,
    tag: "Skills",
  },
  {
    id: "d2",
    topic: "Organising a Rongai vs Kitengela friendly",
    replies: 21,
    lastActive: "24m",
    tag: "Events",
  },
  {
    id: "d3",
    topic: "Kasarani finals — who takes the prize pool?",
    replies: 48,
    lastActive: "1h",
    hot: true,
    tag: "Talk",
  },
];

export interface NearbyEvent {
  id: string;
  title: string;
  venue: string;
  location: string;
  startDate: string;
  attendees: number;
  distance: string;
  gradient: string;
}

export const MOCK_NEARBY: NearbyEvent[] = [
  {
    id: "n1",
    title: "Kasarani Open Championship",
    venue: "Kasarani Indoor Arena",
    location: "Nairobi",
    startDate: "2026-08-14T09:00:00.000Z",
    attendees: 320,
    distance: "4.2 km",
    gradient: "from-vball-blue to-vball-navy",
  },
  {
    id: "n2",
    title: "Dandora Evening Pickup",
    venue: "Dandora Courts",
    location: "Nairobi",
    startDate: "2026-08-09T17:00:00.000Z",
    attendees: 48,
    distance: "6.8 km",
    gradient: "from-vball-yellow to-vball-blue",
  },
  {
    id: "n3",
    title: "Juja Estates Street Cup",
    venue: "Juja Grounds",
    location: "Juja",
    startDate: "2026-08-21T09:00:00.000Z",
    attendees: 95,
    distance: "18.0 km",
    gradient: "from-vball-navy to-vball-blue",
  },
];

export const STATS = [
  { value: "120+", label: "Tournaments", suffix: "hosted & counting" },
  { value: "320", label: "Teams", suffix: "across 8 areas" },
  { value: "12K", label: "Fans", suffix: "on the platform" },
  { value: "40", label: "Chat Rooms", suffix: "active right now" },
];
