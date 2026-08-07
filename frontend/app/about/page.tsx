"use client";

import Link from "next/link";
import { BottomNav } from "@/components/home/BottomNav";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, Trophy, Users, Calendar, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">About Us</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        <Card className="space-y-4 p-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-vball-blue rounded-2xl flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-md mb-4">
              VM
            </div>
            <h1 className="text-2xl font-bold text-vball-navy">Volleyball Mtaa Nairobi</h1>
            <p className="text-sm text-vball-muted mt-1">Play. Compete. Connect. Live Volleyball. Love Mtaa.</p>
          </div>

          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong className="text-vball-navy">Volleyball Mtaa Nairobi</strong> is a community-driven platform designed to bring together volleyball players, fans, organizers, and enthusiasts across Nairobi.
            </p>
            <p>
              Whether you are looking for your next tournament, looking to showcase your team, or just want to chat about the game, this is your home.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-vball-bg p-4 rounded-xl text-center">
              <Trophy size={24} className="text-vball-yellow mx-auto mb-1" />
              <p className="font-bold text-vball-navy text-lg">500+</p>
              <p className="text-xs text-gray-500">Tournaments Hosted</p>
            </div>
            <div className="bg-vball-bg p-4 rounded-xl text-center">
              <Users size={24} className="text-vball-blue mx-auto mb-1" />
              <p className="font-bold text-vball-navy text-lg">10K+</p>
              <p className="text-xs text-gray-500">Community Members</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 text-center">
          <h3 className="font-bold text-vball-navy text-sm mb-2">Join the Movement</h3>
          <p className="text-xs text-gray-500 mb-3">Be part of Nairobi's fastest-growing volleyball community.</p>
          <Link href="/register">
            <div className="inline-block bg-vball-blue text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-vball-blue/90 transition-colors">
              Get Started
            </div>
          </Link>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}