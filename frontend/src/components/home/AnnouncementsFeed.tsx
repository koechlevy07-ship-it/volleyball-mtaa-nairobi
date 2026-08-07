"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Pin, Bell, ChevronRight } from "lucide-react";
import { MOCK_ANNOUNCEMENTS } from "./data";

export const AnnouncementsFeed = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-vball-yellow/20 text-vball-navy">
            <Bell size={14} />
          </span>
          <h3 className="font-bold text-lg text-vball-navy">Announcements</h3>
        </div>
        <Link href="/announcements" className="flex items-center text-sm font-semibold text-vball-blue hover:underline">
          Read All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="space-y-3">
        {MOCK_ANNOUNCEMENTS.map((a, idx) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/announcements/${a.id}`} className="block group">
              <div className={`rounded-2xl border p-3.5 transition-shadow ${
                a.pinned
                  ? "bg-gradient-to-r from-vball-yellow/15 to-white border-vball-yellow/40 shadow-card"
                  : "bg-white border-gray-100 shadow-card hover:shadow-soft"
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                    a.pinned ? "bg-vball-yellow text-vball-navy" : "bg-vball-blue/10 text-vball-blue"
                  }`}>
                    {a.pinned ? <Pin size={18} /> : <Bell size={18} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-vball-navy leading-snug group-hover:text-vball-blue transition-colors">
                        {a.title}
                      </h4>
                      {a.pinned && (
                        <span className="flex-shrink-0 rounded-md bg-vball-navy px-1.5 py-0.5 text-[8px] font-black tracking-widest text-vball-yellow">
                          PINNED
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-600 leading-relaxed line-clamp-2">{a.body}</p>
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-400">
                      <span className="rounded-md bg-vball-bg px-1.5 py-0.5 font-semibold text-vball-muted">
                        {a.category}
                      </span>
                      <span>{a.time} ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
