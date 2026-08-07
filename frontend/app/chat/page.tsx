"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { MessageSquare, MapPin, Calendar, ChevronRight, Wifi, RefreshCw } from "lucide-react";

const API_URL = "https://volleyball-mtaa-backend.onrender.com/api/v1/tournaments";

const MOCK_ROOMS = [
  { _id: "1", title: "Kasarani Open 2025", venue: "Kasarani Indoor Arena", startDate: "2025-05-15T08:00:00.000Z", status: "Approved" },
  { _id: "2", title: "Umoja Cup 2025", venue: "Umoja Sports Grounds", startDate: "2025-08-22T08:00:00.000Z", status: "Approved" },
  { _id: "3", title: "Eastlands Championship", venue: "Pumwani Grounds", startDate: "2025-10-10T08:00:00.000Z", status: "Approved" },
  { _id: "4", title: "Kayole Volleyball Fest", venue: "Kayole Grounds", startDate: "2025-06-05T08:00:00.000Z", status: "Approved" },
  { _id: "5", title: "South B Tournament", venue: "South B Grounds", startDate: "2025-07-19T08:00:00.000Z", status: "Approved" },
];

interface Room {
  _id: string;
  title: string;
  venue?: string;
  startDate?: string;
  status?: string;
}

const formatDate = (iso?: string) => {
  if (!iso) return "TBA";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "TBA";
  return d.toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
};

const statusColor = (status?: string) => {
  switch (status) {
    case "Live":
      return "bg-green-100 text-green-700";
    case "Completed":
      return "bg-gray-100 text-gray-500";
    default:
      return "bg-blue-100 text-blue-700";
  }
};

export default function ChatPage() {
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  const loadRooms = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL, { signal: AbortSignal.timeout(15000) });
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      if (list.length > 0) {
        setRooms(list);
        setFromApi(true);
      } else {
        setRooms(MOCK_ROOMS);
        setFromApi(false);
      }
    } catch {
      setRooms(MOCK_ROOMS);
      setFromApi(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-vball-blue rounded-full flex items-center justify-center text-white">
            <MessageSquare size={16} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-vball-navy leading-tight">Chat</h1>
            <p className="text-[10px] text-vball-muted">Tournament live rooms</p>
          </div>
        </div>
        <button
          onClick={loadRooms}
          className="p-2 text-vball-muted hover:text-vball-navy transition-colors"
          aria-label="Refresh rooms"
        >
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
        </button>
      </header>

      <main className="px-4 pt-4 space-y-3 max-w-md mx-auto pb-6">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {rooms && rooms.length > 0 ? (
              rooms.map((room) => (
                <Link key={room._id} href={`/tournaments/${room._id}`}>
                  <Card className="p-4 flex items-center gap-3 hover:shadow-soft transition-shadow">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Wifi size={18} className="text-vball-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-vball-navy text-sm truncate">{room.title}</h3>
                        <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${statusColor(room.status)}`}>
                          {room.status === "Approved" ? "Upcoming" : room.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-vball-muted mt-1">
                        {room.venue && (
                          <span className="flex items-center gap-1 truncate">
                            <MapPin size={11} /> {room.venue}
                          </span>
                        )}
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <Calendar size={11} /> {formatDate(room.startDate)}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-vball-muted flex-shrink-0" />
                  </Card>
                </Link>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-2">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                  <MessageSquare size={24} className="text-vball-blue" />
                </div>
                <h3 className="font-semibold text-vball-navy">No chat rooms yet</h3>
                <p className="text-xs text-vball-muted">
                  Tournament rooms appear here once tournaments are published.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
