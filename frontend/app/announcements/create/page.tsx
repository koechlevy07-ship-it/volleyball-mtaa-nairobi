"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { ChevronLeft } from "lucide-react";

export default function CreateAnnouncementPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState("Update");

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/announcements");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-vball-bg pb-20">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/announcements" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Create Announcement</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        <Card className="space-y-4">
          <Input label="Announcement Title *" placeholder="e.g. Kasarani Open Dates Confirmed" />
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-vball-navy">Category *</label>
            <div className="grid grid-cols-2 gap-2">
              {["Update", "Venue", "General", "Match Result"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${category === cat ? "bg-vball-blue text-white border-vball-blue" : "bg-white border-gray-200 text-gray-600 hover:bg-vball-bg"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-vball-navy">Content *</label>
            <textarea 
              className="w-full h-32 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-vball-text placeholder:text-vball-muted focus:outline-none focus:ring-2 focus:ring-vball-blue focus:border-transparent resize-none"
              placeholder="Write your announcement details here..."
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="w-1/3" onClick={() => router.back()}>Cancel</Button>
            <Button className="w-2/3" onClick={handleSubmit} isLoading={isSubmitting}>Publish Announcement</Button>
          </div>
        </Card>
      </main>
    </div>
  );
}