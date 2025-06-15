
const AboutHeader = () => {
  return (
    <div className="text-center mb-16 scroll-animate fade-in-up opacity-0 translate-y-8 transition-all duration-700">
      <div className="scroll-scale-header">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 scroll-text-effect transition-all duration-1000">
          About Peter Muraya
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
      </div>
      <p className="text-lg md:text-xl text-[#7d8590] max-w-3xl mx-auto leading-relaxed slide-in-up opacity-0 translate-y-4 transition-all duration-700 delay-300">
        IoT & Cloud Solutions Developer passionate about building smart, scalable solutions that drive global development, sustainability, and digital innovation. Enthusiast in AI, edge computing, and web technologies.
      </p>
    </div>
  );
};

export default AboutHeader;
