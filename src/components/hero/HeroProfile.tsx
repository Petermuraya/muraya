
interface HeroProfileProps {
  mousePosition: { x: number; y: number };
}

const HeroProfile = ({ mousePosition }: HeroProfileProps) => {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="relative inline-block">
        <img 
          src="https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg" 
          alt="Peter Muraya Ndung'u" 
          className="w-40 h-40 rounded-full mx-auto mb-6 shadow-2xl border-4 border-[#30363d] ring-4 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300 hover:scale-105 object-cover"
          style={{
            transform: `translate3d(${(mousePosition.x - 0.5) * 5}px, ${(mousePosition.y - 0.5) * 5}px, 0)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-[#0d1117] animate-pulse"></div>
      </div>
    </div>
  );
};

export default HeroProfile;
