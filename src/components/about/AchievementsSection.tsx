
const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-12 slide-in-left opacity-0 -translate-x-full transition-all duration-700 delay-1300">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
          Impact & Achievements
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        <p className="text-[#8b949e] mt-4 text-lg">Measurable results in technology innovation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
          <div className="text-4xl font-bold text-blue-400 mb-2">20+</div>
          <p className="text-[#8b949e] font-medium">Projects Delivered</p>
          <p className="text-xs text-[#7d8590] mt-1">Across multiple domains</p>
        </div>
        <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2">
          <div className="text-4xl font-bold text-green-400 mb-2">3+</div>
          <p className="text-[#8b949e] font-medium">Years Experience</p>
          <p className="text-xs text-[#7d8590] mt-1">In cutting-edge tech</p>
        </div>
        <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2">
          <div className="text-4xl font-bold text-purple-400 mb-2">15+</div>
          <p className="text-[#8b949e] font-medium">Technologies</p>
          <p className="text-xs text-[#7d8590] mt-1">Full-stack expertise</p>
        </div>
        <div className="text-center p-6 glass-effect border-[#30363d] rounded-lg hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2">
          <div className="text-4xl font-bold text-cyan-400 mb-2">5+</div>
          <p className="text-[#8b949e] font-medium">AI/ML Solutions</p>
          <p className="text-xs text-[#7d8590] mt-1">Real-world applications</p>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-blue-500/30 transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-3">🏆 Notable Projects</h3>
          <ul className="space-y-2 text-[#8b949e]">
            <li>• ThoraxIQ: AI chest X-ray diagnostic system</li>
            <li>• Smart Agriculture IoT platform with Azure integration</li>
            <li>• Hotel price prediction ML system</li>
            <li>• Disease spread simulation and analysis tools</li>
          </ul>
        </div>
        
        <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-green-500/30 transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-3">🌟 Leadership & Community</h3>
          <ul className="space-y-2 text-[#8b949e]">
            <li>• Active member of Karatina Innovation Club</li>
            <li>• Contributing member of Akiliedge Tech Network</li>
            <li>• Mentor for junior developers and students</li>
            <li>• Tech workshop organizer and speaker</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
