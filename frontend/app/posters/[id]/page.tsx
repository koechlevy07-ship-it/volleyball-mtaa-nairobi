"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { ChevronLeft, Calendar, MapPin, Heart, Share2, Download } from "lucide-react";

export default function PosterDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock Data
  const poster = {
    id: "1",
    title: "Kasarani Open 2025",
    date: "15 - 17 May 2025",
    venue: "Kasarani Indoor Arena",
    location: "Kasarani Stadium Complex, Thika Road, Nairobi",
    organizer: "Volleyball Mtaa Nairobi",
    description: "Join us for the biggest volleyball tournament of the year! 16 teams competing for a massive prize pool.",
    image: "🏐",
    likes: 124,
  };

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/posters" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Poster Details</span>
        <div className="ml-auto flex gap-1">
          <button className="p-2 hover:bg-vball-bg rounded-full transition-colors">
            <Heart size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-vball-bg rounded-full transition-colors">
            <Share2 size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        {/* Full Poster Image */}
        <div className="w-full aspect-[3/4] bg-gradient-to-br from-vball-navy to-vball-blue rounded-2xl flex items-center justify-center text-8xl shadow-soft relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          {poster.image}
          
          {/* Download Button */}
          <button className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full shadow-lg hover:bg-vball-yellow transition-colors">
            <Download size={20} className="text-vball-navy" />
          </button>
        </div>

        {/* Poster Info */}
        <Card className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-vball-navy">{poster.title}</h1>
              <p className="text-sm text-gray-500">by {poster.organizer}</p>
            </div>
            <span className="bg-vball-yellow/20 text-vball-navy text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Heart size={14} /> {poster.likes}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-vball-bg p-3 rounded-xl flex items-center gap-2">
              <Calendar size={18} className="text-vball-blue" />
              <div>
                <p className="text-[10px] text-gray-500">Date</p>
                <p className="font-semibold text-vball-navy">{poster.date}</p>
              </div>
            </div>
            <div className="bg-vball-bg p-3 rounded-xl flex items-center gap-2">
              <MapPin size={18} className="text-vball-blue" />
              <div>
                <p className="text-[10px] text-gray-500">Venue</p>
                <p className="font-semibold text-vball-navy text-xs line-clamp-1">{poster.venue}</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{poster.description}</p>
          
          <Button className="w-full" variant="secondary">View Tournament</Button>
        </Card>

      </main>

      <BottomNav />
    </div>
  );
}