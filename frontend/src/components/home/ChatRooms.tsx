"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, ChevronRight, Users } from "lucide-react";
import { MOCK_CHAT_ROOMS } from "./data";

export const ChatRooms = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600">
            <MessageSquare size={14} />
          </span>
          <h3 className="font-bold text-lg text-vball-navy">Community Rooms</h3>
        </div>
        <Link href="/chat" className="flex items-center text-sm font-semibold text-vball-blue hover:underline">
          Open Chat <ChevronRight size={16} />
        </Link>
      </div>

      <div className="space-y-2.5">
        {MOCK_CHAT_ROOMS.map((room, idx) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={room.href}
              className="group flex items-center gap-3 rounded-2xl bg-white border border-gray-100 shadow-card p-3 hover:shadow-soft transition-shadow"
            >
              <div className={`relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${room.gradient} shadow`}>
                <MessageSquare size={20} className="text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center">
                  <span className="absolute h-3.5 w-3.5 rounded-full bg-emerald-500 opacity-50 animate-ping" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="truncate text-sm font-bold text-vball-navy group-hover:text-vball-blue transition-colors">
                    {room.name}
                  </h4>
                  <span className="flex-shrink-0 text-[10px] text-gray-400">{room.time}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-gray-500">{room.lastMessage}</p>
                <div className="mt-1 flex items-center gap-3 text-[10px] text-gray-400">
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {room.online} online
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users size={10} /> {room.members}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
