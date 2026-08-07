"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Heart, MessageSquare } from "lucide-react";
import { STATS } from "./data";

const statIcons = [Trophy, Users, Heart, MessageSquare];

export const StatsSection = () => {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-vball-navy to-vball-blue p-5 text-white shadow-card overflow-hidden relative">
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-vball-yellow/15 blur-2xl" />
      <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-white/10 blur-xl" />
      <div className="relative">
        <h3 className="text-lg font-black tracking-tight">
          The Mtaa Movement <span className="text-vball-yellow">by the numbers</span>
        </h3>
        <p className="text-xs text-white/70 mt-1">From Kayole to Kitengela — we are growing fast.</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {STATS.map((s, idx) => {
            const Icon = statIcons[idx] ?? Trophy;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="rounded-xl bg-white/10 border border-white/15 backdrop-blur p-3"
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-vball-yellow" />
                  <span className="text-xl font-black leading-none">{s.value}</span>
                </div>
                <p className="mt-1.5 text-xs font-bold">{s.label}</p>
                <p className="text-[10px] text-white/60">{s.suffix}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
