<template>
  <div>
    <!-- Navbar Component -->
    <NavBar class="navbar" />

    <!-- Page Header -->
    <div class="header-description">
      <h1 class="title">User Management</h1>
      <p class="subtitle">
        Manage the list of users by toggling their admin status.
      </p>
    </div>

    <!-- User List Section -->
    <div class="content-section">
      <div v-for="user in users" :key="user.id" class="user-card">
        <p class="user-name"><strong>{{ user.fName }} {{ user.lName }}</strong></p>
        <button class="action-button" @click="toggleAdmin(user)">
          {{ user.isAdmin ? 'Revoke Admin' : 'Make Admin' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import UserServices from '@/services/userServices';
import NavBar from '../components/nav.vue'

export default {
  name: "UserManagement",
  components: {
    NavBar  
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await UserServices.getUsers(); // Fetch users from the API
        this.users = response.data.map(user => ({
          ...user,
          isAdmin: user.role === "admin", // Add computed property for role
        }));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },
    async toggleAdmin(user) {
      try {
        const newRole = user.role === "admin" ? "student" : "admin";
        user.role = newRole; // Update the role locally
        user.isAdmin = newRole === "admin"; // Update computed property
        await UserServices.updateUser(user); // Update role in the backend

      } catch (error) {
        console.error("Failed to update user role:", error);
      }
    },
  },
  async mounted() {
    await this.fetchUsers(); // Fetch users on component mount
  },
    toggleAdmin(user) {
      user.isAdmin = !user.isAdmin;
    },
  
};
</script>

<style scoped>
/* Header styling similar to Resume Builder */
.header-description {
  margin: 20px;
  text-align: center;
  color: #333;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}

/* Content section styled similarly */
.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  max-width: 800px;
}

/* User card styling similar to sections in Resume Builder */
.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.user-name {
  font-size: 1.2rem;
  color: #333;
}

.action-button {
  padding: 10px 15px;
  background-color: #811429;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.action-button:hover {
  background-color: #a41d38;
}
</style>
