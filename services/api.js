// API service for Node.js/MongoDB backend
// Update this URL when your backend is deployed
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('admin_token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// Auth
export const loginAdmin = (credentials) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });

// Projects
export const fetchProjects = () => request('/projects');
export const createProject = (project) =>
  request('/projects', { method: 'POST', body: JSON.stringify(project) });
export const updateProject = (id, project) =>
  request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(project) });
export const deleteProject = (id) =>
  request(`/projects/${id}`, { method: 'DELETE' });

// Contact submissions
export const fetchContacts = () => request('/contact');
export const submitContact = (data) =>
  request('/contact', { method: 'POST', body: JSON.stringify(data) });
