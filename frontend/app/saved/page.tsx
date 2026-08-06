"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { TournamentCard } from "@/components/home/TournamentCard";
import { ChevronLeft, Heart } from "lucide-react";

const MOCK_SAVED = [
  { id: "1", title: "Kasarani Open 2025", date: "15 - 17 May", venue: "Kasarani Indoor Arena", teams: 12 },
  { id: "2", title: "Umoja Cup 2025", date: "22 - 24 August", venue: "Umoja Sports Grounds", teams: 8 },
  { id: "3", title: "Eastlands Championship", date: "10 - 12 October", venue: "Pumwani Grounds", teams: 10 },
];

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/profile" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <div className="flex items-center gap-2">
          <Heart size={18} className="text-red-500" />
          <span className="font-semibold text-vball-navy text-sm">Saved Tournaments</span>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-3 max-w-md mx-auto pb-6">
        {MOCK_SAVED.length === 0 ? (
          <Card className="p-8 text-center">
            <Heart size={48} className="text-gray-300 mx-auto mb-2" />
            <p className="text-vball-navy font-semibold">No saved tournaments yet</p>
            <p className="text-xs text-gray-500">Tap the heart on any tournament to save it here.</p>
            <Link href="/calendar">
              <Button variant="secondary" className="mt-3">Browse Tournaments</Button>
            </Link>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {MOCK_SAVED.map((t) => (
              <TournamentCard key={t.id} {...t} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}