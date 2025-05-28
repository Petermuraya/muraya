
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  featured: boolean;
  created_at: string;
}

const ProjectManagement = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    tech: '',
    github: '',
    demo: '',
    featured: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('admin_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } else {
      setProjects(data || []);
    }
  };

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      tech: formData.tech.split(',').map(tech => tech.trim()),
      id: editingProject?.id || generateId()
    };

    if (editingProject) {
      const { error } = await supabase
        .from('admin_projects')
        .update(projectData)
        .eq('id', editingProject.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update project",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
        resetForm();
        fetchProjects();
      }
    } else {
      const { error } = await supabase
        .from('admin_projects')
        .insert([projectData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create project",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Project created successfully",
        });
        resetForm();
        fetchProjects();
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image || '',
      tech: project.tech?.join(', ') || '',
      github: project.github || '',
      demo: project.demo || '',
      featured: project.featured
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('admin_projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      fetchProjects();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      image: '',
      tech: '',
      github: '',
      demo: '',
      featured: false
    });
    setEditingProject(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Project Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-[#161b22] border-[#30363d] text-white">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Project Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
                required
              />
              <Input
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
                required
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
                rows={4}
                required
              />
              <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
              />
              <Input
                placeholder="Technologies (comma-separated)"
                value={formData.tech}
                onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
              />
              <Input
                placeholder="GitHub URL"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
              />
              <Input
                placeholder="Demo URL"
                value={formData.demo}
                onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                className="bg-[#0d1117] border-[#30363d] text-white"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-white">Featured Project</label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingProject ? 'Update' : 'Create'} Project
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-[#161b22] border-[#30363d]">
            <CardHeader>
              <CardTitle className="text-white flex justify-between items-start">
                <div>
                  <h3 className="text-lg">{project.title}</h3>
                  <p className="text-sm text-[#7d8590]">
                    {project.category} • {project.featured && '⭐ Featured'} • {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#c9d1d9] mb-2">{project.description}</p>
              {project.tech && project.tech.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="bg-[#21262d] text-xs px-2 py-1 rounded text-[#c9d1d9]">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
