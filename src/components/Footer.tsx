
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="animate-slide-in-left">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Let's Connect</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Always open to discussing new opportunities, collaborations, and innovative projects that create positive impact.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="group p-3 bg-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300 backdrop-blur-sm hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" className="group p-3 bg-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300 backdrop-blur-sm hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:peter.muraya@example.com" className="group p-3 bg-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300 backdrop-blur-sm hover:scale-110">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            <h3 className="text-lg font-semibold mb-6 text-blue-300">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block relative group">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            <h3 className="text-lg font-semibold mb-6 text-purple-300">Core Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {['Python', 'IoT', 'React', 'AI/ML', 'Azure', 'Django'].map((skill) => (
                <span key={skill} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center animate-fade-in [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center justify-center mb-4">
            <p className="text-gray-300 flex items-center gap-2">
              © 2024 Peter Muraya Ndung'u. Building technology for global development 
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            </p>
          </div>
          <p className="text-gray-400 text-sm bg-white/5 rounded-lg py-3 px-6 inline-block backdrop-blur-sm">
            "Technology is best when it brings people together." - Matt Mullenweg
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
