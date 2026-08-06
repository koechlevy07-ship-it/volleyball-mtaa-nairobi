"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, Megaphone } from "lucide-react";

export default function AdminBroadcastsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setTitle("");
      setMessage("");
      alert("📢 Broadcast sent to all users!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-vball-bg">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/admin/internal" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <div className="flex items-center gap-2">
          <Megaphone size={18} className="text-purple-500" />
          <span className="font-semibold text-vball-navy text-sm">Broadcasts</span>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        <Card className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-vball-navy">Broadcast Title</label>
            <input 
              type="text" 
              placeholder="e.g. Platform Update"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vball-blue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-vball-navy">Message</label>
            <textarea 
              className="w-full h-32 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vball-blue resize-none"
              placeholder="Write your broadcast message to all users..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleSend} isLoading={isSending}>
            Send to All Users 📢
          </Button>
        </Card>
      </main>
    </div>
  );
}