
import { Card } from '@/components/ui/card';
import { Award } from 'lucide-react';

const CertificationsSection = () => {
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

  return (
    <div className="mb-20 scroll-animate opacity-0">
      <div className="flex items-center space-x-3 mb-8 justify-center">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <Award className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Education & Certifications
        </h2>
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
  );
};

export default CertificationsSection;
