"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/home/BottomNav";
import { useNotificationStore } from "@/store/notificationStore";
import { 
  ChevronLeft, 
  Bell, 
  Trophy, 
  MessageSquare, 
  Megaphone, 
  Info, 
  CheckCheck, 
  Trash2 
} from "lucide-react";

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, unreadCount, markAllAsRead, clearAll } = useNotificationStore();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.read) 
    : notifications;

  const getIcon = (type: string) => {
    switch(type) {
      case 'tournament': return <Trophy size={18} className="text-vball-blue" />;
      case 'comment': return <MessageSquare size={18} className="text-green-500" />;
      case 'announcement': return <Megaphone size={18} className="text-vball-yellow" />;
      default: return <Info size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 hover:bg-vball-bg rounded-full transition-colors">
            <ChevronLeft size={24} className="text-vball-navy" />
          </Link>
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-vball-navy" />
            <h1 className="text-lg font-bold text-vball-navy">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={markAllAsRead}
            className="text-xs flex items-center gap-1 text-vball-blue hover:underline"
          >
            <CheckCheck size={16} /> Mark all read
          </button>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        
        {/* Tabs */}
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'all' ? 'bg-vball-blue text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('unread')}
            className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'unread' ? 'bg-vball-blue text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <Card className="p-8 text-center">
            <Bell size={48} className="text-gray-300 mx-auto mb-2" />
            <p className="text-vball-navy font-semibold">All caught up!</p>
            <p className="text-xs text-gray-500">No new notifications right now.</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification) => (
              <Link 
                key={notification.id} 
                href={notification.link || '#'}
                className="block"
                onClick={() => useNotificationStore.getState().markAsRead(notification.id)}
              >
                <Card className={`p-3 flex items-start gap-3 hover:shadow-soft transition-shadow ${!notification.read ? 'bg-vball-blue/5 border-l-4 border-l-vball-blue' : ''}`}>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm line-clamp-1 ${!notification.read ? 'font-bold text-vball-navy' : 'font-medium text-gray-700'}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-vball-blue rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">{notification.message}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{notification.timestamp}</p>
                  </div>
                </Card>
              </Link>
            ))}
            
            {notifications.length > 0 && (
              <button 
                onClick={clearAll}
                className="w-full py-3 text-xs text-red-500 flex items-center justify-center gap-1 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 size={14} /> Clear all notifications
              </button>
            )}
          </div>
        )}

      </main>

      <BottomNav />
    </div>
  );
}