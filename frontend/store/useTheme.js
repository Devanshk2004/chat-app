import { create } from "zustand";

const storedTheme =
  typeof window !== "undefined" ? localStorage.getItem("chat-theme") || "coffee" : "coffee";

export const useThemeStore = create((set) => ({
  theme: storedTheme,
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chat-theme", theme);
    }
    set({ theme });
  },
}));
