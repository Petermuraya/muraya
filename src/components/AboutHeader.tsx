
const AboutHeader = () => {
  return (
    <div className="text-center mb-16 scroll-animate fade-in-up opacity-0 translate-y-8 transition-all duration-700">
      <div className="scroll-scale-header">
        <div className="mb-6">
          <span className="text-6xl mb-4 block animate-float">👨‍💻</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6 scroll-text-effect transition-all duration-1000">
          Peter Muraya
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto mb-8 rounded-full" />
        
        {/* Professional Title */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
            IoT & Cloud Solutions Developer
          </h2>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
              AI/ML Engineer
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
              Full-Stack Developer
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
              Tech Innovator
            </span>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <p className="text-xl md:text-2xl text-[#7d8590] leading-relaxed slide-in-up opacity-0 translate-y-4 transition-all duration-700 delay-300 mb-6">
          Passionate about leveraging technology for global development, inclusion, and digital innovation. 
          Specializing in smart agriculture, health tech, and AI-powered solutions.
        </p>
        
        <p className="text-lg text-[#8b949e] leading-relaxed slide-in-up opacity-0 translate-y-4 transition-all duration-700 delay-500">
          Building scalable IoT ecosystems and cloud-native applications that create meaningful impact 
          across Africa and beyond through innovative technology solutions.
        </p>
      </div>
      
      {/* Call-to-action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 slide-in-up opacity-0 translate-y-4 transition-all duration-700 delay-700">
        <a 
          href="/contact" 
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
        >
          Let's Connect
        </a>
        <a 
          href="/projects" 
          className="px-6 py-3 border border-[#30363d] hover:border-blue-500/50 rounded-lg text-white font-medium transition-all duration-300 hover:bg-blue-500/10 hover:-translate-y-1"
        >
          View My Projects
        </a>
      </div>
    </div>
  );
};

export default AboutHeader;
