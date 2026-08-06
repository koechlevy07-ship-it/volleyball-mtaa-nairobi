"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Search, User, Shield, Ban, CheckCircle, Filter } from "lucide-react";

const MOCK_USERS = [
  { id: "1", name: "John Mwangi", role: "Community Member", tournaments: 12, status: "Active" },
  { id: "2", name: "Mary Akinyi", role: "Organizer", tournaments: 8, status: "Active" },
  { id: "3", name: "Brian Otieno", role: "Community Member", tournaments: 4, status: "Suspended" },
  { id: "4", name: "Denis Kariuki", role: "Organizer", tournaments: 15, status: "Active" },
];

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-vball-bg">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/admin/internal" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">User Management</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full bg-white rounded-xl border border-gray-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vball-blue"
            />
          </div>
          <button className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-600 hover:bg-vball-bg transition-colors">
            <Filter size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {MOCK_USERS.map((user) => (
            <Card key={user.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-vball-bg rounded-full flex items-center justify-center text-vball-navy font-bold text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-vball-navy text-sm">{user.name}</p>
                    {user.role === "Organizer" && <Shield size={12} className="text-vball-yellow" />}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span>{user.role}</span>
                    <span>•</span>
                    <span>{user.tournaments} tournaments</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {user.status}
                </span>
                <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                  <Ban size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>

      </main>
    </div>
  );
}