
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ResumeFile {
  id: string;
  filename: string;
  file_url: string;
  file_size: number | null;
}

const ResumeDownload = () => {
  const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchActiveResume();
  }, []);

  const fetchActiveResume = async () => {
    try {
      const { data, error } = await supabase
        .from('resume_files')
        .select('id, filename, file_url, file_size')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.log('No resume file found');
      } else {
        setResumeFile(data);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resumeFile) return;

    try {
      // Download the file from Supabase storage
      const { data, error } = await supabase.storage
        .from('resumes')
        .download(resumeFile.file_url);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to download resume",
          variant: "destructive",
        });
        return;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = resumeFile.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Resume downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!resumeFile) {
    return null;
  }

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return mb < 1 ? `${Math.round(bytes / 1024)} KB` : `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="text-center py-8">
      <div className="bg-[#161b22]/50 backdrop-blur-md border border-[#30363d] rounded-lg p-6 max-w-md mx-auto">
        <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Resume</h3>
        <p className="text-[#8b949e] mb-4">
          Download my latest resume to learn more about my experience and skills.
        </p>
        <div className="text-sm text-[#7d8590] mb-4">
          {resumeFile.filename} {resumeFile.file_size ? `(${formatFileSize(resumeFile.file_size)})` : ''}
        </div>
        <Button 
          onClick={handleDownload}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Resume
        </Button>
      </div>
    </div>
  );
};

export default ResumeDownload;
