
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Trash2, FileText, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

interface ResumeFile {
  id: string;
  filename: string;
  file_url: string;
  file_size: number | null;
  is_active: boolean;
  created_at: string;
}

const ResumeManagement = () => {
  const { admin } = useAdmin();
  const { toast } = useToast();
  const [resumeFiles, setResumeFiles] = useState<ResumeFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchResumeFiles();
  }, []);

  const fetchResumeFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('resume_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resume files:', error);
      } else {
        setResumeFiles(data || []);
      }
    } catch (error) {
      console.error('Error fetching resume files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Please upload a PDF or Word document",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `resume-${Date.now()}.${fileExt}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (uploadError) {
        toast({
          title: "Error",
          description: "Failed to upload file",
          variant: "destructive",
        });
        return;
      }

      // Deactivate all existing resumes
      await supabase
        .from('resume_files')
        .update({ is_active: false })
        .neq('id', '');

      // Add record to database
      const { error: dbError } = await supabase
        .from('resume_files')
        .insert({
          filename: file.name,
          file_url: fileName,
          file_size: file.size,
          mime_type: file.type,
          is_active: true,
          uploaded_by: admin?.id
        });

      if (dbError) {
        toast({
          title: "Error",
          description: "Failed to save file record",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Resume uploaded successfully",
      });

      fetchResumeFiles();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload resume",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    try {
      if (!currentActive) {
        // Deactivate all other resumes first
        await supabase
          .from('resume_files')
          .update({ is_active: false })
          .neq('id', id);
      }

      // Toggle this resume
      const { error } = await supabase
        .from('resume_files')
        .update({ is_active: !currentActive })
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update resume status",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Resume ${!currentActive ? 'activated' : 'deactivated'} successfully`,
      });

      fetchResumeFiles();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update resume status",
        variant: "destructive",
      });
    }
  };

  const deleteResume = async (id: string, fileUrl: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('resumes')
        .remove([fileUrl]);

      if (storageError) {
        console.error('Storage deletion error:', storageError);
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('resume_files')
        .delete()
        .eq('id', id);

      if (dbError) {
        toast({
          title: "Error",
          description: "Failed to delete resume",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });

      fetchResumeFiles();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    }
  };

  const downloadResume = async (fileUrl: string, filename: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('resumes')
        .download(fileUrl);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to download resume",
          variant: "destructive",
        });
        return;
      }

      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    return mb < 1 ? `${Math.round(bytes / 1024)} KB` : `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload New Resume</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume-upload" className="text-white">
              Choose Resume File (PDF or Word)
            </Label>
            <Input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="bg-[#0d1117] border-[#30363d] text-white"
            />
          </div>
          {isUploading && (
            <div className="flex items-center space-x-2 text-blue-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
              <span>Uploading...</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Resume Files ({resumeFiles.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {resumeFiles.length === 0 ? (
            <p className="text-[#8b949e] text-center py-8">No resume files uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {resumeFiles.map((resume) => (
                <div
                  key={resume.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    resume.is_active 
                      ? 'border-green-500/30 bg-green-500/5' 
                      : 'border-[#30363d] bg-[#0d1117]/50'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-white font-medium">{resume.filename}</span>
                      {resume.is_active && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-[#8b949e] mt-1">
                      {formatFileSize(resume.file_size)} • Uploaded {formatDate(resume.created_at)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleActive(resume.id, resume.is_active)}
                      className="border-[#30363d] text-white"
                    >
                      {resume.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadResume(resume.file_url, resume.filename)}
                      className="border-[#30363d] text-white"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteResume(resume.id, resume.file_url)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeManagement;
