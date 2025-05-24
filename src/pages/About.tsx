
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, Download, User } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'React/Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js/Express', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'AWS/Cloud', level: 75 },
    { name: 'MongoDB/SQL', level: 85 },
  ];

  const experience = [
    {
      title: "Senior Full-Stack Developer",
      company: "Tech Company Inc.",
      period: "2022 - Present",
      description: "Led development of scalable web applications, mentored junior developers, and implemented best practices for code quality and performance."
    },
    {
      title: "Software Engineer",
      company: "Startup Solutions",
      period: "2020 - 2022",
      description: "Developed and maintained multiple client projects using React, Node.js, and cloud technologies. Collaborated with cross-functional teams."
    },
    {
      title: "Junior Developer",
      company: "Digital Agency",
      period: "2019 - 2020",
      description: "Built responsive websites and web applications. Gained experience in modern JavaScript frameworks and agile development practices."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About Me</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate developer with a love for creating elegant solutions to complex problems
            </p>
          </div>

          {/* Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=600&fit=crop" 
                alt="Profile" 
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">My Story</h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience creating 
                digital solutions that make a difference. My journey began with curiosity about 
                how websites work, and it has evolved into a career dedicated to crafting 
                exceptional user experiences.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                I specialize in React, TypeScript, and Node.js, but I'm always eager to learn 
                new technologies. I believe in writing clean, maintainable code and creating 
                applications that are not just functional, but delightful to use.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing 
                to open source projects, or sharing knowledge through blog posts and mentoring.
              </p>
              
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-20">
            <div className="flex items-center space-x-3 mb-8 justify-center">
              <Calendar className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
            </div>
            
            <div className="space-y-6">
              {experience.map((job, index) => (
                <Card key={index} className="p-6 border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-lg text-blue-600 font-medium">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mt-2 md:mt-0">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{job.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What Drives Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  Always exploring new technologies and approaches to solve problems in creative ways.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality</h3>
                <p className="text-gray-600">
                  Committed to writing clean, maintainable code and delivering exceptional user experiences.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Growth</h3>
                <p className="text-gray-600">
                  Continuously learning and sharing knowledge with the developer community.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
