"use client";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, FileText } from "lucide-react";
export default function AdminAuditPage() {
  return (
    <div className="min-h-screen bg-vball-bg">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/admin/internal" className="p-2 hover:bg-vball-bg rounded-full transition-colors"><ChevronLeft size={24} /></Link>
        <span className="font-semibold text-vball-navy text-sm">Audit Logs</span>
      </header>
      <main className="px-4 pt-4 max-w-md mx-auto">
        <Card className="p-6 text-center text-gray-500">System audit logs will appear here.</Card>
      </main>
    </div>
  );
}