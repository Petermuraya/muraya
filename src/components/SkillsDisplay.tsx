
import { Progress } from '@/components/ui/progress';

const SkillsDisplay = () => {
  const skills = [
    { name: 'Python', level: 95, category: 'Programming Languages' },
    { name: 'JavaScript/TypeScript', level: 90, category: 'Programming Languages' },
    { name: 'SQL', level: 85, category: 'Programming Languages' },
    { name: 'React/Next.js', level: 90, category: 'Frontend' },
    { name: 'Django', level: 85, category: 'Backend' },
    { name: 'FastAPI', level: 80, category: 'Backend' },
    { name: 'Azure IoT', level: 85, category: 'Cloud & IoT' },
    { name: 'Firebase', level: 80, category: 'Cloud & IoT' },
    { name: 'MongoDB', level: 75, category: 'Database' },
    { name: 'AI/ML', level: 80, category: 'Artificial Intelligence' },
    { name: 'TensorFlow', level: 75, category: 'Artificial Intelligence' },
    { name: 'Data Analysis', level: 85, category: 'Data Science' },
  ];

  const skillCategories = [...new Set(skills.map(skill => skill.category))];

  return (
    <div className="mb-20 scroll-animate opacity-0">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-8 text-center">
        Technical Skills
      </h2>
      
      {skillCategories.map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold text-[#c9d1d9] mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills
              .filter(skill => skill.category === category)
              .map((skill) => (
                <div key={skill.name} className="space-y-2 glass-effect p-4 rounded-lg hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-[#c9d1d9]">{skill.name}</span>
                    <span className="text-sm text-[#7d8590]">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-3" />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsDisplay;
