import apiClient from './services.js'

const LinkServices = {
  // Create a new link
  createLink(linkData) {
    return apiClient.post('/links', linkData)
  },
  deleteLink(id) {
    return apiClient.delete(`/links/${id}`)
  },
  // Retrieve all links for a specific user
  getLinksByUserId(userId) {
    return apiClient.get(`/links/${userId}`)
  },
}

export default LinkServices
