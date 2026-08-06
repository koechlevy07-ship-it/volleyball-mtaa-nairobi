"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { Plus, Calendar, MapPin, Heart, Share2 } from "lucide-react";

const MOCK_POSTERS = [
  { id: "1", title: "Kasarani Open 2025", date: "15-17 May", venue: "Kasarani Indoor Arena", image: "🏐", likes: 124 },
  { id: "2", title: "Umoja Cup 2025", date: "22-24 Aug", venue: "Umoja Sports Grounds", image: "🏆", likes: 98 },
  { id: "3", title: "Eastlands Championship", date: "10-12 Oct", venue: "Pumwani Grounds", image: "🔥", likes: 74 },
  { id: "4", title: "Kayole Volleyball Fest", date: "5-7 Jun", venue: "Kayole Grounds", image: "🎉", likes: 56 },
  { id: "5", title: "South B Tournament", date: "19-21 Jul", venue: "South B Grounds", image: "⚡", likes: 89 },
  { id: "6", title: "Donholm League", date: "15-17 Sep", venue: "Donholm Sports Club", image: "🏅", likes: 45 },
];

export default function PostersPage() {
  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-vball-navy">Posters</h1>
          <span className="text-xs bg-vball-blue/10 text-vball-blue px-2 py-0.5 rounded-full">6</span>
        </div>
        <Link href="/posters/manage">
          <Button size="sm" className="gap-1.5">
            <Plus size={16} /> Manage
          </Button>
        </Link>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["All", "Upcoming", "Past", "Featured"].map((tab) => (
            <button key={tab} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${tab === "All" ? "bg-vball-blue text-white" : "bg-white border border-gray-200 text-gray-600"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid (2 columns) */}
        <div className="grid grid-cols-2 gap-3">
          {MOCK_POSTERS.map((poster) => (
            <Link key={poster.id} href={`/posters/${poster.id}`} className="block">
              <Card className="p-3 hover:shadow-soft transition-shadow group relative overflow-hidden">
                {/* Poster Image Placeholder */}
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-vball-blue to-vball-navy rounded-xl flex items-center justify-center text-6xl mb-2">
                  {poster.image}
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-bold text-vball-navy text-sm leading-tight line-clamp-1">{poster.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <Calendar size={12} /> {poster.date}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <MapPin size={12} /> {poster.venue}
                  </div>
                </div>

                {/* Overlay Actions on Hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button className="bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-vball-yellow transition-colors">
                    <Heart size={14} className="text-gray-700" />
                  </button>
                  <button className="bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-vball-yellow transition-colors">
                    <Share2 size={14} className="text-gray-700" />
                  </button>
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