import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Progress } from './ui/Progress';
import { SkillBadges } from './SkillBadges';
import { useResumeStore } from '../store/resumeStore';
import { resumeApi } from '../lib/api';
import toast from 'react-hot-toast';
import { cn } from '../lib/utils';

export function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    currentResume,
    isUploading,
    uploadProgress,
    setCurrentResume,
    setUploading,
    setUploadProgress,
    setCurrentMatch,
  } = useResumeStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setCurrentResume(null);
      setCurrentMatch(null);
    }
  }, [setCurrentResume, setCurrentMatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0];
      if (error?.code === 'file-too-large') {
        toast.error('File is too large. Maximum size is 10MB.');
      } else if (error?.code === 'file-invalid-type') {
        toast.error('Invalid file type. Please upload PDF, DOCX, or TXT.');
      } else {
        toast.error('File rejected. Please try again.');
      }
    },
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    try {
      const result = await resumeApi.upload(selectedFile);
      setUploadProgress(100);
      setCurrentResume(result);
      toast.success('Resume analyzed successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload resume');
    } finally {
      clearInterval(progressInterval);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setCurrentResume(null);
    setCurrentMatch(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-600" />
          Upload Resume
        </CardTitle>
        <CardDescription>
          Upload your resume in PDF, DOCX, or TXT format (max 10MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          {!selectedFile && !currentResume ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div
                {...getRootProps()}
                className={cn(
                  'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors',
                  isDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                )}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-3">
                  <div className={cn(
                    'p-4 rounded-full',
                    isDragActive ? 'bg-blue-100' : 'bg-slate-100'
                  )}>
                    <Upload className={cn(
                      'h-8 w-8',
                      isDragActive ? 'text-blue-600' : 'text-slate-400'
                    )} />
                  </div>
                  <div>
                    <p className="text-slate-700 font-medium">
                      {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      or click to browse files
                    </p>
                  </div>
                  <div className="flex gap-2 text-xs text-slate-400">
                    <span>PDF</span>
                    <span>DOCX</span>
                    <span>TXT</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : selectedFile && !currentResume ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border">
                <div className="p-3 rounded-lg bg-blue-100">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                  disabled={isUploading}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} />
                  <p className="text-sm text-slate-500 text-center">
                    Analyzing resume... {uploadProgress}%
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={handleUpload}
                  isLoading={isUploading}
                >
                  {isUploading ? 'Analyzing...' : 'Analyze Resume'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRemove}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          ) : currentResume ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-green-800">Resume Analyzed</p>
                  <p className="text-sm text-green-600">{currentResume.fileName}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRemove}>
                  Upload New
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-slate-900 mb-3">Extracted Skills</h4>
                <SkillBadges skills={currentResume.extractedSkills} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
