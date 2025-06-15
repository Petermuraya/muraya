
const FunFactsSection = () => {
  return (
    <section id="fun-facts" className="py-12 scale-in opacity-0 scale-75 transition-all duration-700 delay-700">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
          Beyond the Code
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-effect border-[#30363d] rounded-lg p-6 text-center hover:border-red-500/30 transition-all duration-300 hover:-translate-y-2">
          <div className="text-4xl mb-4">☕</div>
          <h3 className="text-lg font-semibold text-white mb-2">Coffee Enthusiast</h3>
          <p className="text-[#8b949e] text-sm">Fueled by coffee and powered by curiosity. My best code comes after the perfect cup.</p>
        </div>
        
        <div className="glass-effect border-[#30363d] rounded-lg p-6 text-center hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-white mb-2">Continuous Learner</h3>
          <p className="text-[#8b949e] text-sm">Always exploring new technologies, frameworks, and methodologies to stay ahead of the curve.</p>
        </div>
        
        <div className="glass-effect border-[#30363d] rounded-lg p-6 text-center hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-lg font-semibold text-white mb-2">Global Thinker</h3>
          <p className="text-[#8b949e] text-sm">Passionate about using technology to solve global challenges, especially in developing regions.</p>
        </div>
        
        <div className="glass-effect border-[#30363d] rounded-lg p-6 text-center hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
          <div className="text-4xl mb-4">🎵</div>
          <h3 className="text-lg font-semibold text-white mb-2">Music Lover</h3>
          <p className="text-[#8b949e] text-sm">Coding sessions are always better with the right soundtrack. Music helps me think creatively.</p>
        </div>
      </div>
    </section>
  );
};

export default FunFactsSection;
