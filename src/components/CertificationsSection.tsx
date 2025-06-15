
import { Card } from '@/components/ui/card';
import { Award, Calendar, ExternalLink } from 'lucide-react';

const CertificationsSection = () => {
  const certifications = [
    {
      name: "BSc Information Technology",
      issuer: "Karatina University",
      year: "Expected September 2025",
      icon: "🎓",
      description: "Comprehensive study in IT systems, software development, and emerging technologies.",
      status: "In Progress"
    },
    {
      name: "Azure IoT Developer",
      issuer: "Microsoft Azure",
      year: "2024",
      icon: "☁️",
      description: "Specialized certification in Azure IoT Hub, device management, and cloud solutions.",
      status: "Certified"
    },
    {
      name: "Python for Data Science",
      issuer: "Multiple Platforms",
      year: "2023",
      icon: "🐍",
      description: "Advanced Python programming for data analysis, visualization, and machine learning.",
      status: "Certified"
    },
    {
      name: "Full Stack Web Development",
      issuer: "Various Platforms",
      year: "2023",
      icon: "💻",
      description: "Complete web development stack including React, Node.js, and database management.",
      status: "Certified"
    },
    {
      name: "AI & Machine Learning",
      issuer: "Online Courses",
      year: "2024",
      icon: "🤖",
      description: "Machine learning algorithms, neural networks, and AI application development.",
      status: "Certified"
    },
    {
      name: "Cybersecurity Fundamentals",
      issuer: "Security Institute",
      year: "2024",
      icon: "🔒",
      description: "Network security, ethical hacking, and cybersecurity best practices.",
      status: "Certified"
    }
  ];

  return (
    <div className="mb-20 scroll-animate fade-in-up opacity-0 translate-y-8 transition-all duration-700">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent scroll-text-effect">
            Education & Certifications
          </h2>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
        <p className="text-lg text-[#7d8590] max-w-2xl mx-auto">
          Continuous learning and professional development in cutting-edge technologies
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-in">
        {certifications.map((cert, index) => (
          <Card 
            key={index} 
            className="p-6 text-center glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/10 group scale-in opacity-0 scale-75"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Status Badge */}
            <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
              cert.status === 'Certified' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            }`}>
              {cert.status}
            </div>

            {/* Icon with animation */}
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {cert.icon}
            </div>
            
            {/* Certificate Name */}
            <h3 className="text-lg font-semibold text-[#c9d1d9] mb-2 group-hover:text-blue-300 transition-colors duration-300">
              {cert.name}
            </h3>
            
            {/* Issuer */}
            <p className="text-blue-400 font-medium mb-2 flex items-center justify-center">
              <ExternalLink className="w-4 h-4 mr-1" />
              {cert.issuer}
            </p>
            
            {/* Year */}
            <p className="text-sm text-[#7d8590] mb-3 flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-1" />
              {cert.year}
            </p>
            
            {/* Description */}
            <p className="text-sm text-[#8b949e] leading-relaxed">
              {cert.description}
            </p>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CertificationsSection;
