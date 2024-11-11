import apiClient from './services.js'

const ProjectsServices = {
  // Create a new projects
  createProjects(projectsData) {
    return apiClient.post('/projects', projectsData)
  },
  // Retrieve all projectss for a specific user
  getProjectsByUserId(userId) {
    return apiClient.get(`/projects/${userId}`)
  },
}

export default ProjectsServices
