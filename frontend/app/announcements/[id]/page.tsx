"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { ChevronLeft, Calendar, User, Share2, Heart } from "lucide-react";

export default function AnnouncementDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock Data
  const announcement = {
    id: "1",
    title: "Kasarani Open 2025 – New Dates Confirmed!",
    content: `The Kasarani Open 2025 has been officially rescheduled! 

We are excited to announce that the tournament will now take place from **15 – 17 May 2025** at the Kasarani Indoor Arena. 

This change was made to accommodate the growing number of participating teams and to ensure a better experience for all players and fans.

Registration is still open. Please reach out to the organizer if you have any questions.

We look forward to seeing you there! 🏐`,
    category: "Update",
    author: "Volleyball Mtaa Nairobi",
    date: "May 10, 2025",
    views: 1280,
  };

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/announcements" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Announcement</span>
        <div className="ml-auto flex gap-1">
          <button className="p-2 hover:bg-vball-bg rounded-full transition-colors">
            <Share2 size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        <Card className="p-5 space-y-4">
          {/* Header */}
          <div>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
              {announcement.category}
            </span>
            <h1 className="text-xl font-bold text-vball-navy leading-tight">{announcement.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><User size={14} /> {announcement.author}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {announcement.date}</span>
            </div>
          </div>

          {/* Body */}
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {announcement.content}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">👁️ {announcement.views} views</span>
              <button className="flex items-center gap-1 hover:text-vball-blue transition-colors">
                <Heart size={16} /> Like
              </button>
            </div>
            <Button variant="outline" size="sm" className="text-xs">Share</Button>
          </div>
        </Card>

        {/* Related / Recent Announcements */}
        <div>
          <h3 className="font-bold text-vball-navy text-sm mb-2">Recent Announcements</h3>
          <div className="space-y-2">
            <Link href="/announcements/2" className="block bg-white p-3 rounded-xl shadow-card border border-gray-100">
              <p className="font-medium text-vball-navy text-sm line-clamp-1">New Venue for South B Tournament</p>
              <p className="text-xs text-gray-500">May 8, 2025</p>
            </Link>
            <Link href="/announcements/3" className="block bg-white p-3 rounded-xl shadow-card border border-gray-100">
              <p className="font-medium text-vball-navy text-sm line-clamp-1">DC Volleyball League Registration Open</p>
              <p className="text-xs text-gray-500">May 7, 2025</p>
            </Link>
          </div>
        </div>

      </main>

      <BottomNav />
    </div>
  );
}