"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, MessageCircle, ChevronRight, Trophy, Medal, Award } from "lucide-react";
import { MOCK_DISCUSSIONS } from "./data";

const rankIcons = [Trophy, Medal, Award];

export const TrendingDiscussions = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/15 text-orange-500">
            <Flame size={14} />
          </span>
          <h3 className="font-bold text-lg text-vball-navy">Trending Discussions</h3>
        </div>
        <Link href="/chat" className="flex items-center text-sm font-semibold text-vball-blue hover:underline">
          Join In <ChevronRight size={16} />
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 divide-y divide-gray-100">
        {MOCK_DISCUSSIONS.map((d, idx) => {
          const RankIcon = rankIcons[idx] ?? MessageCircle;
          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
            >
              <Link href="/chat" className="group flex items-center gap-3 p-3.5 hover:bg-vball-bg/60 transition-colors">
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
                  idx === 0
                    ? "bg-vball-yellow text-vball-navy"
                    : idx === 1
                      ? "bg-vball-blue/10 text-vball-blue"
                      : "bg-vball-navy/10 text-vball-navy"
                }`}>
                  <RankIcon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-vball-navy group-hover:text-vball-blue transition-colors">
                    {d.topic}
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-400">
                    <span className="rounded bg-vball-bg px-1.5 py-0.5 font-semibold text-vball-muted">{d.tag}</span>{" "}
                    · active {d.lastActive} ago
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1 text-[11px] font-semibold text-gray-500">
                  <MessageCircle size={13} className="text-vball-blue" /> {d.replies}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
