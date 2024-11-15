import apiClient from './services.js'

const SkillServices = {
  // Create a new skill
  createSkill(skillData) {
    return apiClient.post('/skill', skillData)
  },
  deleteSkill(id) {
    return apiClient.delete(`/skill/${id}`)
  },
  // Retrieve all skills for a specific user
  getSkillsByUserId(userId) {
    return apiClient.get(`/skill/${userId}`)
  },
}

export default SkillServices
