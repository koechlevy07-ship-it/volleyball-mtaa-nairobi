"use client";

import Link from "next/link";
import { BottomNav } from "@/components/home/BottomNav";
import { Card } from "@/components/ui/Card";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Privacy Policy</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        <Card className="space-y-4 p-6">
          <h1 className="text-xl font-bold text-vball-navy">Privacy Policy</h1>
          <p className="text-xs text-gray-500">Last updated: August 2025</p>

          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <section>
              <h3 className="font-semibold text-vball-navy">1. Information We Collect</h3>
              <p>We collect information you provide directly to us, such as your name, email address, phone number, and profile picture when you register for an account.</p>
            </section>
            <section>
              <h3 className="font-semibold text-vball-navy">2. How We Use Your Information</h3>
              <p>We use your information to provide, maintain, and improve our services, communicate with you, and personalize your experience on the platform.</p>
            </section>
            <section>
              <h3 className="font-semibold text-vball-navy">3. Data Security</h3>
              <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
            </section>
            <section>
              <h3 className="font-semibold text-vball-navy">4. Your Rights</h3>
              <p>You have the right to access, update, or delete your personal information at any time by visiting your profile settings.</p>
            </section>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}