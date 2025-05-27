
import { Card } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  const experience = [
    {
      title: "IoT & Cloud Solutions Developer",
      company: "Freelance & Project Work",
      period: "2023 - Present",
      description: "Developing IoT solutions for smart agriculture and health tech applications. Working on AI-powered diagnostic systems and cloud-based data analytics platforms.",
      achievements: [
        "Built ThoraxIQ - AI chest X-ray abnormality detection system",
        "Developed smart agriculture IoT platform with real-time monitoring",
        "Created accessibility-focused health tech solutions",
        "Implemented data-driven AI projects including disease spread simulation"
      ],
      logo: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=60&h=60&fit=crop"
    },
    {
      title: "Tech Leadership Roles",
      company: "Karatina Innovation Club & Akiliedge Tech Network",
      period: "2022 - Present",
      description: "Leading tech initiatives and fostering innovation in university and professional tech communities. Mentoring students and organizing tech events.",
      achievements: [
        "Led innovation projects in Karatina Innovation Club",
        "Active member of Akiliedge Tech Network",
        "Organized tech workshops and hackathons",
        "Mentored junior developers in full-stack development"
      ],
      logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=60&h=60&fit=crop"
    },
    {
      title: "Full-Stack Developer",
      company: "Various Projects",
      period: "2021 - 2023",
      description: "Worked on diverse web development projects using modern frameworks. Built responsive applications with focus on user experience and performance.",
      achievements: [
        "Developed hotel price prediction system using ML",
        "Built multiple React applications with modern UI/UX",
        "Implemented Firebase and MongoDB backend solutions",
        "Created data visualization dashboards"
      ],
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=60&h=60&fit=crop"
    }
  ];

  return (
    <div className="mb-20 scroll-animate opacity-0">
      <div className="flex items-center space-x-3 mb-8 justify-center">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Professional Experience
        </h2>
      </div>
      
      <div className="space-y-8">
        {experience.map((job, index) => (
          <Card key={index} className="p-6 border-l-4 border-l-blue-500 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div className="flex items-start space-x-4">
                <img 
                  src={job.logo} 
                  alt={`${job.company} logo`}
                  className="w-12 h-12 rounded-lg object-cover border border-[#30363d]"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#c9d1d9]">{job.title}</h3>
                  <p className="text-lg text-blue-400 font-medium">{job.company}</p>
                </div>
              </div>
              <span className="text-sm text-[#7d8590] bg-[#161b22] px-3 py-1 rounded-full mt-2 md:mt-0 border border-[#30363d]">
                {job.period}
              </span>
            </div>
            <p className="text-[#8b949e] leading-relaxed mb-4">{job.description}</p>
            
            <div>
              <h4 className="font-semibold text-[#c9d1d9] mb-2">Key Achievements:</h4>
              <ul className="list-disc list-inside space-y-1">
                {job.achievements.map((achievement, i) => (
                  <li key={i} className="text-[#8b949e]">{achievement}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
