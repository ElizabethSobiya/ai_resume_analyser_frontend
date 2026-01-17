import axios from 'axios';
import type { ApiResponse, ResumeData, JobMatchResult } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const resumeApi = {
  upload: async (file: File): Promise<ResumeData> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<ApiResponse<ResumeData>>('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to upload resume');
    }

    return response.data.data;
  },

  getAll: async (): Promise<ResumeData[]> => {
    const response = await api.get<ApiResponse<ResumeData[]>>('/resumes');
    return response.data.data || [];
  },

  getById: async (id: string): Promise<ResumeData> => {
    const response = await api.get<ApiResponse<ResumeData>>(`/resumes/${id}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Resume not found');
    }
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/resumes/${id}`);
  },
};

export const jobApi = {
  match: async (data: {
    resumeId: string;
    jobTitle: string;
    jobDescription: string;
    company?: string;
  }): Promise<JobMatchResult> => {
    const response = await api.post<ApiResponse<JobMatchResult>>('/jobs/match', data);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to match job');
    }

    return response.data.data;
  },

  findCandidates: async (jobDescription: string, topK: number = 5) => {
    const response = await api.post('/jobs/find-candidates', { jobDescription, topK });
    return response.data.data || [];
  },
};

export default api;
