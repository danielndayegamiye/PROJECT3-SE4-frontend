import apiClient from './services.js'

const UserServices = {
  // Create a new user
  createUser(userData) {
    return apiClient.post('/user', userData)
  },
  deleteUser(id) {
    return apiClient.delete(`/user/${id}`)
  },
  getUsers(){
    return apiClient.get(`/user`)
  },
  // Retrieve all users for a specific user
  getUsersByUserId(userId) {
    return apiClient.get(`/user/${userId}`)
  },
  updateUser(userData) {
    return apiClient.put(`/user/${userData.id}`, userData);
  },
}

export default UserServices
