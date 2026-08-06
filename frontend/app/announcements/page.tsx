"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { Plus, Calendar, User, ChevronRight, Megaphone, MapPin, Trophy, Info } from "lucide-react";

const MOCK_ANNOUNCEMENTS = [
  {
    id: "1",
    title: "Kasarani Open 2025 – New Dates Confirmed!",
    content: "The Kasarani Open 2025 has been rescheduled to take place from 15 – 17 May 2025 at Kasarani Indoor Arena.",
    category: "Update",
    author: "Organizer",
    date: "May 10, 2025",
    icon: <Megaphone size={20} className="text-vball-blue" />,
    bgColor: "bg-blue-50"
  },
  {
    id: "2",
    title: "New Venue for South B Tournament",
    content: "The South B Tournament will now be held at South B Grounds instead of the original venue.",
    category: "Venue",
    author: "Organizer",
    date: "May 8, 2025",
    icon: <MapPin size={20} className="text-green-600" />,
    bgColor: "bg-green-50"
  },
  {
    id: "3",
    title: "DC Volleyball League Registration Open",
    content: "Registration for the DC Volleyball League is now open! Sign up before May 20, 2025.",
    category: "General",
    author: "Admin",
    date: "May 7, 2025",
    icon: <Info size={20} className="text-vball-yellow" />,
    bgColor: "bg-yellow-50"
  },
  {
    id: "4",
    title: "Kasarani Spikers Win Thriller Against Umoja Warriors",
    content: "Kasarani Spikers edged Umoja Warriors 3-2 in a thrilling contest at Kasarani Indoor Arena.",
    category: "Match Result",
    author: "Organizer",
    date: "May 6, 2025",
    icon: <Trophy size={20} className="text-red-500" />,
    bgColor: "bg-red-50"
  },
];

const CATEGORY_COLORS = {
  "Update": "bg-blue-100 text-blue-700",
  "Venue": "bg-green-100 text-green-700",
  "General": "bg-yellow-100 text-yellow-700",
  "Match Result": "bg-red-100 text-red-700",
  "Community": "bg-purple-100 text-purple-700",
};

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-vball-yellow rounded-lg flex items-center justify-center text-vball-navy font-bold text-xs">
            <Megaphone size={16} />
          </div>
          <h1 className="text-lg font-bold text-vball-navy">Announcements</h1>
        </div>
        <Link href="/announcements/create">
          <Button size="sm" className="gap-1.5">
            <Plus size={16} /> New
          </Button>
        </Link>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["All", "Updates", "Venues", "Results", "General"].map((tab) => (
            <button key={tab} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${tab === "All" ? "bg-vball-blue text-white" : "bg-white border border-gray-200 text-gray-600"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Announcements List */}
        <div className="space-y-3">
          {MOCK_ANNOUNCEMENTS.map((announcement) => (
            <Link key={announcement.id} href={`/announcements/${announcement.id}`} className="block">
              <Card className="p-4 hover:shadow-soft transition-shadow border-l-4 border-l-vball-blue flex gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${announcement.bgColor}`}>
                  {announcement.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[announcement.category as keyof typeof CATEGORY_COLORS] || "bg-gray-100 text-gray-700"}`}>
                      {announcement.category}
                    </span>
                    <span className="text-[10px] text-gray-400">{announcement.date}</span>
                  </div>
                  <h3 className="font-bold text-vball-navy text-sm line-clamp-1">{announcement.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">{announcement.content}</p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-vball-blue font-medium">
                    Read More <ChevronRight size={12} />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

      </main>

      <BottomNav />
    </div>
  );
}