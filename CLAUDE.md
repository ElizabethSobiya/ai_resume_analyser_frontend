# Frontend - Resume Analyzer UI

## Tech Stack
- React 19 + TypeScript
- Vite for build tooling
- Tailwind CSS v4 for styling
- Zustand for state management
- React Hook Form + Zod for forms
- Recharts for data visualization
- Framer Motion for animations

## Important Rules
- Use Tailwind utility classes for styling
- Custom UI components are in `src/components/ui/`
- Call backend API at http://localhost:3001/api/v1
- Use the Zustand store for shared state
- Handle loading and error states in all components

## Project Structure
```
src/
├── components/
│   ├── ui/              # Base UI components (Button, Card, Badge, etc.)
│   ├── ResumeUpload.tsx # Resume upload with drag-and-drop
│   ├── SkillBadges.tsx  # Skill display with color coding
│   ├── JobMatcher.tsx   # Job matching interface
│   ├── SimilarityScore.tsx # Animated score display
│   ├── SkillGapChart.tsx   # Skills comparison chart
│   └── InterviewQuestions.tsx # Interview prep accordion
├── lib/
│   ├── api.ts           # API client (axios)
│   └── utils.ts         # Utility functions
├── store/
│   └── resumeStore.ts   # Zustand state store
├── types/
│   └── index.ts         # TypeScript interfaces
├── App.tsx              # Main application
└── main.tsx             # Entry point
```

## Running Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Variables
Create `.env` file:
```
VITE_API_BASE_URL=http://localhost:3001/api/v1
```

## Component Guidelines
- Use `cn()` utility from `lib/utils.ts` for conditional classes
- All colors follow Tailwind's slate/blue palette
- Skill badges use color coding:
  - Technical Skills: Blue
  - Frameworks: Purple
  - Tools: Orange
  - Soft Skills: Pink

## Build for Production
```bash
npm run build
npm run preview
```
