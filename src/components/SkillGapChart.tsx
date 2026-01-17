import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { SkillGap } from '../types';
import { Badge } from './ui/Badge';

interface SkillGapChartProps {
  skillGaps: SkillGap;
}

export function SkillGapChart({ skillGaps }: SkillGapChartProps) {
  const data = [
    { name: 'Matched', count: skillGaps.matched.length, color: '#22c55e' },
    { name: 'Partial', count: skillGaps.partial.length, color: '#eab308' },
    { name: 'Missing', count: skillGaps.missing.length, color: '#ef4444' },
  ];

  const totalSkills = skillGaps.matched.length + skillGaps.partial.length + skillGaps.missing.length;

  return (
    <div className="space-y-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 'dataMax']} />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip
              formatter={(value) => [`${value} skills`, '']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-green-800">Matched Skills</h4>
            <span className="text-lg font-bold text-green-600">
              {skillGaps.matched.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {skillGaps.matched.map((skill, i) => (
              <Badge key={i} variant="success">{skill}</Badge>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-yellow-800">Partial Match</h4>
            <span className="text-lg font-bold text-yellow-600">
              {skillGaps.partial.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {skillGaps.partial.map((skill, i) => (
              <Badge key={i} variant="warning">{skill}</Badge>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-red-800">Missing Skills</h4>
            <span className="text-lg font-bold text-red-600">
              {skillGaps.missing.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {skillGaps.missing.map((skill, i) => (
              <Badge key={i} variant="destructive">{skill}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-slate-500">
        Total required skills: <strong>{totalSkills}</strong> |
        Match rate: <strong>{totalSkills > 0 ? Math.round((skillGaps.matched.length / totalSkills) * 100) : 0}%</strong>
      </div>
    </div>
  );
}
