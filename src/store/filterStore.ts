import { create } from 'zustand';

interface FilterState {
  travelers: number;
  budget: number;
  travelType: string;
  travelDate: string; // New: Travel date
  duration: number; // New: Trip duration in days
  starRating: number; // New: Minimum star rating (1-5)
  preference: string; // New: Preference (e.g., Beach, Mountains)
  setTravelers: (travelers: number) => void;
  setBudget: (budget: number) => void;
  setTravelType: (travelType: string) => void;
  setTravelDate: (travelDate: string) => void;
  setDuration: (duration: number) => void;
  setStarRating: (starRating: number) => void;
  setPreference: (preference: string) => void;
}

export const filterStore = create<FilterState>((set) => ({
  travelers: 1,
  budget: 5000,
  travelType: 'Domestic',
  travelDate: new Date().toISOString().split('T')[0], // Default to today
  duration: 3,
  starRating: 3,
  preference: 'Any',
  setTravelers: (travelers) => set({ travelers }),
  setBudget: (budget) => set({ budget }),
  setTravelType: (travelType) => set({ travelType }),
  setTravelDate: (travelDate) => set({ travelDate }),
  setDuration: (duration) => set({ duration }),
  setStarRating: (starRating) => set({ starRating }),
  setPreference: (preference) => set({ preference }),
}));