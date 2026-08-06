"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, PlusCircle, MessageSquare, User } from "lucide-react";

export const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Calendar", icon: Calendar, href: "/calendar" },
    { name: "Create", icon: PlusCircle, href: "/tournaments/create" },
    { name: "Chat", icon: MessageSquare, href: "/chat" },
    { name: "Profile", icon: User, href: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 pb-safe flex justify-between items-center z-50 h-[72px] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (pathname === "/" && item.href === "/");
        return (
          <Link 
            key={item.name} 
            href={item.href} 
            className="flex flex-col items-center gap-1 p-2 rounded-xl transition-colors hover:bg-vball-bg flex-1"
          >
            <item.icon 
              size={24} 
              className={isActive ? "text-vball-blue" : "text-gray-400"} 
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className={`text-[10px] font-medium ${isActive ? "text-vball-blue" : "text-gray-400"}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};