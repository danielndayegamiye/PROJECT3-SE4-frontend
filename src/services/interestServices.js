import apiClient from './services.js'

const InterestServices = {
  // Create a new interest
  createInterest(interestData) {
    return apiClient.post('/interest', interestData)
  },
  deleteInterest(id) {
    return apiClient.delete(`/interest/${id}`)
  },
  // Retrieve all interests for a specific user
  getInterestsByUserId(userId) {
    return apiClient.get(`/interest/${userId}`)
  },
}

export default InterestServices
