"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Navigation, Users } from "lucide-react";
import { MOCK_NEARBY, getDateParts } from "./data";

export const NearbyEvents = () => {
  return (
    <section className="bg-white rounded-2xl shadow-card border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-vball-yellow/20 text-vball-navy">
            <Navigation size={14} />
          </span>
          <div>
            <h3 className="font-bold text-vball-navy">Discover Nearby</h3>
            <p className="text-[11px] text-vball-muted">Courts and games around you</p>
          </div>
        </div>
        <Link href="/tournaments" className="flex items-center text-sm font-semibold text-vball-blue hover:underline">
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto pb-1 snap-x scrollbar-hide">
        {MOCK_NEARBY.map((ev) => {
          const { day, month } = getDateParts(ev.startDate);
          return (
            <Link
              key={ev.id}
              href="/tournaments"
              className="flex-shrink-0 w-56 snap-start group rounded-xl border border-gray-100 overflow-hidden hover:shadow-soft transition-shadow"
            >
              <div className={`h-20 bg-gradient-to-br ${ev.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 rounded-md bg-white/20 backdrop-blur px-1.5 py-0.5 text-[9px] font-bold text-white">
                  <Navigation size={9} /> {ev.distance}
                </span>
              </div>
              <div className="flex gap-2.5 p-2.5">
                <div className="flex-shrink-0 rounded-lg bg-vball-yellow px-2 py-1 text-center">
                  <span className="block text-sm font-black text-vball-navy leading-none">{day}</span>
                  <span className="block text-[8px] font-bold text-vball-navy/70 tracking-widest">{month}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-vball-navy leading-tight line-clamp-2 group-hover:text-vball-blue">
                    {ev.title}
                  </h4>
                  <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
                    <MapPin size={10} className="text-vball-blue" /> {ev.venue}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-400">
                    <Users size={10} /> {ev.attendees} attending
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
