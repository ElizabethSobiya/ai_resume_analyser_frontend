import { create } from 'zustand';
import type { ResumeData, JobMatchResult } from '../types';

interface ResumeStore {
  currentResume: ResumeData | null;
  currentMatch: JobMatchResult | null;
  isUploading: boolean;
  isMatching: boolean;
  uploadProgress: number;

  setCurrentResume: (resume: ResumeData | null) => void;
  setCurrentMatch: (match: JobMatchResult | null) => void;
  setUploading: (status: boolean) => void;
  setMatching: (status: boolean) => void;
  setUploadProgress: (progress: number | ((prev: number) => number)) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  currentResume: null,
  currentMatch: null,
  isUploading: false,
  isMatching: false,
  uploadProgress: 0,

  setCurrentResume: (resume) => set({ currentResume: resume }),
  setCurrentMatch: (match) => set({ currentMatch: match }),
  setUploading: (status) => set({ isUploading: status }),
  setMatching: (status) => set({ isMatching: status }),
  setUploadProgress: (progress) => set((state) => ({
    uploadProgress: typeof progress === 'function' ? progress(state.uploadProgress) : progress
  })),
  reset: () => set({
    currentResume: null,
    currentMatch: null,
    isUploading: false,
    isMatching: false,
    uploadProgress: 0,
  }),
}));
