
const ContactCTASection = () => {
  return (
    <section id="contact-cta" className="py-16 text-center scale-in opacity-0 scale-75 transition-all duration-700 delay-1400">
      <div className="glass-effect border-[#30363d] rounded-xl p-10 max-w-4xl mx-auto relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-xl" />
        
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-6xl mb-4 block">🚀</span>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
              Ready to Build the Future Together?
            </h2>
          </div>
          
          <p className="text-[#8b949e] mb-8 text-xl max-w-3xl mx-auto leading-relaxed">
            Whether you're looking to revolutionize healthcare with AI, transform agriculture with IoT, 
            or build scalable cloud solutions, I'm passionate about turning innovative ideas into reality. 
            Let's create something that makes a difference.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
            <div className="flex items-center justify-center space-x-2 text-[#7d8590]">
              <span>💡</span>
              <span>Innovation-driven approach</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-[#7d8590]">
              <span>🤝</span>
              <span>Collaborative partnership</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-[#7d8590]">
              <span>🎯</span>
              <span>Results-focused delivery</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1"
            >
              Start a Conversation
            </a>
            <a 
              href="/projects" 
              className="px-8 py-4 border border-[#30363d] hover:border-blue-500/50 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-blue-500/10 hover:-translate-y-1"
            >
              Explore My Work
            </a>
          </div>
          
          <div className="mt-6 text-sm text-[#7d8590]">
            <p>Based in Kenya 🇰🇪 • Available for global projects • Open to remote collaboration</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;
