
const PersonalPhilosophySection = () => {
  return (
    <section id="philosophy" className="py-12 slide-in-left opacity-0 -translate-x-full transition-all duration-700 delay-400">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
          My Philosophy
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect border-[#30363d] rounded-xl p-8 hover:border-cyan-500/30 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">💡</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">"Technology with Purpose"</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="text-blue-400 text-lg font-semibold mb-2">Innovation</div>
              <p className="text-[#8b949e] text-sm">Constantly exploring new technologies to solve complex problems</p>
            </div>
            <div className="text-center p-4">
              <div className="text-green-400 text-lg font-semibold mb-2">Impact</div>
              <p className="text-[#8b949e] text-sm">Building solutions that create meaningful change in communities</p>
            </div>
            <div className="text-center p-4">
              <div className="text-purple-400 text-lg font-semibold mb-2">Accessibility</div>
              <p className="text-[#8b949e] text-sm">Ensuring technology is inclusive and available to everyone</p>
            </div>
          </div>
          
          <p className="text-[#8b949e] text-lg leading-relaxed text-center">
            I believe that technology should serve humanity, not the other way around. Every line of code I write, 
            every system I design, and every solution I build is guided by the principle that innovation should 
            improve lives, especially for those who need it most.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PersonalPhilosophySection;
