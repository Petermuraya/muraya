
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
            <p className="text-gray-300 mb-4">
              Always open to discussing new opportunities, collaborations, and innovative projects that create positive impact.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-300 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:peter.muraya@example.com" className="text-gray-300 hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Core Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'IoT', 'React', 'AI/ML', 'Azure', 'Django'].map((skill) => (
                <span key={skill} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Peter Muraya Ndung'u. Building technology for global development.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            "Technology is best when it brings people together." - Matt Mullenweg
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
