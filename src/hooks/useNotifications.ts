import create from 'zustand';

interface NotificationsState {
  isOpen: boolean;
  hasUnread: boolean;
  toggleNotifications: () => void;
  markAllRead: () => void;
}

export const useNotifications = create<NotificationsState>((set) => ({
  isOpen: false,
  hasUnread: true,
  toggleNotifications: () => set((state) => ({ isOpen: !state.isOpen })),
  markAllRead: () => set({ hasUnread: false }),
}));