"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Shield, 
  Users, 
  Trophy, 
  Flag, 
  BarChart3, 
  Megaphone, 
  FileText, 
  LogOut,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

export default function SuperAdminDashboardPage() {
  // Mock Data - In real app, fetch from API
  const stats = {
    totalUsers: 2458,
    totalTournaments: 124,
    pendingApprovals: 8,
    pendingReports: 5,
    activeChats: 23,
  };

  const pendingTournaments = [
    { id: "1", name: "Kasarani Open 2025", organizer: "Volleyball Mtaa", date: "15 May", status: "Pending" },
    { id: "2", name: "Umoja Cup 2025", organizer: "Umoja Sports", date: "22 Aug", status: "Pending" },
  ];

  const recentReports = [
    { id: "1", user: "Anonymous", reason: "Spam", tournament: "Eastlands Champs", time: "2 min ago" },
    { id: "2", user: "Guest User", reason: "Harassment", tournament: "Kasarani Open", time: "1 hour ago" },
  ];

  return (
    <div className="min-h-screen bg-vball-bg">
      <header className="sticky top-0 z-40 bg-vball-navy text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-vball-yellow rounded-lg flex items-center justify-center text-vball-navy font-bold text-xs">
            SA
          </div>
          <h1 className="text-lg font-bold">Super Admin Panel</h1>
        </div>
        <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
          <LogOut size={18} />
        </button>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-vball-blue/5 border-vball-blue/20">
            <div className="w-8 h-8 bg-vball-blue/10 rounded-lg flex items-center justify-center text-vball-blue mb-2">
              <Users size={16} />
            </div>
            <p className="font-bold text-vball-navy text-xl">{stats.totalUsers}</p>
            <p className="text-[10px] text-gray-500">Total Users</p>
          </Card>
          <Card className="p-4 bg-vball-yellow/5 border-vball-yellow/20">
            <div className="w-8 h-8 bg-vball-yellow/20 rounded-lg flex items-center justify-center text-vball-navy mb-2">
              <Trophy size={16} />
            </div>
            <p className="font-bold text-vball-navy text-xl">{stats.totalTournaments}</p>
            <p className="text-[10px] text-gray-500">Total Tournaments</p>
          </Card>
          <Card className="p-4 bg-red-500/5 border-red-500/20">
            <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 mb-2">
              <Clock size={16} />
            </div>
            <p className="font-bold text-vball-navy text-xl">{stats.pendingApprovals}</p>
            <p className="text-[10px] text-gray-500">Pending Approvals</p>
          </Card>
          <Card className="p-4 bg-orange-500/5 border-orange-500/20">
            <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 mb-2">
              <Flag size={16} />
            </div>
            <p className="font-bold text-vball-navy text-xl">{stats.pendingReports}</p>
            <p className="text-[10px] text-gray-500">Pending Reports</p>
          </Card>
        </div>

        {/* Admin Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/admin/internal/users">
            <Card className="p-4 text-center hover:shadow-soft transition-shadow cursor-pointer h-full flex flex-col items-center justify-center gap-1 border-l-4 border-l-vball-blue">
              <Users size={24} className="text-vball-blue" />
              <p className="font-semibold text-vball-navy text-sm">Manage Users</p>
            </Card>
          </Link>
          <Link href="/admin/internal/tournaments">
            <Card className="p-4 text-center hover:shadow-soft transition-shadow cursor-pointer h-full flex flex-col items-center justify-center gap-1 border-l-4 border-l-vball-yellow">
              <Trophy size={24} className="text-vball-yellow" />
              <p className="font-semibold text-vball-navy text-sm">Tournaments</p>
            </Card>
          </Link>
          <Link href="/admin/internal/moderation">
            <Card className="p-4 text-center hover:shadow-soft transition-shadow cursor-pointer h-full flex flex-col items-center justify-center gap-1 border-l-4 border-l-red-500">
              <Flag size={24} className="text-red-500" />
              <p className="font-semibold text-vball-navy text-sm">Moderation</p>
            </Card>
          </Link>
          <Link href="/admin/internal/analytics">
            <Card className="p-4 text-center hover:shadow-soft transition-shadow cursor-pointer h-full flex flex-col items-center justify-center gap-1 border-l-4 border-l-green-500">
              <BarChart3 size={24} className="text-green-500" />
              <p className="font-semibold text-vball-navy text-sm">Analytics</p>
            </Card>
          </Link>
          <Link href="/admin/internal/broadcasts">
            <Card className="p-4 text-center hover:shadow-soft transition-shadow cursor-pointer h-full flex flex-col items-center justify-center gap-1 border-l-4 border-l-purple-500">
              <Megaphone size={24} className="text-purple-500" />
              <p className="font-semibold text-vball-navy text-sm">Broadcasts</p>
            </Card>
          </Link>
          <Link href="/admin/internal/audit">
            <Card className="p-4 text-center hover:shadow-soft transition-shadow cursor-pointer h-full flex flex-col items-center justify-center gap-1 border-l-4 border-l-gray-500">
              <FileText size={24} className="text-gray-500" />
              <p className="font-semibold text-vball-navy text-sm">Audit Logs</p>
            </Card>
          </Link>
        </div>

        {/* Pending Tournaments */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-vball-navy text-sm">Pending Tournament Approvals</h3>
            <Link href="/admin/internal/tournaments" className="text-xs text-vball-blue flex items-center">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {pendingTournaments.map((t) => (
              <Card key={t.id} className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-vball-navy text-sm">{t.name}</p>
                  <p className="text-[10px] text-gray-500">By {t.organizer} • {t.date}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                    <CheckCircle size={16} />
                  </button>
                  <button className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                    <XCircle size={16} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <Card>
          <h3 className="font-bold text-vball-navy text-sm mb-3">Recent Reports</h3>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-6 h-6 bg-red-500/10 rounded-full flex items-center justify-center mt-0.5">
                  <Flag size={12} className="text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-vball-navy">{report.reason}</p>
                  <p className="text-xs text-gray-500">{report.tournament}</p>
                  <p className="text-[10px] text-gray-400">{report.time} • {report.user}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </main>
    </div>
  );
}