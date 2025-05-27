
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Innovation Club Member",
      position: "Karatina University",
      text: "Peter's leadership in tech projects has been inspiring. His passion for using technology for social good is evident in every project.",
      rating: 5
    },
    {
      name: "Project Collaborator",
      position: "Akiliedge Tech Network",
      text: "Working with Peter on IoT projects has been amazing. His technical skills and vision for global development are remarkable.",
      rating: 5
    }
  ];

  return (
    <div className="mb-20 scroll-animate opacity-0">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-8 text-center">
        What People Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-6 glass-effect border-[#30363d] hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-[#8b949e] mb-4 italic">"{testimonial.text}"</p>
            <div>
              <p className="font-semibold text-[#c9d1d9]">{testimonial.name}</p>
              <p className="text-sm text-[#7d8590]">{testimonial.position}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
