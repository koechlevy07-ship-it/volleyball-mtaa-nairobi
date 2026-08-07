"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Users, Filter } from "lucide-react";
import { Tournament, AREAS, matchArea, getTournamentId, getDateParts, MOCK_TOURNAMENTS } from "./data";

interface UpcomingCarouselProps {
  tournaments: Tournament[];
  loading?: boolean;
}

const SkeletonCard = () => (
  <div className="flex-shrink-0 w-36 snap-start">
    <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
      <div className="h-24 skeleton" />
      <div className="p-2.5 space-y-2">
        <div className="h-3.5 skeleton rounded" />
        <div className="h-3 w-4/5 skeleton rounded" />
      </div>
    </div>
  </div>
);

export const UpcomingCarousel = ({ tournaments, loading }: UpcomingCarouselProps) => {
  const [activeArea, setActiveArea] = useState<string>("All");

  const source = tournaments.length > 0 ? tournaments : MOCK_TOURNAMENTS;
  const filtered = source.filter((t) => matchArea(t, activeArea));
  const chips = ["All", ...AREAS];

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-vball-blue/10 text-vball-blue">
            <Filter size={14} />
          </span>
          <h3 className="font-bold text-lg text-vball-navy">Upcoming Tournaments</h3>
        </div>
        <Link href="/tournaments" className="flex items-center text-sm font-semibold text-vball-blue hover:underline">
          See All <ChevronRight size={16} />
        </Link>
      </div>

      {/* Area filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {chips.map((area) => {
          const isActive = activeArea === area;
          return (
            <button
              key={area}
              onClick={() => setActiveArea(area)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all active:scale-95 ${
                isActive
                  ? "bg-vball-navy text-white shadow-md"
                  : "bg-white text-vball-muted border border-gray-200 hover:border-vball-blue/40"
              }`}
            >
              {area}
            </button>
          );
        })}
      </div>

      {/* Carousel */}
      {loading ? (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-vball-navy/15 bg-white p-6 text-center text-sm text-vball-muted">
          No tournaments in <span className="font-bold text-vball-navy">{activeArea}</span> yet.
          <br />
          <Link href="/tournaments/create" className="mt-2 inline-block font-bold text-vball-blue hover:underline">
            Be the first to create one →
          </Link>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
          {filtered.map((t) => {
            const { day, month } = getDateParts(t.startDate);
            return (
              <Link
                key={getTournamentId(t)}
                href={`/tournaments/${getTournamentId(t)}`}
                className="flex-shrink-0 w-36 snap-start group"
              >
                <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden hover:shadow-soft transition-shadow">
                  <div className="relative h-24 bg-gradient-to-br from-vball-blue to-vball-navy overflow-hidden">
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-vball-yellow/20 blur-lg" />
                    <div className="absolute top-1.5 left-1.5 rounded-lg bg-white/95 shadow px-2 py-1 text-center">
                      <span className="block text-sm font-black text-vball-navy leading-none">{day}</span>
                      <span className="block text-[8px] font-bold text-vball-blue tracking-widest">{month}</span>
                    </div>
                    <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/40 px-1.5 py-0.5 text-[8px] font-bold text-vball-yellow">
                      {t.status ?? "Upcoming"}
                    </span>
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-xs font-bold text-vball-navy leading-tight line-clamp-2 group-hover:text-vball-blue transition-colors">
                      {t.title}
                    </h4>
                    <p className="mt-1.5 flex items-center gap-1 text-[10px] text-gray-500">
                      <MapPin size={10} className="text-vball-blue" />
                      <span className="truncate">{t.location || t.venue}</span>
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
                      <Users size={10} /> {t.maxTeams ?? 8} teams
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};
