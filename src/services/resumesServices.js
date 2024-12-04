import apiClient from './services.js'

const ResumesServices = {
  createResume(resumeData) {
    return apiClient.post('/resumes', resumeData)
  },
  deleteResume(id) {
    return apiClient.delete(`/resumes/${id}`)
  },
  getAllResumes() {
    return apiClient.get('/resumes')
  },
  getResume(id) {
    return apiClient.get(`/resumes/${id}`)
  },
  getUser(id) {
    return apiClient.get(`/user/${id}`)
  },
  getComment(id) {
    return apiClient.get(`/resumes/${id}/comment`)
  },
  updateComment(id, comment) {
    return apiClient.put(`/resumes/${id}/comment`, { comment })
  },
}

export default ResumesServices
