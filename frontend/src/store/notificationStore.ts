import { create } from 'zustand';

export interface Notification {
  id: string;
  type: 'tournament' | 'comment' | 'announcement' | 'system';
  title: string;
  message: string;
  link?: string;
  timestamp: string;
  read: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    {
      id: '1',
      type: 'tournament',
      title: 'Kasarani Open 2025',
      message: 'Tournament starts tomorrow! Get ready to play.',
      link: '/tournaments/1',
      timestamp: '2 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'comment',
      title: 'New reply to your comment',
      message: 'Brian replied to your comment on Kasarani Open.',
      link: '/tournaments/1',
      timestamp: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'announcement',
      title: 'Venue change',
      message: 'The venue for Umoja Cup has been updated to Umoja Sports Grounds.',
      link: '/announcements/2',
      timestamp: '3 hours ago',
      read: true,
    },
    {
      id: '4',
      type: 'system',
      title: 'Welcome to Volleyball Mtaa!',
      message: 'Thank you for joining the community. Check out the calendar for events.',
      link: '/calendar',
      timestamp: '1 day ago',
      read: true,
    },
  ],
  
  get unreadCount() {
    return this.notifications.filter(n => !n.read).length;
  },
  
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
  })),

  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ),
  })),

  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
  })),

  clearAll: () => set({ notifications: [] }),
}));