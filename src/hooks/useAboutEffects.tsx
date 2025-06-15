
import { useEffect } from 'react';

const useAboutEffects = () => {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Enhanced parallax and scroll effects with performance optimization
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.5;
          
          // Parallax background elements
          const parallaxElements = document.querySelectorAll('.parallax-bg');
          parallaxElements.forEach((element) => {
            const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
            const yPos = -(scrolled * speed);
            (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
          });

          // Floating elements
          const floatingElements = document.querySelectorAll('.floating-element');
          floatingElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = scrolled * speed;
            (element as HTMLElement).style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
          });

          // Header scaling effect
          const header = document.querySelector('.scroll-scale-header');
          if (header) {
            const scale = Math.max(0.8, 1 - scrolled * 0.0005);
            const opacity = Math.max(0.3, 1 - scrolled * 0.001);
            (header as HTMLElement).style.transform = `scale(${scale})`;
            (header as HTMLElement).style.opacity = opacity.toString();
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Enhanced Intersection Observer with multiple animation types
    const observerOptions = {
      threshold: [0, 0.1, 0.5, 1],
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        
        if (entry.isIntersecting) {
          // Different animation types based on element classes
          if (element.classList.contains('fade-in-up')) {
            element.classList.add('animate-fade-in');
            element.classList.remove('opacity-0', 'translate-y-8');
          }
          
          if (element.classList.contains('slide-in-left')) {
            element.classList.add('animate-slide-in-left');
            element.classList.remove('opacity-0', '-translate-x-full');
          }
          
          if (element.classList.contains('slide-in-right')) {
            element.classList.add('animate-slide-in-right');
            element.classList.remove('opacity-0', 'translate-x-full');
          }
          
          if (element.classList.contains('scale-in')) {
            element.classList.add('animate-scale-in');
            element.classList.remove('opacity-0', 'scale-75');
          }
          
          if (element.classList.contains('stagger-in')) {
            const children = element.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-fade-in');
                child.classList.remove('opacity-0', 'translate-y-4');
              }, index * 100);
            });
          }

          // Progress bars animation
          if (element.classList.contains('progress-animate')) {
            const progressBars = element.querySelectorAll('[data-progress]');
            progressBars.forEach((bar) => {
              const progress = bar.getAttribute('data-progress');
              setTimeout(() => {
                (bar as HTMLElement).style.width = `${progress}%`;
              }, 300);
            });
          }
        } else {
          // Reset animations when out of view (optional)
          if (element.classList.contains('reset-on-exit')) {
            element.classList.remove('animate-fade-in', 'animate-slide-in-left', 'animate-slide-in-right', 'animate-scale-in');
            element.classList.add('opacity-0');
          }
        }
      });
    }, observerOptions);

    // Observe all animated sections
    const animatedElements = document.querySelectorAll('.scroll-animate, .fade-in-up, .slide-in-left, .slide-in-right, .scale-in, .stagger-in, .progress-animate');
    animatedElements.forEach((element) => observer.observe(element));

    // Scroll-based text color changes
    const textElements = document.querySelectorAll('.scroll-text-effect');
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('text-gradient-active');
        }
      });
    }, { threshold: 0.5 });

    textElements.forEach((element) => textObserver.observe(element));

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      textObserver.disconnect();
    };
  }, []);

  // Smooth scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return { scrollToSection };
};

export default useAboutEffects;
