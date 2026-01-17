import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, AlertCircle, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { SimilarityScore } from './SimilarityScore';
import { SkillGapChart } from './SkillGapChart';
import { InterviewQuestions } from './InterviewQuestions';
import { useResumeStore } from '../store/resumeStore';
import { jobApi } from '../lib/api';
import toast from 'react-hot-toast';

export function JobMatcher() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [company, setCompany] = useState('');
  const [activeTab, setActiveTab] = useState<'match' | 'gaps' | 'questions'>('match');

  const {
    currentResume,
    currentMatch,
    isMatching,
    setMatching,
    setCurrentMatch,
  } = useResumeStore();

  const handleMatch = async () => {
    if (!currentResume) {
      toast.error('Please upload a resume first');
      return;
    }

    if (!jobTitle.trim()) {
      toast.error('Please enter a job title');
      return;
    }

    if (jobDescription.trim().length < 50) {
      toast.error('Job description must be at least 50 characters');
      return;
    }

    setMatching(true);

    try {
      const result = await jobApi.match({
        resumeId: currentResume.id,
        jobTitle: jobTitle.trim(),
        jobDescription: jobDescription.trim(),
        company: company.trim() || undefined,
      });

      setCurrentMatch(result);
      setActiveTab('match');
      toast.success('Job matched successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to match job');
    } finally {
      setMatching(false);
    }
  };

  const tabs = [
    { id: 'match', label: 'Match Score' },
    { id: 'gaps', label: 'Skill Gaps' },
    { id: 'questions', label: 'Interview Prep' },
  ] as const;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600" />
          Job Matcher
        </CardTitle>
        <CardDescription>
          Enter a job description to analyze compatibility
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!currentResume ? (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm">Upload a resume first to match against job descriptions</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    disabled={isMatching}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g., Google"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    disabled={isMatching}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Job Description *
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  rows={6}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  disabled={isMatching}
                />
                <p className="text-xs text-slate-500 mt-1">
                  {jobDescription.length} characters (minimum 50)
                </p>
              </div>

              <Button
                className="w-full"
                onClick={handleMatch}
                isLoading={isMatching}
                disabled={!jobTitle.trim() || jobDescription.length < 50}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isMatching ? 'Analyzing Match...' : 'Find Match'}
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {currentMatch && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="pt-6 border-t space-y-4"
                >
                  <div className="flex border-b">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                          activeTab === tab.id
                            ? 'text-blue-600'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {activeTab === 'match' && (
                      <motion.div
                        key="match"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex flex-col items-center py-6"
                      >
                        <h4 className="text-lg font-medium text-slate-900 mb-4">
                          Match with {currentMatch.jobTitle}
                        </h4>
                        <SimilarityScore score={currentMatch.similarityScore} size="lg" />
                        <div className="mt-6 text-center max-w-md">
                          <p className="text-slate-600">
                            Your resume matches <strong>{currentMatch.matchedSkills.length}</strong> skills
                            {currentMatch.skillGaps.missing.length > 0 && (
                              <> with <strong>{currentMatch.skillGaps.missing.length}</strong> skills to improve</>
                            )}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'gaps' && (
                      <motion.div
                        key="gaps"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="py-4"
                      >
                        <SkillGapChart skillGaps={currentMatch.skillGaps} />
                      </motion.div>
                    )}

                    {activeTab === 'questions' && (
                      <motion.div
                        key="questions"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="py-4"
                      >
                        <InterviewQuestions
                          questions={currentMatch.interviewQuestions}
                          recommendations={currentMatch.recommendations}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </CardContent>
    </Card>
  );
}
