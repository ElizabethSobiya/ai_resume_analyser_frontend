export interface ExtractedSkills {
  technicalSkills: string[];
  frameworks: string[];
  languages: string[];
  tools: string[];
  softSkills: string[];
  yearsOfExperience?: number;
  currentRole?: string;
  education?: string[];
  certifications?: string[];
}

export interface SkillGap {
  missing: string[];
  matched: string[];
  partial: string[];
}

export interface ResumeData {
  id: string;
  fileName: string;
  extractedSkills: ExtractedSkills;
  vectorId: string | null;
  createdAt: string;
}

export interface JobMatchResult {
  id: string;
  resumeId: string;
  jobId: string;
  jobTitle: string;
  similarityScore: number;
  skillGaps: SkillGap;
  matchedSkills: string[];
  interviewQuestions: string[];
  recommendations: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}
