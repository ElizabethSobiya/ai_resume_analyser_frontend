# Resume Analyzer Frontend

Beautiful React frontend for the AI-powered Resume Analyzer.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Animations**: Framer Motion
- **HTTP Client**: Axios

## Features

- Drag-and-drop resume upload (PDF, DOCX, TXT)
- Real-time skill extraction display
- Job description matching with similarity scoring
- Interactive skill gap visualization
- AI-generated interview questions
- Responsive design

## Prerequisites

- Node.js 18+
- Backend API running at http://localhost:3001

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   # Create .env file (already created)
   # Default: VITE_API_BASE_URL=http://localhost:3001/api/v1
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Progress.tsx
│   │   └── Accordion.tsx
│   ├── ResumeUpload.tsx      # Resume upload component
│   ├── SkillBadges.tsx       # Skills display
│   ├── JobMatcher.tsx        # Job matching form
│   ├── SimilarityScore.tsx   # Animated score display
│   ├── SkillGapChart.tsx     # Skills comparison chart
│   └── InterviewQuestions.tsx # Interview prep
├── lib/
│   ├── api.ts                # API client
│   └── utils.ts              # Utility functions
├── store/
│   └── resumeStore.ts        # Zustand store
├── types/
│   └── index.ts              # TypeScript types
├── App.tsx                   # Main component
├── main.tsx                  # Entry point
└── index.css                 # Tailwind imports
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | http://localhost:3001/api/v1 |

## Usage

1. Make sure the backend API is running
2. Open http://localhost:5173 in your browser
3. Upload a resume (PDF, DOCX, or TXT)
4. Wait for AI to extract skills
5. Enter a job description
6. Click "Find Match" to see results

## License

MIT
