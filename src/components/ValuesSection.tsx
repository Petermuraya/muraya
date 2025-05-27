
import { Card } from '@/components/ui/card';

const ValuesSection = () => {
  return (
    <div className="text-center scroll-animate opacity-0">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-8">
        What Drives Me
      </h2>
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
  );
};

export default ValuesSection;
