"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { ChevronLeft, TrendingUp, Users, Eye, MessageSquare } from "lucide-react";

export default function AnalyticsPage() {
  // Mock Data
  const metrics = [
    { label: "Total Views", value: "2,847", change: "+12%", icon: Eye, color: "text-vball-blue" },
    { label: "Registrations", value: "156", change: "+8%", icon: Users, color: "text-green-500" },
    { label: "Engagement", value: "89", change: "+15%", icon: MessageSquare, color: "text-vball-yellow" },
    { label: "Conversion", value: "5.4%", change: "+2%", icon: TrendingUp, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/organizer-dashboard" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Analytics</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric) => (
            <Card key={metric.label} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon size={18} className={metric.color} />
                <span className="text-[10px] text-green-500">{metric.change}</span>
              </div>
              <p className="font-bold text-vball-navy text-xl">{metric.value}</p>
              <p className="text-[10px] text-gray-500">{metric.label}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 text-center">
          <p className="text-sm text-gray-500">Detailed charts and graphs will be available here in the next update.</p>
          <p className="text-xs text-gray-400 mt-1">(Coming soon: Exportable reports)</p>
        </Card>

      </main>

      <BottomNav />
    </div>
  );
}