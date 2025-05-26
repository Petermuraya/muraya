
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, Download, User, Award, Briefcase, Star } from 'lucide-react';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Parallax and scroll effects
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      
      parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

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
    <div className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#21262d]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23f0f6fc&quot; fill-opacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 scroll-animate opacity-0">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">About Peter Muraya</h1>
              <p className="text-xl text-[#7d8590] max-w-2xl mx-auto">
                IoT & Cloud Solutions Developer passionate about technology for global development and digital innovation
              </p>
            </div>

            {/* Profile Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 scroll-animate opacity-0">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face" 
                  alt="Peter Muraya Ndung'u" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-2xl border border-[#30363d] hover:shadow-blue-500/20 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">My Story</h2>
                </div>
                
                <p className="text-lg text-[#8b949e] leading-relaxed">
                  I'm Peter Muraya Ndung'u (also known as Sammy Peter), an IoT & Cloud Solutions 
                  Developer with a passion for leveraging technology to create positive global impact. 
                  Currently pursuing my BSc in Information Technology, graduating in September 2025.
                </p>
                
                <p className="text-lg text-[#8b949e] leading-relaxed">
                  My expertise spans Python, JavaScript, TypeScript, SQL, Firebase, Azure IoT, React, 
                  Django, FastAPI, and more. I specialize in smart agriculture, health tech, accessibility 
                  solutions, and environmental protection projects.
                </p>
                
                <p className="text-lg text-[#8b949e] leading-relaxed">
                  Recently relocated from Karatina to Nairobi, Kenya, I'm actively involved in leadership 
                  roles at Karatina Innovation Club and Akiliedge Tech Network. Currently working on 
                  ThoraxIQ, an AI-powered chest X-ray abnormality detection system.
                </p>
                
                <Button className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>

            {/* Enhanced Skills Section */}
            <div className="mb-20 scroll-animate opacity-0">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-8 text-center">Technical Skills</h2>
              
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

            {/* Certifications Section */}
            <div className="mb-20 scroll-animate opacity-0">
              <div className="flex items-center space-x-3 mb-8 justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Education & Certifications</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <Card key={index} className="p-6 text-center glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div className="text-4xl mb-4">{cert.icon}</div>
                    <h3 className="text-lg font-semibold text-[#c9d1d9] mb-2">{cert.name}</h3>
                    <p className="text-blue-400 font-medium mb-1">{cert.issuer}</p>
                    <p className="text-sm text-[#7d8590]">{cert.year}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Experience Section */}
            <div className="mb-20 scroll-animate opacity-0">
              <div className="flex items-center space-x-3 mb-8 justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Professional Experience</h2>
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

            {/* Testimonials Section */}
            <div className="mb-20 scroll-animate opacity-0">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-8 text-center">What People Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#8b949e] mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-[#c9d1d9]">{testimonial.name}</p>
                      <p className="text-sm text-[#7d8590]">{testimonial.position}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Values Section */}
            <div className="text-center scroll-animate opacity-0">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-8">What Drives Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                  <h3 className="text-xl font-semibold text-[#c9d1d9] mb-4">Global Development</h3>
                  <p className="text-[#8b949e]">
                    Using technology to create solutions that address global challenges and promote inclusive development.
                  </p>
                </Card>
                
                <Card className="p-6 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                  <h3 className="text-xl font-semibold text-[#c9d1d9] mb-4">Innovation</h3>
                  <p className="text-[#8b949e]">
                    Exploring cutting-edge technologies like AI, IoT, and cloud computing to build impactful solutions.
                  </p>
                </Card>
                
                <Card className="p-6 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                  <h3 className="text-xl font-semibold text-[#c9d1d9] mb-4">Social Impact</h3>
                  <p className="text-[#8b949e]">
                    Committed to projects in health tech, smart agriculture, and accessibility solutions for positive change.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default About;
