import apiClient from './services.js';

const PersonalInfoServices = {
  createPersonalInfo(personalInfoData) {
    return apiClient.post('/contactInfo', personalInfoData);
  },
  deletePersonalInfo(id) {
    return apiClient.delete(`/contactInfo/${id}`);
  },
  getPersonalInfoByUserId(userId) {
    return apiClient.get(`/contactInfo/${userId}`);
  },
  updatePersonalInfo(personalInfoData) {
    return apiClient.put(`/contactInfo/${personalInfoData.id}`, personalInfoData);
  },
};

export default PersonalInfoServices;
