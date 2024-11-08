import apiClient from './services.js'

const EducationServices = {
  // Create a new education
  createEducation(educationData) {
    return apiClient.post('/education', educationData)
  },
  // Retrieve all educations for a specific user
  getEducationByUserId(userId) {
    return apiClient.get(`/education/${userId}`)
  },
}

export default EducationServices