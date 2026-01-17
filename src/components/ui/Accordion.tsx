import { useState, createContext, useContext, type ReactNode, type HTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string[];
  children: ReactNode;
}

function Accordion({ type = 'single', defaultValue = [], children, className, ...props }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultValue));

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        if (type === 'single') {
          next.clear();
        }
        next.add(value);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn('space-y-2', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

function AccordionItem({ value, children, className, ...props }: AccordionItemProps) {
  return (
    <div
      className={cn('rounded-lg border bg-white', className)}
      data-value={value}
      {...props}
    >
      {children}
    </div>
  );
}

interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  value: string;
}

function AccordionTrigger({ children, value, className, ...props }: AccordionTriggerProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionTrigger must be used within Accordion');

  const isOpen = context.openItems.has(value);

  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center justify-between p-4 font-medium text-left transition-colors hover:bg-slate-50',
        className
      )}
      onClick={() => context.toggleItem(value)}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}

interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  value: string;
}

function AccordionContent({ children, value, className, ...props }: AccordionContentProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionContent must be used within Accordion');

  const isOpen = context.openItems.has(value);

  if (!isOpen) return null;

  return (
    <div
      className={cn('overflow-hidden border-t px-4 pb-4 pt-2', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
