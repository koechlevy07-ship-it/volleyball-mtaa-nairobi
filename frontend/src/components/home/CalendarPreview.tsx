"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, CalendarDays } from "lucide-react";
import { MOCK_TOURNAMENTS, getStartDate } from "./data";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export const CalendarPreview = () => {
  const [view, setView] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const tournamentDays = useMemo(() => {
    const map: Record<string, number> = {};
    MOCK_TOURNAMENTS.forEach((t) => {
      const d = getStartDate(t);
      if (d.getMonth() === view.getMonth() && d.getFullYear() === view.getFullYear()) {
        map[d.getDate()] = (map[d.getDate()] ?? 0) + 1;
      }
    });
    return map;
  }, [view]);

  const cells = useMemo(() => {
    const firstDay = view.getDay();
    const totalDays = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const today = new Date();
    return Array.from({ length: totalDays }).map((_, i) => {
      const day = i + 1;
      const isToday =
        today.getDate() === day &&
        today.getMonth() === view.getMonth() &&
        today.getFullYear() === view.getFullYear();
      return { day, isToday, eventCount: tournamentDays[day] ?? 0 };
    });
  }, [view, tournamentDays]);

  const monthLabel = view.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  const changeMonth = (delta: number) => {
    setView((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-vball-blue/10 text-vball-blue">
            <CalendarDays size={14} />
          </span>
          <h3 className="font-bold text-lg text-vball-navy">Event Calendar</h3>
        </div>
        <Link href="/calendar" className="flex items-center text-sm font-semibold text-vball-blue hover:underline">
          Full Calendar <ChevronRight size={16} />
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-vball-navy">{monthLabel}</span>
          <div className="flex gap-2">
            <button
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-vball-bg text-vball-muted hover:bg-vball-blue/10 hover:text-vball-blue active:scale-95 transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-vball-bg text-vball-muted hover:bg-vball-blue/10 hover:text-vball-blue active:scale-95 transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {WEEKDAYS.map((d, i) => (
            <div key={i} className="pb-1.5 font-bold text-gray-400">
              {d}
            </div>
          ))}
          {Array.from({ length: view.getDay() }).map((_, i) => (
            <div key={`blank-${i}`} />
          ))}
          {cells.map(({ day, isToday, eventCount }) => (
            <div
              key={day}
              className={`relative flex aspect-square items-center justify-center rounded-full text-[11px] font-semibold transition ${
                eventCount > 0
                  ? "bg-vball-yellow text-vball-navy font-black"
                  : isToday
                    ? "ring-2 ring-vball-blue text-vball-blue font-bold bg-vball-blue/5"
                    : "text-gray-600 hover:bg-vball-bg"
              }`}
            >
              {day}
              {eventCount > 1 && (
                <span className="absolute bottom-0.5 text-[7px] font-bold text-vball-navy">
                  {eventCount}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-4 border-t border-gray-100 pt-3 text-[10px] text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-vball-yellow" /> Tournament day
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full ring-2 ring-vball-blue" /> Today
          </span>
        </div>
      </div>
    </section>
  );
};
