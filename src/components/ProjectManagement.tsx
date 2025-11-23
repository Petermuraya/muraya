
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ExternalLink, Github, Star, Search, Loader2, AlertCircle } from 'lucide-react';
import { projectService } from '@/services/projectService';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  createdAt: string;
}

const ProjectManagement = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    technologies: '',
    githubUrl: '',
    demoUrl: '',
    featured: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const result = await projectService.getProjects();
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        setProjects(result.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      fetchProjects();
    } else {
      setIsLoading(true);
      try {
        const result = await projectService.searchProjects(query);
        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        } else {
          setProjects(result.data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to search projects",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        category: formData.category || 'General',
        imageUrl: formData.imageUrl,
        technologies: formData.technologies
          .split(',')
          .map(t => t.trim())
          .filter(t => t),
        githubUrl: formData.githubUrl,
        demoUrl: formData.demoUrl,
        featured: formData.featured
      };

      if (editingProject) {
        const result = await projectService.updateProject(editingProject.id, projectData);
        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
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
        const result = await projectService.createProject(projectData);
        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
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
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      imageUrl: project.imageUrl || '',
      technologies: project.technologies?.join(', ') || '',
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      featured: project.featured
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await projectService.deleteProject(id);
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
        setDeleteConfirm(null);
        fetchProjects();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const result = await projectService.toggleFeatured(project.id, project.featured);
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Project ${!project.featured ? 'featured' : 'unfeatured'} successfully`,
        });
        fetchProjects();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to toggle featured status",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      imageUrl: '',
      technologies: '',
      githubUrl: '',
      demoUrl: '',
      featured: false
    });
    setEditingProject(null);
    setIsDialogOpen(false);
  };

  const filteredProjects = projects;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Project Management</h2>
            <p className="text-[#8b949e] text-sm mt-1">Create, edit, and manage your portfolio projects</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-[#161b22] border-[#30363d] text-white max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {editingProject ? 'Edit Project' : 'Create New Project'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#8b949e]">Project Title *</label>
                  <Input
                    placeholder="e.g., Portfolio Website"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-[#0d1117] border-[#30363d] text-white placeholder-[#6e7681]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#8b949e]">Category *</label>
                  <Input
                    placeholder="e.g., Web Development"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-[#0d1117] border-[#30363d] text-white placeholder-[#6e7681]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#8b949e]">Description *</label>
                  <Textarea
                    placeholder="Describe what this project does..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-[#0d1117] border-[#30363d] text-white placeholder-[#6e7681]"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#8b949e]">Image URL</label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="bg-[#0d1117] border-[#30363d] text-white placeholder-[#6e7681]"
                    type="url"
                  />
                  {formData.imageUrl && (
                    <div className="mt-2 rounded border border-[#30363d] overflow-hidden">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="160"%3E%3Crect fill="%23161b22" width="400" height="160"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%238b949e"%3EImage not found%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#8b949e]">Technologies (comma-separated)</label>
                  <Input
                    placeholder="React, TypeScript, Tailwind CSS"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="bg-[#0d1117] border-[#30363d] text-white placeholder-[#6e7681]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#8b949e]">GitHub URL</label>
                  <Input
                    placeholder="https://github.com/username/repo"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="bg-[#0d1117] border-[#30363d] text-white placeholder-[#6e7681]"
                    type="url"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#8b949e]">Demo URL</label>
                  <Input
                    placeholder="https://example.com"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="bg-[#0d1117] border-[#30363d] text-white placeholder-[#6e7681]"
                    type="url"
                  />
                </div>

                <div className="flex items-center space-x-3 bg-[#0d1117] p-3 rounded border border-[#30363d]">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded accent-blue-500"
                  />
                  <label htmlFor="featured" className="text-sm flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>Mark as featured project</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingProject ? 'Update' : 'Create'} Project
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-[#6e7681]" />
          <Input
            placeholder="Search projects by title or description..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-[#0d1117] border-[#30363d] text-white placeholder-[#6e7681] pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card className="bg-[#161b22] border-[#30363d]">
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-8 h-8 text-[#6e7681] mx-auto mb-2" />
            <p className="text-[#8b949e]">
              {searchQuery ? 'No projects found matching your search.' : 'No projects yet. Create your first project!'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-[#161b22] border-[#30363d] hover:border-[#424f5d] transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-white flex items-center gap-2">
                      {project.title}
                      {project.featured && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
                    </CardTitle>
                    <p className="text-sm text-[#7d8590] mt-1">
                      {project.category} • {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" asChild className="border-[#30363d]">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button size="sm" variant="outline" asChild className="border-[#30363d]">
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleToggleFeatured(project)}
                      className="border-[#30363d] text-yellow-400 hover:text-yellow-300"
                    >
                      <Star className={`w-4 h-4 ${project.featured ? 'fill-yellow-400' : ''}`} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(project)}
                      className="border-[#30363d]"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#161b22] border-[#30363d] text-white">
                        <DialogHeader>
                          <DialogTitle>Delete Project?</DialogTitle>
                        </DialogHeader>
                        <p className="text-[#c9d1d9]">
                          Are you sure you want to delete "{project.title}"? This action cannot be undone.
                        </p>
                        <div className="flex gap-2">
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1 border-[#30363d]">
                              Cancel
                            </Button>
                          </DialogTrigger>
                          <Button 
                            variant="destructive" 
                            className="flex-1"
                            onClick={() => {
                              handleDelete(project.id);
                              setDeleteConfirm(null);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#c9d1d9] mb-4">{project.description}</p>
                
                {project.imageUrl && (
                  <div className="mb-4 rounded border border-[#30363d] overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).classList.add('hidden');
                      }}
                    />
                  </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-[#8b949e]">Technologies</p>
                    <div className="flex gap-2 flex-wrap">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="bg-[#21262d] text-xs px-3 py-1 rounded-full text-[#c9d1d9] border border-[#30363d]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
