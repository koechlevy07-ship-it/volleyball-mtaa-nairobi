"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { CommentSection } from "@/components/comments/CommentSection";
import { TournamentChat } from "@/components/chat/TournamentChat";
import { 
  Calendar, MapPin, Users, Share2, ChevronLeft, 
  Clock, Trophy, CheckCircle, UserCheck
} from "lucide-react";

export default function TournamentDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock Data - In real app, fetch from API using id
  const tournament = {
    id: "1",
    title: "Kasarani Open 2025",
    date: "15 - 17 May 2025",
    venue: "Kasarani Indoor Arena",
    location: "Kasarani Stadium Complex, Thika Road, Nairobi",
    description: "Kasarani Open is one of Nairobi's biggest volleyball events bringing together top teams from across the city and beyond for a weekend of high-level competition and great vibes.",
    organizer: "Volleyball Mtaa Nairobi",
    category: "Men's Open",
    teams: 12,
    maxTeams: 16,
    entryFee: "KSh 6,000",
    format: "Pool + Knockout",
    status: "Upcoming",
    prizePool: {
      first: "KSh 100,000",
      second: "KSh 50,000",
      third: "KSh 30,000"
    }
  };

  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      {/* --- Back Header --- */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Tournament Details</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        {/* 1. Poster Section */}
        <div className="relative rounded-2xl overflow-hidden h-56 bg-gradient-to-br from-vball-navy to-vball-blue shadow-md">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628779238951-be2c9f25654d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
          <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
            <div>
              <span className="inline-block bg-vball-yellow text-vball-navy text-[10px] font-bold px-3 py-1 rounded-full mb-2">
                {tournament.status}
              </span>
              <h1 className="text-2xl font-bold leading-tight">{tournament.title}</h1>
              <p className="text-sm opacity-90 mt-1">{tournament.organizer}</p>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <Calendar size={14} /> {tournament.date}
              </span>
              <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <MapPin size={14} /> {tournament.venue}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Action Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1" variant="secondary" size="lg">
            <CheckCircle size={18} className="mr-2" /> I'm Interested
          </Button>
          <Button variant="outline" size="lg" className="px-4">
            <Share2 size={18} />
          </Button>
        </div>

        {/* 3. Countdown Timer Card */}
        <Card className="bg-vball-navy text-white border-none">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-sm">Tournament Starts In</h3>
              <p className="text-xs text-gray-400">Get ready for the action!</p>
            </div>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-xs px-3 py-1.5 h-8">
              Set Reminder
            </Button>
          </div>
          <div className="flex gap-4 mt-3 justify-center">
            <div className="text-center">
              <p className="text-3xl font-mono font-bold text-vball-yellow">{String(timeLeft.days).padStart(2, '0')}</p>
              <p className="text-[10px] text-gray-400">Days</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-mono font-bold text-vball-yellow">{String(timeLeft.hours).padStart(2, '0')}</p>
              <p className="text-[10px] text-gray-400">Hours</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-mono font-bold text-vball-yellow">{String(timeLeft.minutes).padStart(2, '0')}</p>
              <p className="text-[10px] text-gray-400">Mins</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-mono font-bold text-vball-yellow">{String(timeLeft.seconds).padStart(2, '0')}</p>
              <p className="text-[10px] text-gray-400">Secs</p>
            </div>
          </div>
        </Card>

        {/* 4. About Tournament */}
        <Card>
          <h3 className="font-bold text-vball-navy text-sm mb-2">About This Tournament</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{tournament.description}</p>
          
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-vball-bg p-3 rounded-xl">
              <p className="text-gray-500">Category</p>
              <p className="font-semibold text-vball-navy">{tournament.category}</p>
            </div>
            <div className="bg-vball-bg p-3 rounded-xl">
              <p className="text-gray-500">Teams</p>
              <p className="font-semibold text-vball-navy">{tournament.teams} / {tournament.maxTeams}</p>
            </div>
            <div className="bg-vball-bg p-3 rounded-xl">
              <p className="text-gray-500">Entry Fee</p>
              <p className="font-semibold text-vball-navy">{tournament.entryFee}</p>
            </div>
            <div className="bg-vball-bg p-3 rounded-xl">
              <p className="text-gray-500">Format</p>
              <p className="font-semibold text-vball-navy">{tournament.format}</p>
            </div>
          </div>
        </Card>

        {/* 5. Prize Pool */}
        <Card>
          <h3 className="font-bold text-vball-navy text-sm mb-2">🏆 Prize Pool</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="flex items-center gap-2"><Trophy size={16} className="text-vball-yellow" /> 1st Place</span>
              <span className="font-bold text-vball-navy">{tournament.prizePool.first}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="flex items-center gap-2"><Trophy size={16} className="text-gray-400" /> 2nd Place</span>
              <span className="font-bold text-vball-navy">{tournament.prizePool.second}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2"><Trophy size={16} className="text-orange-400" /> 3rd Place</span>
              <span className="font-bold text-vball-navy">{tournament.prizePool.third}</span>
            </div>
          </div>
        </Card>

        {/* 6. Location */}
        <Card>
          <h3 className="font-bold text-vball-navy text-sm mb-2">📍 Location</h3>
          <div className="w-full h-32 bg-gray-200 rounded-xl mb-2 flex items-center justify-center text-gray-400 text-xs">
            Map View (Google Maps Integration)
          </div>
          <p className="text-sm font-medium text-vball-navy">{tournament.venue}</p>
          <p className="text-xs text-gray-500">{tournament.location}</p>
          <Button variant="outline" className="w-full mt-3 text-xs">Get Directions</Button>
        </Card>

        {/* 7. Match Schedule Placeholder */}
        <Card>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-vball-navy text-sm">Match Schedule</h3>
            <span className="text-[10px] text-vball-blue font-semibold">View Full Schedule</span>
          </div>
          <div className="bg-vball-bg rounded-xl p-3 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-bold">Kasarani Spikers</span> <span className="text-gray-400">vs</span> <span className="font-bold">Umoja Warriors</span>
              <p className="text-gray-500 text-[10px]">Court 1 • 9:00 AM</p>
            </div>
            <span className="text-[10px] bg-vball-yellow/20 text-vball-navy px-2 py-1 rounded-full">Live</span>
          </div>
          <div className="bg-vball-bg rounded-xl p-3 flex items-center justify-between mt-2">
            <div className="text-xs">
              <span className="font-bold">South B All Stars</span> <span className="text-gray-400">vs</span> <span className="font-bold">Thika Road Warriors</span>
              <p className="text-gray-500 text-[10px]">Court 2 • 11:00 AM</p>
            </div>
            <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Upcoming</span>
          </div>
        </Card>

        {/* 8. Organizer Info */}
        <Card className="bg-vball-blue/5 border-vball-blue/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-vball-blue font-bold text-xs border border-gray-200">
              VM
            </div>
            <div>
              <p className="font-bold text-vball-navy text-sm">{tournament.organizer}</p>
              <p className="text-xs text-gray-500">Tournament Organizer</p>
            </div>
            <Button variant="outline" className="ml-auto text-xs px-3 py-1.5 h-8">Contact</Button>
          </div>
        </Card>

        {/* 9. Tournament Chat Room */}
        <div className="mt-4">
          <TournamentChat tournamentId={id} tournamentTitle={`${tournament.title} Chat`} />
        </div>

        {/* 10. Comments Section */}
        <div className="mt-4">
          <CommentSection tournamentId={id} />
        </div>

      </main>

      {/* --- Bottom Navigation --- */}
      <BottomNav />
    </div>
  );
}