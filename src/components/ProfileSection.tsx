
import { Button } from '@/components/ui/button';
import { User, Download } from 'lucide-react';

const ProfileSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 scroll-animate opacity-0">
      <div>
        <img 
          src="https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg" 
          alt="Peter Muraya Ndung'u" 
          className="w-full max-w-md mx-auto rounded-lg shadow-2xl border border-[#30363d] hover:shadow-blue-500/20 transition-all duration-300 object-cover"
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
  );
};

export default ProfileSection;
