
const JourneySection = () => {
  return (
    <section id="journey" className="py-12 fade-in-up opacity-0 translate-y-8 transition-all duration-700 delay-600">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
          My Journey
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Education */}
          <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🎓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Academic Foundation</h3>
                <p className="text-blue-400 font-medium mb-2">BSc Information Technology - Karatina University (Expected 2025)</p>
                <p className="text-[#8b949e] leading-relaxed">
                  Currently pursuing a comprehensive degree in Information Technology, with focus on software development, 
                  systems analysis, and emerging technologies. Maintaining excellent academic performance while actively 
                  participating in innovation clubs and tech communities.
                </p>
              </div>
            </div>
          </div>

          {/* Early Interest */}
          <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🌟</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Early Passion for Technology</h3>
                <p className="text-green-400 font-medium mb-2">From Curiosity to Innovation</p>
                <p className="text-[#8b949e] leading-relaxed">
                  My journey into technology began with a fascination for how things work. This curiosity evolved into 
                  a passion for creating solutions that solve real problems. I started with basic programming and 
                  gradually expanded into AI, IoT, and cloud technologies, always with a focus on social impact.
                </p>
              </div>
            </div>
          </div>

          {/* Current Focus */}
          <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Current Endeavors</h3>
                <p className="text-purple-400 font-medium mb-2">Building the Future Today</p>
                <p className="text-[#8b949e] leading-relaxed">
                  Today, I'm actively working on multiple projects that combine AI, IoT, and cloud technologies. 
                  From developing ThoraxIQ for medical diagnostics to creating smart agriculture solutions, 
                  I'm committed to building technology that creates meaningful impact in African communities and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
