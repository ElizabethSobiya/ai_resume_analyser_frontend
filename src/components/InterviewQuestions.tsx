import { useState } from 'react';
import { Copy, Check, MessageSquare } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/Accordion';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';

interface InterviewQuestionsProps {
  questions: string[];
  recommendations?: string[];
}

export function InterviewQuestions({ questions, recommendations }: InterviewQuestionsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const copyAllQuestions = async () => {
    const text = questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      toast.success('All questions copied');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          Interview Questions
        </h3>
        <Button variant="outline" size="sm" onClick={copyAllQuestions}>
          <Copy className="h-4 w-4 mr-2" />
          Copy All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['q-0']}>
        {questions.map((question, index) => (
          <AccordionItem key={index} value={`q-${index}`}>
            <AccordionTrigger value={`q-${index}`}>
              <span className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-left">{question}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent value={`q-${index}`}>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(question, index)}
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="h-4 w-4 mr-1 text-green-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {recommendations && recommendations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
          <ul className="space-y-3">
            {recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-medium shrink-0">
                  {index + 1}
                </span>
                <span className="text-slate-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
