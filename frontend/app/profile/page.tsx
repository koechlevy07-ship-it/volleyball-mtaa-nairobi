"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { 
  User, Settings, Calendar, Trophy, MessageSquare, 
  Heart, Share2, Edit2, MapPin, Users 
} from "lucide-react";

export default function ProfilePage() {
  // Mock Data - In real app, fetch from auth store/API
  const user = {
    name: "John Mwangi",
    username: "@john_mwangi",
    bio: "Volleyball player & enthusiast. Playing for Kasarani Spikers 🏐",
    location: "Nairobi, Kenya",
    memberSince: "Jan 2025",
    stats: {
      tournaments: 12,
      comments: 156,
      saved: 8
    },
    badges: ["Top Commenter", "Tournament Enthusiast", "Community Member"]
  };

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-vball-navy">Profile</h1>
        <Link href="/settings">
          <button className="p-2 hover:bg-vball-bg rounded-full transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>
        </Link>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        {/* Profile Header Card */}
        <Card className="p-6 text-center space-y-3 relative overflow-hidden">
          {/* Cover Image */}
          <div className="absolute inset-0 h-24 bg-gradient-to-r from-vball-blue to-vball-navy opacity-10"></div>
          
          <div className="relative">
            {/* Avatar */}
            <div className="w-24 h-24 bg-white rounded-full mx-auto border-4 border-white shadow-soft flex items-center justify-center text-vball-blue text-4xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-vball-yellow to-vball-blue flex items-center justify-center text-white font-bold text-2xl">
                JM
              </div>
            </div>
            
            <Link href="/profile/edit">
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-card border border-gray-100 hover:bg-vball-bg transition-colors">
                <Edit2 size={14} className="text-vball-navy" />
              </button>
            </Link>
          </div>

          <div className="relative pt-2">
            <h2 className="text-xl font-bold text-vball-navy">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.username}</p>
            <p className="text-sm text-gray-600 mt-1">{user.bio}</p>
            
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1"><MapPin size={14} /> {user.location}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {user.memberSince}</span>
            </div>

            <div className="flex gap-2 mt-4 justify-center">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Share2 size={14} /> Share
              </Button>
              <Link href="/profile/edit">
                <Button size="sm" className="gap-1.5">
                  <Edit2 size={14} /> Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center">
            <div className="w-8 h-8 bg-vball-blue/10 rounded-full flex items-center justify-center mx-auto mb-1">
              <Trophy size={16} className="text-vball-blue" />
            </div>
            <p className="font-bold text-vball-navy text-lg">{user.stats.tournaments}</p>
            <p className="text-[10px] text-gray-500">Tournaments</p>
          </Card>
          <Card className="p-3 text-center">
            <div className="w-8 h-8 bg-vball-yellow/20 rounded-full flex items-center justify-center mx-auto mb-1">
              <MessageSquare size={16} className="text-vball-navy" />
            </div>
            <p className="font-bold text-vball-navy text-lg">{user.stats.comments}</p>
            <p className="text-[10px] text-gray-500">Comments</p>
          </Card>
          <Card className="p-3 text-center">
            <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-1">
              <Heart size={16} className="text-green-500" />
            </div>
            <p className="font-bold text-vball-navy text-lg">{user.stats.saved}</p>
            <p className="text-[10px] text-gray-500">Saved</p>
          </Card>
        </div>

        {/* Badges */}
        <Card>
          <h3 className="font-bold text-vball-navy text-sm mb-3">🏅 Badges</h3>
          <div className="flex flex-wrap gap-2">
            {user.badges.map((badge, idx) => (
              <span key={idx} className="bg-vball-bg text-vball-navy text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                {badge}
              </span>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/saved">
            <Card className="p-4 text-center hover:shadow-soft transition-shadow cursor-pointer h-full flex flex-col items-center justify-center gap-1">
              <Heart size={24} className="text-red-500" />
              <p className="font-semibold text-vball-navy text-sm">Saved</p>
              <p className="text-[10px] text-gray-500">Tournaments</p>
            </Card>
          </Link>
          <Link href="/chat">
            <Card className="p-4 text-center hover:shadow-soft transition-shadow cursor-pointer h-full flex flex-col items-center justify-center gap-1">
              <Users size={24} className="text-vball-blue" />
              <p className="font-semibold text-vball-navy text-sm">My Chats</p>
              <p className="text-[10px] text-gray-500">Active rooms</p>
            </Card>
          </Link>
        </div>

      </main>

      <BottomNav />
    </div>
  );
}