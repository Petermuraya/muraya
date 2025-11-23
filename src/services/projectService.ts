import { supabase } from '@/integrations/supabase/client';

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  imageUrl: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
  status?: 'completed' | 'in-progress' | 'planned';
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

/**
 * Fetch all projects
 */
export const getProjects = async (): Promise<{ data: Project[]; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('admin_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return {
        data: [],
        error: error.message,
      };
    }

    return {
      data: (data || []).map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        imageUrl: project.image_url,
        technologies: project.technologies || [],
        featured: project.featured || false,
        category: project.category,
        demoUrl: project.demo_url,
        githubUrl: project.github_url,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
      })),
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
    return {
      data: [],
      error: errorMessage,
    };
  }
};

/**
 * Fetch a single project by ID
 */
export const getProject = async (id: string): Promise<{ data: Project | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('admin_projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        imageUrl: data.image_url,
        technologies: data.technologies || [],
        featured: data.featured || false,
        category: data.category,
        demoUrl: data.demo_url,
        githubUrl: data.github_url,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch project';
    return {
      data: null,
      error: errorMessage,
    };
  }
};

/**
 * Create a new project
 */
export const createProject = async (project: ProjectFormData): Promise<{ data: Project | null; error: string | null }> => {
  try {
    // Validate required fields
    if (!project.title || !project.description) {
      return {
        data: null,
        error: 'Title and description are required',
      };
    }

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('admin_projects')
      .insert({
        title: project.title,
        description: project.description,
        image_url: project.imageUrl,
        technologies: project.technologies || [],
        category: project.category || 'General',
        demo_url: project.demoUrl || '',
        github_url: project.githubUrl || '',
        featured: project.featured || false,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        imageUrl: data.image_url,
        technologies: data.technologies || [],
        featured: data.featured || false,
        category: data.category,
        demoUrl: data.demo_url,
        githubUrl: data.github_url,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create project';
    return {
      data: null,
      error: errorMessage,
    };
  }
};

/**
 * Update an existing project
 */
export const updateProject = async (id: string, project: ProjectFormData): Promise<{ data: Project | null; error: string | null }> => {
  try {
    // Validate required fields
    if (!project.title || !project.description) {
      return {
        data: null,
        error: 'Title and description are required',
      };
    }

    const { data, error } = await supabase
      .from('admin_projects')
      .update({
        title: project.title,
        description: project.description,
        image_url: project.imageUrl,
        technologies: project.technologies || [],
        category: project.category || 'General',
        demo_url: project.demoUrl || '',
        github_url: project.githubUrl || '',
        featured: project.featured || false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        imageUrl: data.image_url,
        technologies: data.technologies || [],
        featured: data.featured || false,
        category: data.category,
        demoUrl: data.demo_url,
        githubUrl: data.github_url,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update project';
    return {
      data: null,
      error: errorMessage,
    };
  }
};

/**
 * Delete a project
 */
export const deleteProject = async (id: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('admin_projects')
      .delete()
      .eq('id', id);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete project';
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Toggle featured status of a project
 */
export const toggleFeatured = async (id: string, featured: boolean): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('admin_projects')
      .update({
        featured: !featured,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update featured status';
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Search projects by title or description
 */
export const searchProjects = async (query: string): Promise<{ data: Project[]; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('admin_projects')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      return {
        data: [],
        error: error.message,
      };
    }

    return {
      data: (data || []).map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        imageUrl: project.image_url,
        technologies: project.technologies || [],
        featured: project.featured || false,
        category: project.category,
        demoUrl: project.demo_url,
        githubUrl: project.github_url,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
      })),
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to search projects';
    return {
      data: [],
      error: errorMessage,
    };
  }
};

