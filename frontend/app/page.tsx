"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell } from "lucide-react";
import axios from "axios";
import { useNotificationStore } from "@/store/notificationStore";
import { BottomNav } from "@/components/home/BottomNav";
import { Hero } from "@/components/home/Hero";
import { FeaturedTournament } from "@/components/home/FeaturedTournament";
import { UpcomingCarousel } from "@/components/home/UpcomingCarousel";
import { NearbyEvents } from "@/components/home/NearbyEvents";
import { PostersFeed } from "@/components/home/PostersFeed";
import { AnnouncementsFeed } from "@/components/home/AnnouncementsFeed";
import { ChatRooms } from "@/components/home/ChatRooms";
import { CalendarPreview } from "@/components/home/CalendarPreview";
import { TrendingDiscussions } from "@/components/home/TrendingDiscussions";
import { StatsSection } from "@/components/home/StatsSection";
import { Tournament, FEATURED_FALLBACK } from "@/components/home/data";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://volleyball-mtaa-backend.onrender.com';

export default function HomePage() {
  const { unreadCount } = useNotificationStore();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/tournaments?limit=4&sort=newest`);
        setTournaments(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
        setTournaments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  const featured = tournaments[0] ?? FEATURED_FALLBACK;

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      {/* --- Top Header --- */}
      <header className="sticky top-0 z-40 bg-vball-navy text-white px-4 pt-safe shadow-md">
        <div className="flex items-center justify-between py-3 max-w-md mx-auto">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-vball-yellow text-vball-navy font-black text-[9px] leading-tight text-center shadow-lg">
              VM
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-white" />
              </span>
            </div>
            <span className="font-bold text-base tracking-tight">
              Volleyball Mtaa
              <span className="block text-[9px] font-semibold tracking-widest text-vball-yellow uppercase">Nairobi</span>
            </span>
          </Link>
          <div className="flex gap-2">
            <Link href="/search" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Search">
              <Search size={20} />
            </Link>
            <Link href="/notifications" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors relative" aria-label="Notifications">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[8px] flex items-center justify-center border-2 border-vball-navy font-bold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto space-y-8 px-0 pt-0 pb-4">
        {/* 1. Hero */}
        <Hero />

        <div className="space-y-8 px-4">
          {/* 2. Featured Tournament */}
          <section className="animate-fade-in">
            <FeaturedTournament tournament={featured} loading={loading} />
          </section>

          {/* 3. Upcoming Tournaments (real API + area filter) */}
          <UpcomingCarousel tournaments={tournaments} loading={loading} />

          {/* 4. Nearby Events (Meetup-style) */}
          <NearbyEvents />

          {/* 5. Posters Feed (Instagram-style) */}
          <PostersFeed />

          {/* 6. Announcements (Instagram-style cards) */}
          <AnnouncementsFeed />

          {/* 7. Community Chat Rooms (WhatsApp-style) */}
          <ChatRooms />

          {/* 8. Calendar Preview */}
          <CalendarPreview />

          {/* 9. Trending Discussions */}
          <TrendingDiscussions />

          {/* 10. Statistics */}
          <StatsSection />
        </div>
      </main>

      {/* --- Bottom Navigation --- */}
      <BottomNav />
    </div>
  );
}
