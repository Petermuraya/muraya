
const MissionVisionSection = () => {
  return (
    <section id="mission" className="py-12 fade-in-up opacity-0 translate-y-8 transition-all duration-700 delay-300">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
          Mission & Vision
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-effect border-[#30363d] rounded-lg p-8 hover:border-blue-500/30 transition-all duration-300">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">My Mission</h3>
          </div>
          <p className="text-[#8b949e] text-lg leading-relaxed text-center">
            To leverage cutting-edge technologies like AI, IoT, and cloud computing to create impactful solutions 
            that address real-world challenges in healthcare, agriculture, and sustainable development across Africa and beyond.
          </p>
        </div>
        
        <div className="glass-effect border-[#30363d] rounded-lg p-8 hover:border-purple-500/30 transition-all duration-300">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">My Vision</h3>
          </div>
          <p className="text-[#8b949e] text-lg leading-relaxed text-center">
            To be a leading innovator in tech-for-good initiatives, building scalable solutions that bridge 
            the digital divide and empower communities through accessible, intelligent technology platforms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
