import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ArchiveRecord } from '../data/seedData';

interface WorkspaceState {
  savedRecords: ArchiveRecord[];
  language: string;
  highContrast: boolean;
  wheelchairMode: boolean;
  addRecord: (record: ArchiveRecord) => void;
  removeRecord: (id: string) => void;
  setLanguage: (lang: string) => void;
  toggleHighContrast: () => void;
  toggleWheelchairMode: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      savedRecords: [],
      language: 'en',
      highContrast: false,
      wheelchairMode: false,
      addRecord: (record) => set((state) => ({ 
        savedRecords: state.savedRecords.find(r => r.id === record.id) 
          ? state.savedRecords 
          : [...state.savedRecords, record] 
      })),
      removeRecord: (id) => set((state) => ({ 
        savedRecords: state.savedRecords.filter(r => r.id !== id) 
      })),
      setLanguage: (lang) => set({ language: lang }),
      toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
      toggleWheelchairMode: () => set((state) => ({ wheelchairMode: !state.wheelchairMode })),
    }),
    {
      name: 'heritage-workspace-storage',
    }
  )
);
