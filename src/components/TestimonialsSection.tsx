
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Plus, Camera, User, Mail, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface Testimonial {
  id: string;
  name: string;
  email: string;
  position: string;
  text: string;
  rating: number;
  image?: string;
  createdAt: Date;
}

const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  text: z.string().min(10, 'Testimonial must be at least 10 characters'),
  rating: z.number().min(1).max(5),
  image: z.any().optional(),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

const TestimonialsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      name: "Innovation Club Member",
      email: "member@karatina.edu",
      position: "Karatina University",
      text: "Peter's leadership in tech projects has been inspiring. His passion for using technology for social good is evident in every project.",
      rating: 5,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: "Project Collaborator",
      email: "collab@akiliedge.tech",
      position: "Akiliedge Tech Network",
      text: "Working with Peter on IoT projects has been amazing. His technical skills and vision for global development are remarkable.",
      rating: 5,
      createdAt: new Date('2024-02-20')
    }
  ]);

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: '',
      email: '',
      position: '',
      text: '',
      rating: 5,
    },
  });

  const generateAvatarUrl = (email: string) => {
    // Generate a deterministic avatar based on email
    const emailHash = btoa(email).replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
    return `https://api.dicebear.com/7.x/initials/svg?seed=${emailHash}&backgroundColor=0ea5e9&textColor=ffffff&fontSize=40`;
  };

  const onSubmit = async (data: TestimonialFormData) => {
    let imageUrl = '';
    
    if (data.image && data.image[0]) {
      // Handle image upload
      const file = data.image[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrl = e.target?.result as string;
        submitTestimonial(data, imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      // Use generated avatar
      imageUrl = generateAvatarUrl(data.email);
      submitTestimonial(data, imageUrl);
    }
  };

  const submitTestimonial = (data: TestimonialFormData, imageUrl: string) => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      position: data.position,
      text: data.text,
      rating: data.rating,
      image: imageUrl,
      createdAt: new Date(),
    };

    setTestimonials(prev => [newTestimonial, ...prev]);
    form.reset();
    setIsOpen(false);
  };

  const StarRating = ({ rating, onRatingChange, interactive = false }: { 
    rating: number; 
    onRatingChange?: (rating: number) => void; 
    interactive?: boolean;
  }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 transition-all duration-200 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-400'
            } ${interactive ? 'cursor-pointer hover:scale-110' : ''}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mb-20 scroll-animate opacity-0">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Client Testimonials
          </h2>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
        </div>
        <p className="text-lg text-gray-300 mt-6 max-w-2xl mx-auto">
          Hear what amazing people say about working with me on IoT and AI projects
        </p>
        
        {/* Add Testimonial Button */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Share Your Experience
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl bg-gray-900/95 backdrop-blur-xl border border-cyan-400/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Share Your Testimonial
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-cyan-300">
                          <User className="w-4 h-4 mr-2" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-gray-800/50 border-cyan-400/30 text-white placeholder-gray-400 focus:border-cyan-400"
                            placeholder="Your full name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-cyan-300">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="bg-gray-800/50 border-cyan-400/30 text-white placeholder-gray-400 focus:border-cyan-400"
                            placeholder="your.email@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyan-300">Position/Company</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-gray-800/50 border-cyan-400/30 text-white placeholder-gray-400 focus:border-cyan-400"
                          placeholder="Your position and company"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyan-300">Rating</FormLabel>
                      <FormControl>
                        <div>
                          <StarRating 
                            rating={field.value} 
                            onRatingChange={field.onChange}
                            interactive={true}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-cyan-300">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Your Testimonial
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          className="bg-gray-800/50 border-cyan-400/30 text-white placeholder-gray-400 focus:border-cyan-400 min-h-[120px]"
                          placeholder="Share your experience working with Peter..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-cyan-300">
                        <Camera className="w-4 h-4 mr-2" />
                        Profile Image (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="file"
                          accept="image/*"
                          onChange={(e) => onChange(e.target.files)}
                          className="bg-gray-800/50 border-cyan-400/30 text-white file:bg-cyan-500/20 file:text-cyan-300 file:border-0 file:rounded-md"
                        />
                      </FormControl>
                      <p className="text-sm text-gray-400">
                        If no image is uploaded, we'll generate an avatar from your email
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Submit Testimonial
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={testimonial.id} 
            className="p-6 glass-effect border-[#30363d] hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:-translate-y-2 group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Profile Section */}
            <div className="flex items-center mb-4">
              <div className="relative">
                <img 
                  src={testimonial.image || generateAvatarUrl(testimonial.email)}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-cyan-400/40 group-hover:border-cyan-400/80 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="ml-4 flex-1">
                <p className="font-semibold text-[#c9d1d9] group-hover:text-cyan-300 transition-colors duration-300">
                  {testimonial.name}
                </p>
                <p className="text-sm text-[#7d8590]">{testimonial.position}</p>
              </div>
            </div>
            
            {/* Rating */}
            <div className="mb-4">
              <StarRating rating={testimonial.rating} />
            </div>
            
            {/* Testimonial Text */}
            <p className="text-[#8b949e] italic leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              "{testimonial.text}"
            </p>
            
            {/* Date */}
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <p className="text-xs text-[#7d8590]">
                {testimonial.createdAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Card>
        ))}
      </div>
      
      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="text-gray-400 text-lg">
          Have you worked with me? I'd love to hear your feedback!
        </p>
      </div>
    </div>
  );
};

export default TestimonialsSection;
