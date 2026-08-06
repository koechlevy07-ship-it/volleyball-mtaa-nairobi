"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { TournamentCard } from "@/components/home/TournamentCard";
import { ChevronLeft, ChevronRight, Filter, Calendar as CalendarIcon, MapPin } from "lucide-react";

// Mock Tournament Data with specific dates
const MOCK_EVENTS = [
  { id: "1", title: "Kasarani Open 2025", date: "15 May 2025", venue: "Kasarani Indoor Arena", teams: 12, day: 15 },
  { id: "2", title: "Umoja Cup 2025", date: "22 Aug 2025", venue: "Umoja Sports Grounds", teams: 8, day: 22 },
  { id: "3", title: "Eastlands Championship", date: "10 Oct 2025", venue: "Pumwani Grounds", teams: 10, day: 10 },
  { id: "4", title: "Kayole Volleyball Fest", date: "5 Jun 2025", venue: "Kayole Grounds", teams: 6, day: 5 },
  { id: "5", title: "South B Tournament", date: "19 Jul 2025", venue: "South B Grounds", teams: 14, day: 19 },
  { id: "6", title: "Donholm League", date: "15 Sep 2025", venue: "Donholm Sports Club", teams: 8, day: 15 },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(4); // May (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [view, setView] = useState<"month" | "week">("month");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Calculate days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Get events for specific day
  const getEventsForDay = (day: number) => {
    return MOCK_EVENTS.filter(e => e.day === day);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today.getDate());
  };

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-vball-yellow rounded-lg flex items-center justify-center text-vball-navy font-bold text-xs">
            <CalendarIcon size={16} />
          </div>
          <h1 className="text-lg font-bold text-vball-navy">Calendar</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1" onClick={handleToday}>
            Today
          </Button>
          <Button variant="ghost" size="sm" className="p-1.5">
            <Filter size={18} />
          </Button>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        {/* View Toggle */}
        <div className="flex bg-white rounded-xl shadow-card border border-gray-100 p-1">
          <button 
            onClick={() => setView("month")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${view === "month" ? "bg-vball-blue text-white" : "text-gray-600"}`}
          >
            Month
          </button>
          <button 
            onClick={() => setView("week")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${view === "week" ? "bg-vball-blue text-white" : "text-gray-600"}`}
          >
            Week
          </button>
          <button 
            onClick={() => setView("month")} // For demo, month handles "List"
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${view !== "month" && view !== "week" ? "bg-vball-blue text-white" : "text-gray-600"}`}
          >
            List
          </button>
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-card border border-gray-100">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-vball-bg rounded-lg transition-colors">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="font-bold text-vball-navy text-base">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          <button onClick={handleNextMonth} className="p-1 hover:bg-vball-bg rounded-lg transition-colors">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <Card className="overflow-hidden p-4">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((day) => (
              <div key={day} className="text-center text-[10px] font-semibold text-gray-400 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month start */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}
            
            {/* Actual days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const events = getEventsForDay(day);
              const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
              const isSelected = selectedDate === day;
              
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`h-10 rounded-lg flex flex-col items-center justify-center relative transition-all ${
                    isSelected ? "bg-vball-blue text-white" : isToday ? "bg-vball-yellow text-vball-navy font-bold" : "hover:bg-vball-bg"
                  }`}
                >
                  <span className="text-xs">{day}</span>
                  {events.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {events.slice(0, 2).map((e, idx) => (
                        <div key={idx} className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-vball-blue"}`} />
                      ))}
                      {events.length > 2 && (
                        <div className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-vball-blue"}`} />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Legend */}
        <div className="flex gap-4 text-[10px] text-gray-600 px-1">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-vball-blue" /> Tournament
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-vball-yellow" /> Today
          </span>
        </div>

        {/* Events on Selected Day */}
        {selectedDate && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-vball-navy text-sm">
                Events on {MONTHS[currentMonth]} {selectedDate}
              </h3>
              {getEventsForDay(selectedDate).length === 0 && (
                <span className="text-xs text-gray-400">No events scheduled</span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              {getEventsForDay(selectedDate).map((t) => (
                <TournamentCard key={t.id} {...t} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events List (Preview) */}
        {!selectedDate && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-vball-navy text-sm">Upcoming This Month</h3>
            </div>
            <div className="flex flex-col gap-3">
              {MOCK_EVENTS.slice(0, 3).map((t) => (
                <TournamentCard key={t.id} {...t} />
              ))}
            </div>
          </div>
        )}

      </main>

      <BottomNav />
    </div>
  );
}