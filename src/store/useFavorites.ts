import { create } from "zustand";
import { type Character } from "../../client";

interface FavoritesState {
  favorites: Character[];
  addFavorite: (char: Character) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavorites = create<FavoritesState>((set, get) => ({
  favorites: [],

  addFavorite: (char) => {
    const current = get().favorites;
    if (current.find((c) => c.id === char.id)) return;
    let updated = [char, ...current];
    if (updated.length > 5) {
      updated = updated.slice(0, 5);
    }
    set({ favorites: updated });
  },

  removeFavorite: (id) => {
    set({
      favorites: get().favorites.filter((char) => char.id !== id),
    });
  },

  isFavorite: (id) => {
    return get().favorites.some((char) => char.id === id);
  },
}));
