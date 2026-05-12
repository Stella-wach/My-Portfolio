import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, LogOut, Users, FolderOpen, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/seo/SEOHead.jsx';
import { fetchProjects, createProject, deleteProject, fetchContacts } from '@/services/api.js';
import { projects as localProjects } from '@/data/projects.js';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState(localProjects);
  const [contacts, setContacts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '', category: 'fullstack', year: new Date().getFullYear().toString(),
    description: '', technologies: '', location: 'Nairobi, Kenya',
    coverImage: '', githubUrl: '', liveUrl: ''
  });

  useEffect(() => {
    // Try to load from API, fall back to local data
    loadProjects();
    loadContacts();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch {
      // Use local data if API not available
    }
  };

  const loadContacts = async () => {
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch {
      // API not available yet
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const slug = newProject.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const project = { ...newProject, id: Date.now().toString(), slug, images: [] };

    try {
      await createProject(project);
      toast({ title: "Project added!", description: "New project has been saved to the database." });
    } catch {
      // Add locally if API not available
      setProjects(prev => [...prev, project]);
      toast({ title: "Project added locally", description: "Connect your Node.js backend to persist data." });
    }

    setNewProject({ title: '', category: 'fullstack', year: new Date().getFullYear().toString(), description: '', technologies: '', location: 'Nairobi, Kenya', coverImage: '', githubUrl: '', liveUrl: '' });
    setShowAddForm(false);
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      toast({ title: "Project deleted" });
    } catch {
      setProjects(prev => prev.filter(p => p.id !== id));
      toast({ title: "Project removed locally" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <SEOHead title="Admin Dashboard" description="Manage your portfolio projects and view contact submissions." />
      
      <div className="min-h-screen relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin <span className="text-gradient-cyan">Dashboard</span></h1>
              <p className="text-muted-foreground mt-1">Manage your portfolio & contacts</p>
            </div>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
              <LogOut className="size-4" /> Logout
            </button>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab('projects')}
              className={`inline-flex items-center gap-2 pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'projects' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              <FolderOpen className="size-4" /> Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`inline-flex items-center gap-2 pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'contacts' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              <Users className="size-4" /> Contacts ({contacts.length})
            </button>
          </div>

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <button onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 btn-gradient rounded-lg font-medium text-sm">
                <Plus className="size-4" /> Add New Project
              </button>

              {/* Add Project Form */}
              {showAddForm && (
                <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleAddProject}
                  className="p-6 bg-secondary/30 border border-border rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Add New Project</h3>
                    <button type="button" onClick={() => setShowAddForm(false)}><X className="size-5 text-muted-foreground" /></button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Project Title *</label>
                      <input required value={newProject.title} onChange={(e) => setNewProject(p => ({ ...p, title: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category *</label>
                      <select value={newProject.category} onChange={(e) => setNewProject(p => ({ ...p, category: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground">
                        <option value="fullstack">Full Stack</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="mobile">Mobile</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Year</label>
                      <input value={newProject.year} onChange={(e) => setNewProject(p => ({ ...p, year: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Technologies</label>
                      <input value={newProject.technologies} onChange={(e) => setNewProject(p => ({ ...p, technologies: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                        placeholder="React, Node.js, MongoDB" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                      <input value={newProject.coverImage} onChange={(e) => setNewProject(p => ({ ...p, coverImage: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                        placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <input value={newProject.location} onChange={(e) => setNewProject(p => ({ ...p, location: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">GitHub URL</label>
                      <input value={newProject.githubUrl} onChange={(e) => setNewProject(p => ({ ...p, githubUrl: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Live URL</label>
                      <input value={newProject.liveUrl} onChange={(e) => setNewProject(p => ({ ...p, liveUrl: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description *</label>
                    <textarea required rows={3} value={newProject.description} onChange={(e) => setNewProject(p => ({ ...p, description: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-none" />
                  </div>

                  <button type="submit" className="px-6 py-2.5 btn-gradient rounded-lg font-medium text-sm">
                    Save Project
                  </button>
                </motion.form>
              )}

              {/* Projects List */}
              <div className="grid gap-4">
                {projects.map((project) => (
                  <motion.div key={project.id} layout
                    className="flex items-center gap-4 p-4 bg-secondary/30 border border-border rounded-lg hover:border-primary/30 transition-colors">
                    <img src={project.coverImage} alt={project.title} className="w-20 h-14 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{project.title}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{project.category} • {project.year}</p>
                    </div>
                    <button onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="size-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {contacts.length === 0 ? (
                <div className="text-center py-16">
                  <Users className="size-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No contacts yet</h3>
                  <p className="text-muted-foreground mt-1">Contact submissions from potential employers will appear here once your Node.js/MongoDB backend is connected.</p>
                </div>
              ) : (
                contacts.map((contact, i) => (
                  <div key={i} className="p-4 bg-secondary/30 border border-border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{contact.name}</h3>
                      <span className="text-xs text-muted-foreground">{contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : ''}</span>
                    </div>
                    <p className="text-sm text-primary">{contact.email}</p>
                    <p className="text-sm text-muted-foreground">{contact.subject}</p>
                    <p className="text-sm">{contact.message}</p>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
