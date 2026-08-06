"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { Plus, Edit2, Trash2, Calendar, MapPin, Upload } from "lucide-react";

const MOCK_MY_POSTERS = [
  { id: "1", title: "Kasarani Open 2025", date: "15-17 May", venue: "Kasarani Indoor Arena", image: "🏐" },
  { id: "2", title: "Umoja Cup 2025", date: "22-24 Aug", venue: "Umoja Sports Grounds", image: "🏆" },
];

export default function ManagePostersPage() {
  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-vball-navy">My Posters</h1>
          <span className="text-xs bg-vball-blue/10 text-vball-blue px-2 py-0.5 rounded-full">{MOCK_MY_POSTERS.length}</span>
        </div>
        <Link href="/posters/create">
          <Button size="sm" className="gap-1.5">
            <Plus size={16} /> New Poster
          </Button>
        </Link>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        {/* Upload New Area */}
        <Card className="border-dashed border-2 border-gray-300 bg-vball-bg p-8 text-center space-y-3">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-soft">
            <Upload size={24} className="text-vball-blue" />
          </div>
          <div>
            <p className="font-semibold text-vball-navy text-sm">Upload a new poster</p>
            <p className="text-xs text-gray-500">PNG, JPG, or PSD. Max 5MB.</p>
          </div>
          <Button variant="secondary" size="sm">Choose File</Button>
        </Card>

        {/* My Posters List */}
        <div className="space-y-3">
          {MOCK_MY_POSTERS.map((poster) => (
            <Card key={poster.id} className="flex gap-3 p-3 items-center">
              <div className="w-16 h-20 bg-gradient-to-br from-vball-blue to-vball-navy rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                {poster.image}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-vball-navy text-sm line-clamp-1">{poster.title}</h3>
                <p className="text-[10px] text-gray-500 flex items-center gap-1">
                  <Calendar size={12} /> {poster.date}
                </p>
                <p className="text-[10px] text-gray-500 flex items-center gap-1">
                  <MapPin size={12} /> {poster.venue}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <button className="p-1.5 hover:bg-vball-bg rounded-lg transition-colors">
                  <Edit2 size={16} className="text-vball-blue" />
                </button>
                <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </Card>
          ))}
        </div>

      </main>

      <BottomNav />
    </div>
  );
}