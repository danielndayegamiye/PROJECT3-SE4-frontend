import apiClient from './services.js'

const EducationServices = {
  // Create a new education
  createEducation(educationData) {
    return apiClient.post('/education', educationData)
  },
  deleteEducation(id) {
    return apiClient.delete(`/education/${id}`)
  },
  // Retrieve all educations for a specific user
  getEducationByUserId(userId) {
    return apiClient.get(`/education/${userId}`)
  },
  updateEducation(educationData) {
    return apiClient.put(`/education/${educationData.id}`, educationData);
  },
}

export default EducationServices
