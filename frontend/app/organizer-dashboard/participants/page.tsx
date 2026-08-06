"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { ChevronLeft, Search, User, Users, Filter } from "lucide-react";

const MOCK_PARTICIPANTS = [
  { id: "1", name: "John Mwangi", team: "Kasarani Spikers", status: "Confirmed" },
  { id: "2", name: "Mary Akinyi", team: "Umoja Warriors", status: "Pending" },
  { id: "3", name: "Brian Otieno", team: "South B All Stars", status: "Confirmed" },
  { id: "4", name: "Denis Kariuki", team: "Thika Road Warriors", status: "Confirmed" },
  { id: "5", name: "James Ngugi", team: "Eastlands Eagles", status: "Pending" },
];

export default function ParticipantsPage() {
  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/organizer-dashboard" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <div className="flex items-center gap-2">
          <Users size={18} className="text-vball-blue" />
          <span className="font-semibold text-vball-navy text-sm">Participants</span>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search participants..." 
              className="w-full bg-white rounded-xl border border-gray-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vball-blue"
            />
          </div>
          <button className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-600 hover:bg-vball-bg transition-colors">
            <Filter size={18} />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["All", "Confirmed", "Pending", "Waitlist"].map((tab) => (
            <button key={tab} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${tab === "All" ? "bg-vball-blue text-white" : "bg-white border border-gray-200 text-gray-600"}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {MOCK_PARTICIPANTS.map((participant) => (
            <Card key={participant.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-vball-bg rounded-full flex items-center justify-center text-vball-navy font-bold text-xs">
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-vball-navy text-sm">{participant.name}</p>
                  <p className="text-xs text-gray-500">{participant.team}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2.5 py-1 rounded-full ${participant.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {participant.status}
              </span>
            </Card>
          ))}
        </div>

      </main>

      <BottomNav />
    </div>
  );
}