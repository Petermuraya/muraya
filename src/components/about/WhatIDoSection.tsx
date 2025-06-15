
const WhatIDoSection = () => {
  return (
    <section id="what-i-do" className="py-12 slide-in-right opacity-0 translate-x-full transition-all duration-700 delay-500">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
          What I Do
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🏥</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">HealthTech Solutions</h3>
            <p className="text-[#8b949e]">
              Developing AI-powered diagnostic tools like ThoraxIQ for chest X-ray analysis, 
              telemedicine platforms, and accessibility-focused health applications.
            </p>
          </div>
        </div>
        
        <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-yellow-500/30 transition-all duration-300 hover:-translate-y-2">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Smart Agriculture</h3>
            <p className="text-[#8b949e]">
              Building IoT-enabled farming solutions with real-time monitoring, 
              predictive analytics, and automated irrigation systems for sustainable agriculture.
            </p>
          </div>
        </div>
        
        <div className="glass-effect border-[#30363d] rounded-lg p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">☁️</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Cloud & IoT</h3>
            <p className="text-[#8b949e]">
              Architecting scalable cloud infrastructure and IoT ecosystems using 
              Azure, Firebase, and edge computing technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
