// services.js
import apiClient from './services.js' // Ensure apiClient is set up to manage requests

const AwardServices = {
  // Create a new award
  createAward(awardData) {
    return apiClient.post('/awards', awardData)
  },
  // Retrieve all awards for a specific user
  getAwardsByUserId(userId) {
    return apiClient.get(`/awards/${userId}`)
  },
  // Update an existing award by ID
  updateAward(awardId, awardData) {
    return apiClient.put(`/awards/${awardId}`, awardData)
  },
  // Delete an award by ID
  deleteAward(id) {
    return apiClient.delete(`/awards/${id}`)
  },
}

export default AwardServices
