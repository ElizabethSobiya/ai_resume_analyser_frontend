import { Toaster } from 'react-hot-toast';
import { ResumeUpload } from './components/ResumeUpload';
import { JobMatcher } from './components/JobMatcher';
import { FileText, Sparkles, Github } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#1e293b',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 text-white">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  AI Resume Analyzer
                </h1>
                <p className="text-sm text-slate-500">
                  Powered by GPT-4o
                </p>
              </div>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Github className="h-5 w-5 text-slate-600" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Analyze Your Resume with AI
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Upload your resume to extract skills, match against job descriptions,
            identify skill gaps, and get AI-generated interview questions.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Analysis</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            <span>Real-time Matching</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
            <span>Interview Prep</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ResumeUpload />
          <JobMatcher />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-white border">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Upload Resume</h3>
            <p className="text-sm text-slate-600">
              Support for PDF, DOCX, and TXT formats up to 10MB
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white border">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">AI Analysis</h3>
            <p className="text-sm text-slate-600">
              GPT-4o extracts skills and matches against job requirements
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white border">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Interview Prep</h3>
            <p className="text-sm text-slate-600">
              Get personalized interview questions based on skill gaps
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t mt-16 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          <p>AI Resume Analyzer - Built with React, Express, and OpenAI GPT-4o</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
