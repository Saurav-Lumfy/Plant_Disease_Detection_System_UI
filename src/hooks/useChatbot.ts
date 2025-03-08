import create from 'zustand';

interface ChatbotState {
  isOpen: boolean;
  toggleChatbot: () => void;
}

export const useChatbot = create<ChatbotState>((set) => ({
  isOpen: false,
  toggleChatbot: () => set((state) => ({ isOpen: !state.isOpen })),
}));