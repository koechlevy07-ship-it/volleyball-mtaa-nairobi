"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Users, Trophy, MessageCircle, Bookmark, ArrowRight, Star } from "lucide-react";
import { Tournament, getTournamentId, getDateParts, getStartDate } from "./data";

interface FeaturedTournamentProps {
  tournament: Tournament;
  loading?: boolean;
}

export const FeaturedTournament = ({ tournament, loading }: FeaturedTournamentProps) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-vball-navy/10 bg-white shadow-card overflow-hidden">
        <div className="h-44 skeleton" />
        <div className="p-4 space-y-3">
          <div className="h-5 w-2/3 skeleton rounded-md" />
          <div className="h-4 w-1/2 skeleton rounded-md" />
        </div>
      </div>
    );
  }

  const { day, month } = getDateParts(tournament.startDate);
  const date = getStartDate(tournament).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/tournaments/${getTournamentId(tournament)}`} className="block group">
        <div className="relative overflow-hidden rounded-2xl border border-vball-navy/10 bg-white shadow-card hover:shadow-soft transition-shadow">
          {/* Poster */}
          <div className="relative h-48 bg-gradient-to-br from-vball-navy via-vball-blue to-[#0066cc] overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-vball-yellow/20 blur-2xl" />
            <div className="absolute -bottom-10 -left-6 w-44 h-44 rounded-full bg-vball-blue/40 blur-2xl" />
            {/* Big date block */}
            <div className="absolute top-4 left-4 rounded-xl bg-white/95 shadow-lg px-3 py-2 text-center">
              <span className="block text-lg font-black text-vball-navy leading-none">{day}</span>
              <span className="block text-[10px] font-bold text-vball-blue tracking-widest">{month}</span>
            </div>
            {/* Featured badge */}
            <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-vball-yellow px-3 py-1 text-[10px] font-black tracking-widest text-vball-navy shadow">
              <Star size={11} fill="currentColor" /> FEATURED
            </span>
            {/* Title on poster */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-xl font-black text-white leading-tight drop-shadow line-clamp-2">
                {tournament.title}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1 rounded-full bg-vball-bg px-2.5 py-1 font-medium">
                <MapPin size={12} className="text-vball-blue" />
                {tournament.location || tournament.venue}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-vball-bg px-2.5 py-1 font-medium">
                <CalendarDays size={12} className="text-vball-blue" />
                {date}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-vball-bg p-2 text-center">
                <p className="flex items-center justify-center gap-1 text-xs font-bold text-vball-navy">
                  <Users size={12} className="text-vball-blue" /> {tournament.maxTeams ?? 16}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">Teams</p>
              </div>
              <div className="rounded-xl bg-vball-bg p-2 text-center">
                <p className="flex items-center justify-center gap-1 text-xs font-bold text-vball-navy">
                  <Trophy size={12} className="text-vball-yellow" />
                  {typeof tournament.prizePool === "number"
                    ? `KES ${tournament.prizePool.toLocaleString()}`
                    : tournament.prizePool || "KES 0"}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">Prize Pool</p>
              </div>
              <div className="rounded-xl bg-vball-bg p-2 text-center">
                <p className="flex items-center justify-center gap-1 text-xs font-bold text-vball-navy">
                  <Bookmark size={12} className="text-vball-blue" /> {tournament.saves ?? 0}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">Saves</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                <MessageCircle size={14} className="text-vball-blue" />
                {tournament.comments ?? 0} comments
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-vball-blue group-hover:underline">
                View Tournament <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
