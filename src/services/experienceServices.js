import apiClient from './services.js'

const ExperienceServices = {
  createExperience(experienceData) {
    return apiClient.post('/experience', experienceData)
  },
  deleteExperience(id) {
    return apiClient.delete(`/experience/${id}`)
  },
  getExperienceByUserId(userId) {
    return apiClient.get(`/experience/${userId}`)
  },
  updateExperience(experienceData) {
    return apiClient.put(`/experience/${experienceData.id}`, experienceData);
  },
}

export default ExperienceServices
