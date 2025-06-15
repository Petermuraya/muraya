
import { useEffect, useState } from 'react';

interface HeroBackgroundProps {
  mousePosition: { x: number; y: number };
}

const HeroBackground = ({ mousePosition }: HeroBackgroundProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // IoT background images
  const iotImages = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // circuit board
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // programming monitor
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // laptop computer
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // abstract tech
    'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80' // server room
  ];

  useEffect(() => {
    // Auto-rotate background images
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % iotImages.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [iotImages.length]);

  return (
    <>
      {/* Background Images with Reduced Visibility */}
      <div className="absolute inset-0 z-0">
        {iotImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[3000ms] ease-in-out ${
              index === currentImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              transform: `translate3d(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px, 0) scale(1.1)`,
              transition: 'opacity 3s ease-in-out, transform 0.3s ease-out'
            }}
          ></div>
        ))}
        
        {/* Strong gradient overlay for better text readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#0d1117]/90 via-[#161b22]/85 to-[#21262d]/90"
          style={{
            transform: `translate3d(${(mousePosition.x - 0.5) * -10}px, ${(mousePosition.y - 0.5) * -10}px, 0)`,
            transition: 'transform 0.5s ease-out'
          }}
        ></div>
      </div>

      {/* Reduced Circuit pattern overlay */}
      <div 
        className="absolute inset-0 z-1 opacity-10"
        style={{
          transform: `translate3d(${(mousePosition.x - 0.5) * 15}px, ${(mousePosition.y - 0.5) * 15}px, 0)`,
          transition: 'transform 0.4s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;100&quot; height=&quot;100&quot; viewBox=&quot;0 0 100 100&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%2300D4FF&quot; fill-opacity=&quot;0.5&quot;%3E%3Cpath d=&quot;M20,20 L80,20 M20,20 L20,80 M20,80 L80,80 M80,20 L80,80 M40,40 L60,40 M40,40 L40,60 M40,60 L60,60 M60,40 L60,60&quot; stroke=&quot;%2300D4FF&quot; stroke-width=&quot;0.5&quot;/%3E%3Ccircle cx=&quot;20&quot; cy=&quot;20&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;80&quot; cy=&quot;20&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;20&quot; cy=&quot;80&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;80&quot; cy=&quot;80&quot; r=&quot;2&quot;/%3E%3Ccircle cx=&quot;50&quot; cy=&quot;50&quot; r=&quot;3&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      {/* Reduced Floating particles effect */}
      <div className="absolute inset-0 z-1">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              transform: `translate3d(${(mousePosition.x - 0.5) * 30}px, ${(mousePosition.y - 0.5) * 30}px, 0)`,
              transition: 'transform 0.6s ease-out'
            }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default HeroBackground;
