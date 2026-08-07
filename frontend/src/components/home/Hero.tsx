"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Play, CalendarDays, MapPin } from "lucide-react";

const StadiumLights = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* Left light */}
    <div className="absolute -top-6 -left-4 w-24 h-24 rounded-full bg-vball-yellow/70 blur-2xl animate-glow" />
    <div className="absolute -top-2 left-6 w-1 h-40 bg-gradient-to-b from-vball-yellow/60 to-transparent rotate-[24deg] blur-[2px]" />
    {/* Right light */}
    <div className="absolute -top-6 -right-4 w-24 h-24 rounded-full bg-white/60 blur-2xl animate-glow delay-300" />
    <div className="absolute -top-2 right-6 w-1 h-40 bg-gradient-to-b from-white/50 to-transparent -rotate-[24deg] blur-[2px]" />
  </div>
);

const NairobiSkyline = () => (
  <svg
    className="absolute bottom-0 left-0 w-full h-16 text-[#0A2E5C] opacity-90"
    viewBox="0 0 400 80"
    fill="currentColor"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <rect x="0" y="48" width="22" height="32" />
    <rect x="24" y="40" width="16" height="40" />
    <rect x="42" y="52" width="20" height="28" />
    <rect x="64" y="34" width="14" height="46" />
    <rect x="80" y="46" width="26" height="34" />
    <rect x="108" y="30" width="18" height="50" />
    <rect x="128" y="50" width="22" height="30" />
    <rect x="152" y="38" width="14" height="42" />
    <rect x="168" y="52" width="24" height="28" />
    <rect x="194" y="28" width="16" height="52" />
    <rect x="212" y="44" width="22" height="36" />
    <rect x="236" y="34" width="14" height="46" />
    <rect x="252" y="50" width="28" height="30" />
    <rect x="282" y="40" width="16" height="40" />
    <rect x="300" y="54" width="22" height="26" />
    <rect x="324" y="36" width="14" height="44" />
    <rect x="340" y="48" width="20" height="32" />
    <rect x="362" y="30" width="16" height="50" />
    <rect x="380" y="46" width="20" height="34" />
  </svg>
);

const Volleyball = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
    <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#002147" strokeWidth="4" />
    <path
      d="M50 4 C38 22 38 78 50 96"
      fill="none"
      stroke="#002147"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M8 30 C32 36 68 36 92 30"
      fill="none"
      stroke="#0057B8"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M8 70 C32 64 68 64 92 70"
      fill="none"
      stroke="#0057B8"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M50 4 C34 26 20 46 8 70"
      fill="none"
      stroke="#FFD100"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M50 96 C34 74 20 54 8 30"
      fill="none"
      stroke="#FFD100"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-vball-navy via-[#003366] to-vball-blue text-white">
      <StadiumLights />

      {/* Floating volleyballs */}
      <div className="absolute right-6 top-10 w-24 h-24 opacity-95 animate-float">
        <Volleyball />
      </div>
      <div className="absolute -right-2 bottom-24 w-14 h-14 opacity-40 animate-float-slow">
        <Volleyball />
      </div>

      <NairobiSkyline />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 px-5 pt-10 pb-12 max-w-md mx-auto"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-vball-yellow backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-vball-yellow animate-pulse" />
            Live · Nairobi&apos;s Volleyball Community
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-4 text-4xl font-black tracking-tight leading-[1.05]"
        >
          VOLLEYBALL
          <span className="block text-vball-yellow">MTAA NAIROBI</span>
        </motion.h1>

        <motion.p variants={item} className="mt-3 text-lg font-bold text-white/95">
          Play. Compete. Connect.
        </motion.p>
        <motion.p variants={item} className="text-sm text-white/70 mt-1">
          Live Volleyball. Love Mtaa.
        </motion.p>

        <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tournaments"
            className="inline-flex items-center gap-2 rounded-xl bg-vball-yellow px-5 py-3 text-sm font-bold text-vball-navy shadow-lg shadow-vball-yellow/25 transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <Play size={16} fill="currentColor" />
            Explore Tournaments
          </Link>
          <Link
            href="/calendar"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20 active:scale-[0.98]"
          >
            <CalendarDays size={16} />
            Open Calendar
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-6 flex items-center gap-4 text-[11px] text-white/60"
        >
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} className="text-vball-yellow" /> Nairobi · Kenya
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Courts live now
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
