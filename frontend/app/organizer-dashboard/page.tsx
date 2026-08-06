"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { 
  Plus, 
  Calendar, 
  Users, 
  Trophy, 
  MessageSquare, 
  Eye, 
  ChevronRight,
  TrendingUp,
  Clock,
  AlertCircle
} from "lucide-react";

export default function OrganizerDashboardPage() {
  // Mock Data - In real app, fetch from API
  const stats = {
    totalTournaments: 4,
    activeTournaments: 2,
    totalParticipants: 156,
    totalComments: 89,
    upcoming: [
      { id: "1", title: "Kasarani Open 2025", date: "15 May", participants: 48, status: "Upcoming" },
      { id: "2", title: "Umoja Cup 2025", date: "22 Aug", participants: 32, status: "Draft" },
    ],
    recentActivity: [
      { id: "1", action: "New participant registered", tournament: "Kasarani Open", time: "2 min ago" },
      { id: "2", action: "Comment reported", tournament: "Umoja Cup", time: "1 hour ago" },
      { id: "3", action: "Tournament published", tournament: "Eastlands Champs", time: "3 hours ago" },
    ]
  };

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-vball-blue rounded-lg flex items-center justify-center text-white text-xs font-bold">
            OD
          </div>
          <h1 className="text-lg font-bold text-vball-navy">Organizer Dashboard</h1>
        </div>
        <Link href="/tournaments/create">
          <Button size="sm" className="gap-1.5">
            <Plus size={16} /> New Tournament
          </Button>
        </Link>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="w-8 h-8 bg-vball-blue/10 rounded-lg flex items-center justify-center text-vball-blue mb-2">
              <Trophy size={16} />
            </div>
            <p className="font-bold text-vball-navy text-xl">{stats.totalTournaments}</p>
            <p className="text-[10px] text-gray-500">Total Tournaments</p>
            <p className="text-[10px] text-green-600 mt-1">↑ 2 this month</p>
          </Card>
          <Card className="p-4">
            <div className="w-8 h-8 bg-vball-yellow/20 rounded-lg flex items-center justify-center text-vball-navy mb-2">
              <Users size={16} />
            </div>
            <p className="font-bold text-vball-navy text-xl">{stats.totalParticipants}</p>
            <p className="text-[10px] text-gray-500">Total Participants</p>
            <p className="text-[10px] text-green-600 mt-1">↑ 12 this week</p>
          </Card>
          <Card className="p-4">
            <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500 mb-2">
              <MessageSquare size={16} />
            </div>
            <p className="font-bold text-vball-navy text-xl">{stats.totalComments}</p>
            <p className="text-[10px] text-gray-500">Total Comments</p>
            <p className="text-[10px] text-green-600 mt-1">↑ 8 this week</p>
          </Card>
          <Card className="p-4">
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mb-2">
              <Eye size={16} />
            </div>
            <p className="font-bold text-vball-navy text-xl">{stats.activeTournaments}</p>
            <p className="text-[10px] text-gray-500">Active Tournaments</p>
            <p className="text-[10px] text-green-600 mt-1">Live now</p>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/organizer-dashboard/analytics">
            <Card className="p-4 text-center hover:shadow-soft transition-shadow cursor-pointer h-full flex flex-col items-center justify-center gap-1">
              <TrendingUp size={20} className="text-vball-blue" />
              <p className="font-semibold text-vball-navy text-xs">Analytics</p>
            </Card>
          </Link>
          <Link href="/organizer-dashboard/participants">
            <Card className="p-4 text-center hover:shadow-soft transition-shadow cursor-pointer h-full flex flex-col items-center justify-center gap-1">
              <Users size={20} className="text-vball-yellow" />
              <p className="font-semibold text-vball-navy text-xs">Participants</p>
            </Card>
          </Link>
          <Link href="/organizer-dashboard/moderation">
            <Card className="p-4 text-center hover:shadow-soft transition-shadow cursor-pointer h-full flex flex-col items-center justify-center gap-1">
              <AlertCircle size={20} className="text-red-500" />
              <p className="font-semibold text-vball-navy text-xs">Moderation</p>
            </Card>
          </Link>
        </div>

        {/* Upcoming Tournaments */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-vball-navy text-sm">My Tournaments</h3>
            <Link href="/tournaments" className="text-xs text-vball-blue flex items-center">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {stats.upcoming.map((tournament) => (
              <Card key={tournament.id} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tournament.status === "Upcoming" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}`}>
                    <Trophy size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-vball-navy text-sm">{tournament.title}</p>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1">
                      <Clock size={12} /> {tournament.date} • {tournament.participants} participants
                    </p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${tournament.status === "Upcoming" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                  {tournament.status}
                </span>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <h3 className="font-bold text-vball-navy text-sm mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-6 h-6 bg-vball-bg rounded-full flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 bg-vball-blue rounded-full" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-vball-navy">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.tournament}</p>
                  <p className="text-[10px] text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </main>

      <BottomNav />
    </div>
  );
}