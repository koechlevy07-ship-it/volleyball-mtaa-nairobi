"use client";

import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";

interface TournamentCardProps {
  id: string;
  title: string;
  date: string;
  venue: string;
  teams: number;
  image?: string;
}

export const TournamentCard = ({ id, title, date, venue, teams, image }: TournamentCardProps) => {
  return (
    <Link href={`/tournaments/${id}`} className="block">
      <div className="bg-white rounded-xl shadow-card border border-gray-100 p-3 flex gap-3 hover:shadow-soft transition-shadow">
        <div className="w-24 h-24 bg-gray-200 rounded-lg relative flex-shrink-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-vball-blue to-vball-navy flex items-center justify-center text-white text-xs font-bold p-2 text-center">
            {title.substring(0, 15)}...
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-vball-navy text-sm leading-tight line-clamp-1">{title}</h4>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <CalendarDays size={12} /> {date}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin size={12} /> {venue}
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <Users size={12} /> {teams} Teams
            </p>
          </div>
          <span className="text-xs text-vball-blue font-semibold self-end hover:underline mt-1">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
};