"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BottomNav } from "@/components/home/BottomNav";
import { TournamentCard } from "@/components/home/TournamentCard";
import { PosterCard } from "@/components/home/PosterCard";
import { useNotificationStore } from "@/store/notificationStore";

// Mock Data
const MOCK_TOURNAMENTS = [
  { id: "1", title: "Kasarani Open 2025", date: "15 - 17 May", venue: "Kasarani Indoor Arena", teams: 12 },
  { id: "2", title: "Umoja Cup 2025", date: "22 - 24 August", venue: "Umoja Sports Grounds", teams: 8 },
  { id: "3", title: "Eastlands Championship", date: "10 - 12 October", venue: "Pumwani Grounds", teams: 10 },
];

const MOCK_POSTERS = [
  { id: "1", title: "Kayole Fest" },
  { id: "2", title: "South B Cup" },
  { id: "3", title: "Ruiru Open" },
];

export default function HomePage() {
  const { unreadCount } = useNotificationStore();

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      
      {/* --- Top Header with Notification Bell --- */}
      <header className="sticky top-0 z-40 bg-vball-navy text-white px-4 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-10 h-10 bg-vball-yellow rounded-xl flex items-center justify-center text-vball-navy font-bold text-[10px] leading-tight text-center shadow-lg">
            VM<br/>NBO
          </div>
          <span className="font-bold text-base tracking-tight hidden sm:block">Volleyball Mtaa</span>
        </div>
        <div className="flex gap-2">
          <Link href="/search" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <Search size={20} />
          </Link>
          <Link href="/notifications" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors relative">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[8px] flex items-center justify-center border-2 border-vball-navy font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-6 max-w-md mx-auto pb-4">
        
        {/* 1. Hero Banner */}
        <section className="relative rounded-2xl overflow-hidden h-44 bg-gradient-to-r from-vball-blue to-vball-navy shadow-md">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* FIXED: Valid Unsplash image URL */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="relative z-10 p-5 flex flex-col justify-between h-full text-white">
            <div>
              <h2 className="text-xl font-bold">Welcome to the Movement</h2>
              <p className="text-sm opacity-90">Discover tournaments, connect with players.</p>
            </div>
            <div className="flex gap-3 mt-2">
              <Button variant="secondary" className="text-xs px-4 py-2 h-8 font-bold">Explore Tournaments</Button>
              <Button variant="outline" className="text-xs px-4 py-2 h-8 border-white text-white">View Calendar</Button>
            </div>
          </div>
        </section>

        {/* 2. Upcoming Tournaments */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg text-vball-navy">Upcoming Tournaments</h3>
            <Link href="/calendar" className="text-sm text-vball-blue flex items-center hover:underline">
              See All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {MOCK_TOURNAMENTS.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <TournamentCard {...t} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. Latest Posters (Horizontal Scroll) */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg text-vball-navy">Latest Posters</h3>
            <Link href="/posters" className="text-sm text-vball-blue flex items-center hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
            {MOCK_POSTERS.map((p) => (
              <PosterCard key={p.id} {...p} />
            ))}
          </div>
        </section>

        {/* 4. Announcements Banner */}
        <section className="bg-vball-yellow/10 border border-vball-yellow/30 rounded-xl p-4 flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-bold text-vball-navy text-sm">📢 Organizer Announcements</h4>
            <p className="text-xs text-gray-600 truncate max-w-[180px]">
              Kasarani Open 2025 dates confirmed! Registration closes May 10th.
            </p>
          </div>
          <Link href="/announcements">
            <Button variant="secondary" className="text-xs px-4 py-2 h-8 font-bold">Read</Button>
          </Link>
        </section>

        {/* 5. Quick Stats */}
        <section className="grid grid-cols-3 gap-3 bg-white p-4 rounded-xl shadow-card border border-gray-100">
          <div className="text-center">
            <p className="font-bold text-vball-blue text-lg">500+</p>
            <p className="text-[10px] text-gray-500">Tournaments</p>
          </div>
          <div className="text-center border-l border-r border-gray-100">
            <p className="font-bold text-vball-blue text-lg">10K+</p>
            <p className="text-[10px] text-gray-500">Members</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-vball-blue text-lg">12</p>
            <p className="text-[10px] text-gray-500">Months Active</p>
          </div>
        </section>

        {/* 6. Calendar Preview (Keys Fixed) */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg text-vball-navy">This Month's Events</h3>
            <Link href="/calendar" className="text-sm text-vball-blue flex items-center hover:underline">
              Full Calendar <ChevronRight size={16} />
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
              <span className="font-bold text-sm">May 2025</span>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 bg-vball-bg rounded-md text-gray-600">&lt;</span>
                <span className="px-2 py-1 bg-vball-bg rounded-md text-gray-600">&gt;</span>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {/* FIXED: Unique keys using full day names */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="py-1 font-semibold text-gray-400">{d[0]}</div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i} className={`py-1.5 rounded-full ${i === 14 ? 'bg-vball-yellow font-bold text-vball-navy' : 'text-gray-600 hover:bg-vball-bg'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* --- Bottom Navigation --- */}
      <BottomNav />
    </div>
  );
}