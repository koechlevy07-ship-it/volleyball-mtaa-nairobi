"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { 
  ChevronLeft, 
  Bell, 
  Moon, 
  Lock, 
  LogOut, 
  Info, 
  Shield, 
  HelpCircle,
  ChevronRight
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/profile" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Settings</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        {/* Account Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">Account</h3>
          <Card className="divide-y divide-gray-100 p-0 overflow-hidden">
            <Link href="/profile/edit" className="flex items-center justify-between p-4 hover:bg-vball-bg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-vball-blue/10 rounded-lg flex items-center justify-center text-vball-blue">
                  <Lock size={16} />
                </div>
                <span className="text-sm font-medium text-vball-navy">Edit Profile</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <div className="flex items-center justify-between p-4 hover:bg-vball-bg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500">
                  <Bell size={16} />
                </div>
                <span className="text-sm font-medium text-vball-navy">Notifications</span>
              </div>
              <div 
                className={`w-10 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${notifications ? "bg-vball-blue" : "bg-gray-300"}`}
                onClick={() => setNotifications(!notifications)}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifications ? "translate-x-5" : "translate-x-0"}`} />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-vball-bg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500">
                  <Moon size={16} />
                </div>
                <span className="text-sm font-medium text-vball-navy">Dark Mode</span>
              </div>
              <div 
                className={`w-10 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${darkMode ? "bg-vball-blue" : "bg-gray-300"}`}
                onClick={() => setDarkMode(!darkMode)}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${darkMode ? "translate-x-5" : "translate-x-0"}`} />
              </div>
            </div>
          </Card>
        </div>

        {/* Support Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">Support</h3>
          <Card className="divide-y divide-gray-100 p-0 overflow-hidden">
            <Link href="/about" className="flex items-center justify-between p-4 hover:bg-vball-bg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-vball-yellow/20 rounded-lg flex items-center justify-center text-vball-navy">
                  <Info size={16} />
                </div>
                <span className="text-sm font-medium text-vball-navy">About</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link href="/terms" className="flex items-center justify-between p-4 hover:bg-vball-bg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
                  <Shield size={16} />
                </div>
                <span className="text-sm font-medium text-vball-navy">Terms & Privacy</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
            <Link href="/contact" className="flex items-center justify-between p-4 hover:bg-vball-bg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-500/10 rounded-lg flex items-center justify-center text-gray-500">
                  <HelpCircle size={16} />
                </div>
                <span className="text-sm font-medium text-vball-navy">Help & Contact</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          </Card>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full bg-white rounded-xl shadow-card border border-gray-100 p-4 flex items-center justify-center gap-2 text-red-500 font-medium hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Log Out
        </button>

        <p className="text-center text-[10px] text-gray-400 pt-2">
          Version 1.0.0
        </p>

      </main>

      <BottomNav />
    </div>
  );
}