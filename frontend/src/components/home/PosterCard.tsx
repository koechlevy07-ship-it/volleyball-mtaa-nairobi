"use client";

import Link from "next/link";

interface PosterCardProps {
  id: string;
  title: string;
  image?: string;
}

export const PosterCard = ({ id, title, image }: PosterCardProps) => {
  return (
    <Link href={`/posters/${id}`} className="snap-start flex-shrink-0 w-32 block">
      <div className="bg-white rounded-xl shadow-card border border-gray-100 p-2 text-center hover:shadow-soft transition-shadow">
        <div className="w-full h-32 bg-gradient-to-br from-vball-yellow to-vball-blue rounded-lg relative mb-2 flex items-center justify-center text-white text-xs font-bold p-1 text-center">
          {title}
        </div>
        <span className="text-xs font-medium text-gray-700 line-clamp-1">{title}</span>
      </div>
    </Link>
  );
};