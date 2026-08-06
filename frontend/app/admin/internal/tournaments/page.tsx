"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Search, CheckCircle, XCircle, Filter } from "lucide-react";

const MOCK_APPROVALS = [
  { id: "1", name: "Kasarani Open 2025", organizer: "Volleyball Mtaa", date: "15 May", status: "Pending" },
  { id: "2", name: "Umoja Cup 2025", organizer: "Umoja Sports", date: "22 Aug", status: "Approved" },
  { id: "3", name: "Eastlands Champs", organizer: "Pumwani Grounds", date: "10 Oct", status: "Pending" },
  { id: "4", name: "Kayole Fest", organizer: "Kayole Sports", date: "5 Jun", status: "Rejected" },
];

export default function AdminTournamentsPage() {
  return (
    <div className="min-h-screen bg-vball-bg">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/admin/internal" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Tournament Approvals</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tournaments..." 
              className="w-full bg-white rounded-xl border border-gray-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vball-blue"
            />
          </div>
          <button className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-600 hover:bg-vball-bg transition-colors">
            <Filter size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {MOCK_APPROVALS.map((t) => (
            <Card key={t.id} className="p-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-vball-navy text-sm">{t.name}</p>
                <p className="text-[10px] text-gray-500">{t.organizer} • {t.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${t.status === "Approved" ? "bg-green-100 text-green-700" : t.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {t.status}
                </span>
                {t.status === "Pending" && (
                  <div className="flex gap-1">
                    <button className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                      <CheckCircle size={16} />
                    </button>
                    <button className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                      <XCircle size={16} />
                    </button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

      </main>
    </div>
  );
}