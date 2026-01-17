import type { ExtractedSkills } from '../types';
import { Badge } from './ui/Badge';

interface SkillBadgesProps {
  skills: ExtractedSkills;
  compact?: boolean;
}

export function SkillBadges({ skills, compact = false }: SkillBadgesProps) {
  const skillCategories = [
    { label: 'Technical Skills', skills: skills.technicalSkills, variant: 'default' as const },
    { label: 'Frameworks', skills: skills.frameworks, variant: 'purple' as const },
    { label: 'Tools', skills: skills.tools, variant: 'orange' as const },
    { label: 'Soft Skills', skills: skills.softSkills, variant: 'pink' as const },
    { label: 'Languages', skills: skills.languages, variant: 'secondary' as const },
  ];

  const filteredCategories = skillCategories.filter(cat => cat.skills.length > 0);

  if (compact) {
    const allSkills = filteredCategories.flatMap(cat =>
      cat.skills.map(skill => ({ skill, variant: cat.variant }))
    );

    return (
      <div className="flex flex-wrap gap-1.5">
        {allSkills.slice(0, 15).map(({ skill, variant }, index) => (
          <Badge key={`${skill}-${index}`} variant={variant}>
            {skill}
          </Badge>
        ))}
        {allSkills.length > 15 && (
          <Badge variant="secondary">+{allSkills.length - 15} more</Badge>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredCategories.map(({ label, skills: categorySkills, variant }) => (
        <div key={label}>
          <h4 className="text-sm font-medium text-slate-600 mb-2">{label}</h4>
          <div className="flex flex-wrap gap-1.5">
            {categorySkills.map((skill, index) => (
              <Badge key={`${skill}-${index}`} variant={variant}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}

      {skills.yearsOfExperience && (
        <div className="pt-2 border-t">
          <span className="text-sm text-slate-600">
            Experience: <strong>{skills.yearsOfExperience} years</strong>
          </span>
        </div>
      )}

      {skills.currentRole && (
        <div>
          <span className="text-sm text-slate-600">
            Current Role: <strong>{skills.currentRole}</strong>
          </span>
        </div>
      )}

      {skills.education && skills.education.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-600 mb-1">Education</h4>
          <ul className="text-sm text-slate-700 list-disc list-inside">
            {skills.education.map((edu, i) => (
              <li key={i}>{edu}</li>
            ))}
          </ul>
        </div>
      )}

      {skills.certifications && skills.certifications.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-600 mb-1">Certifications</h4>
          <div className="flex flex-wrap gap-1.5">
            {skills.certifications.map((cert, i) => (
              <Badge key={i} variant="success">{cert}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
