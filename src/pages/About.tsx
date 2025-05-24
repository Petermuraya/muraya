
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, Download, User, Award, Briefcase, Star } from 'lucide-react';

const About = () => {
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

  const certifications = [
    {
      name: "BSc Information Technology",
      issuer: "Expected September 2025",
      year: "2025",
      icon: "🎓"
    },
    {
      name: "Azure IoT Developer",
      issuer: "Microsoft Azure",
      year: "2024",
      icon: "☁️"
    },
    {
      name: "Python for Data Science",
      issuer: "Various Platforms",
      year: "2023",
      icon: "🐍"
    }
  ];

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

  const testimonials = [
    {
      name: "Innovation Club Member",
      position: "Karatina University",
      text: "Peter's leadership in tech projects has been inspiring. His passion for using technology for social good is evident in every project.",
      rating: 5
    },
    {
      name: "Project Collaborator",
      position: "Akiliedge Tech Network",
      text: "Working with Peter on IoT projects has been amazing. His technical skills and vision for global development are remarkable.",
      rating: 5
    }
  ];

  const skillCategories = [...new Set(skills.map(skill => skill.category))];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About Peter Muraya</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              IoT & Cloud Solutions Developer passionate about technology for global development and digital innovation
            </p>
          </div>

          {/* Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face" 
                alt="Peter Muraya Ndung'u" 
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">My Story</h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm Peter Muraya Ndung'u (also known as Sammy Peter), an IoT & Cloud Solutions 
                Developer with a passion for leveraging technology to create positive global impact. 
                Currently pursuing my BSc in Information Technology, graduating in September 2025.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                My expertise spans Python, JavaScript, TypeScript, SQL, Firebase, Azure IoT, React, 
                Django, FastAPI, and more. I specialize in smart agriculture, health tech, accessibility 
                solutions, and environmental protection projects.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Recently relocated from Karatina to Nairobi, Kenya, I'm actively involved in leadership 
                roles at Karatina Innovation Club and Akiliedge Tech Network. Currently working on 
                ThoraxIQ, an AI-powered chest X-ray abnormality detection system.
              </p>
              
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>

          {/* Enhanced Skills Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Skills</h2>
            
            {skillCategories.map((category) => (
              <div key={category} className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill) => (
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
            ))}
          </div>

          {/* Certifications Section */}
          <div className="mb-20">
            <div className="flex items-center space-x-3 mb-8 justify-center">
              <Award className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Education & Certifications</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{cert.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-blue-600 font-medium mb-1">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.year}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Experience Section */}
          <div className="mb-20">
            <div className="flex items-center space-x-3 mb-8 justify-center">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Professional Experience</h2>
            </div>
            
            <div className="space-y-8">
              {experience.map((job, index) => (
                <Card key={index} className="p-6 border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={job.logo} 
                        alt={`${job.company} logo`}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-lg text-blue-600 font-medium">{job.company}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mt-2 md:mt-0">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{job.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-600">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What People Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What Drives Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Development</h3>
                <p className="text-gray-600">
                  Using technology to create solutions that address global challenges and promote inclusive development.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  Exploring cutting-edge technologies like AI, IoT, and cloud computing to build impactful solutions.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Impact</h3>
                <p className="text-gray-600">
                  Committed to projects in health tech, smart agriculture, and accessibility solutions for positive change.
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
