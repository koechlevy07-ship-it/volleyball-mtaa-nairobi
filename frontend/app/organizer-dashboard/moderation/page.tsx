"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BottomNav } from "@/components/home/BottomNav";
import { ChevronLeft, Flag, MessageSquare, Trash2, CheckCircle, AlertTriangle } from "lucide-react";

const MOCK_REPORTS = [
  { id: "1", user: "Guest User", comment: "This team is terrible!", tournament: "Kasarani Open", reason: "Inappropriate language", status: "Pending" },
  { id: "2", user: "Anonymous", comment: "Spam link: www.example.com", tournament: "Umoja Cup", reason: "Spam", status: "Pending" },
  { id: "3", user: "Player 12", comment: "The referee is biased!", tournament: "Eastlands Champs", reason: "Harassment", status: "Resolved" },
];

export default function ModerationPage() {
  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/organizer-dashboard" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <div className="flex items-center gap-2">
          <Flag size={18} className="text-red-500" />
          <span className="font-semibold text-vball-navy text-sm">Moderation</span>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["Pending", "Resolved", "All"].map((tab) => (
            <button key={tab} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${tab === "Pending" ? "bg-vball-blue text-white" : "bg-white border border-gray-200 text-gray-600"}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {MOCK_REPORTS.map((report) => (
            <Card key={report.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${report.status === "Pending" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
                    {report.status === "Pending" ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                  </div>
                  <div>
                    <p className="font-semibold text-vball-navy text-sm">{report.reason}</p>
                    <p className="text-xs text-gray-600 line-clamp-1">"{report.comment}"</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                      <span>By {report.user}</span>
                      <span>•</span>
                      <span>{report.tournament}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${report.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                  {report.status}
                </span>
              </div>
              {report.status === "Pending" && (
                <div className="flex gap-2 mt-3 justify-end">
                  <Button size="sm" variant="outline" className="text-xs gap-1 text-green-600 border-green-200">
                    <CheckCircle size={14} /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs gap-1 text-red-500 border-red-200">
                    <Trash2 size={14} /> Remove
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>

      </main>

      <BottomNav />
    </div>
  );
}