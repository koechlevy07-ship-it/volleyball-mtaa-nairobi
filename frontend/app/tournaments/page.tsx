"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BottomNav } from "@/components/home/BottomNav";
import { TournamentCard } from "@/components/home/TournamentCard";
import { Plus, Filter } from "lucide-react";

const MOCK_TOURNAMENTS = [
  { id: "1", title: "Kasarani Open 2025", date: "15 - 17 May", venue: "Kasarani Indoor Arena", teams: 12 },
  { id: "2", title: "Umoja Cup 2025", date: "22 - 24 August", venue: "Umoja Sports Grounds", teams: 8 },
  { id: "3", title: "Eastlands Championship", date: "10 - 12 October", venue: "Pumwani Grounds", teams: 10 },
  { id: "4", title: "Kayole Volleyball Fest", date: "5 - 7 June", venue: "Kayole Grounds", teams: 6 },
  { id: "5", title: "South B Tournament", date: "19 - 21 July", venue: "South B Grounds", teams: 14 },
];

export default function TournamentsPage() {
  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-vball-navy">Tournaments</h1>
        <Link href="/tournaments/create">
          <Button size="sm" className="gap-1.5">
            <Plus size={16} /> Create
          </Button>
        </Link>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["All", "Upcoming", "Live", "Completed"].map((tab) => (
            <button key={tab} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${tab === "All" ? "bg-vball-blue text-white" : "bg-white border border-gray-200 text-gray-600"}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {MOCK_TOURNAMENTS.map((t) => (
            <TournamentCard key={t.id} {...t} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}