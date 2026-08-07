"use client";

import Link from "next/link";
import { BottomNav } from "@/components/home/BottomNav";
import { Card } from "@/components/ui/Card";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Terms of Service</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        <Card className="space-y-4 p-6">
          <h1 className="text-xl font-bold text-vball-navy">Terms of Service</h1>
          <p className="text-xs text-gray-500">Last updated: August 2025</p>

          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <section>
              <h3 className="font-semibold text-vball-navy">1. Acceptance of Terms</h3>
              <p>By accessing and using Volleyball Mtaa Nairobi, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
            </section>
            <section>
              <h3 className="font-semibold text-vball-navy">2. User Accounts</h3>
              <p>You are responsible for maintaining the confidentiality of your account and password. You are fully responsible for all activities that occur under your account.</p>
            </section>
            <section>
              <h3 className="font-semibold text-vball-navy">3. Content and Conduct</h3>
              <p>Users must not post harmful, abusive, or inappropriate content. Volleyball Mtaa Nairobi reserves the right to remove any content that violates these terms.</p>
            </section>
            <section>
              <h3 className="font-semibold text-vball-navy">4. Privacy</h3>
              <p>Your use of the platform is also governed by our Privacy Policy. We take your data privacy seriously.</p>
            </section>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}