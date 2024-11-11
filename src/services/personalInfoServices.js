import apiClient from './services.js'

const PersonalInfoServices = {
  // Create a new skill
  createPersonalInfo(personalInfoData) {
    return apiClient.post('/contactInfo', personalInfoData)
  },
  deletePersonalInfo(id) {
    return apiClient.delete(`/contactInfo/${id}`)
  },
  // Retrieve all skills for a specific user
  getPersonalInfoByUserId(userId) {
    return apiClient.get(`/contactInfo/${userId}`)
  },
}

export default PersonalInfoServices
