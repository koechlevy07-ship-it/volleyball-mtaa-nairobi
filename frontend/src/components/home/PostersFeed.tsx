"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, MapPin, ChevronRight } from "lucide-react";
import { MOCK_POSTERS } from "./data";

export const PostersFeed = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-vball-blue/10 text-vball-blue">
            <Heart size={14} />
          </span>
          <h3 className="font-bold text-lg text-vball-navy">Posters Feed</h3>
        </div>
        <Link href="/posters" className="flex items-center text-sm font-semibold text-vball-blue hover:underline">
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="space-y-4">
        {MOCK_POSTERS.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/posters/${p.id}`} className="block group">
              <div className="rounded-2xl bg-white border border-gray-100 shadow-card overflow-hidden hover:shadow-soft transition-shadow">
                {/* IG header */}
                <div className="flex items-center gap-2.5 p-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-vball-yellow to-vball-blue text-vball-navy text-[11px] font-black">
                    {p.organizer.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-vball-navy truncate">{p.organizer}</p>
                    <p className="flex items-center gap-1 text-[10px] text-gray-400">
                      <MapPin size={9} /> {p.location} · {p.time}
                    </p>
                  </div>
                  <MoreVertical size={18} className="text-gray-400" />
                </div>

                {/* Poster image */}
                <div className={`relative h-52 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/15 blur-xl" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h4 className="text-2xl font-black text-white text-center tracking-tight drop-shadow-md">
                      {p.title}
                    </h4>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 p-3 pb-1">
                  <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50">
                    <Heart size={16} fill="currentColor" /> {p.likes}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-vball-navy hover:bg-vball-bg">
                    <MessageCircle size={16} /> {p.comments}
                  </span>
                  <span className="ml-auto rounded-full px-3 py-1.5 text-xs font-bold text-vball-navy hover:bg-vball-bg">
                    <Share2 size={16} />
                  </span>
                  <span className="rounded-full px-3 py-1.5 text-xs font-bold text-vball-navy hover:bg-vball-bg">
                    <Bookmark size={16} />
                  </span>
                </div>

                {/* Caption */}
                <p className="px-3 pb-3 pt-1 text-xs text-gray-600 leading-relaxed">
                  <span className="font-bold text-vball-navy">{p.organizer} </span>
                  {p.caption}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
