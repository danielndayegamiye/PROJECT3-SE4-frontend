<template>
  <nav class="navbar">
    <!-- Logo Placeholder -->
    <div class="navbar-logo">
      <router-link to="/home">
        <img src="../../public/okla-christian.svg" alt="Logo" class="logo" />
      </router-link>
    </div>

    <!-- Centered Title -->
    <div class="navbar-title">Resume Generator</div>

    <!-- Menu Icon for Dropdown -->
    <div class="navbar-menu" @click="toggleDropdown">
      <span class="menu-icon">&#9776;</span>
    </div>

    <!-- Dropdown Menu -->
    <div v-if="dropdownVisible" class="dropdown-menu">
      <button @click="goToUserManagement">User Management</button>
      <button @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import authServices from '@/services/authServices';

export default {
  name: 'NavBar',
  data() {
    return {
      dropdownVisible: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    goToUserManagement() {
      this.$router.push('/user-management');
    },
    logout() {
      // Clear tokens in localStorage
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString); // Safely parse the string
        if (user && user.token) {
          const token = user.token;
          localStorage.removeItem('user');
          authServices.logoutUser(token); // Use the token for logout
        } else {
          console.error('User object is invalid or token is missing.');
        }
      } else {
        console.error('No user found in localStorage.');
      }

      // Redirect to login page after logout
      this.$router.push('/');
    },
  },
};
</script>


<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem; /* Slimmer padding for a compact look */
  background-color: #811429; /* Theme color background */
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.navbar-logo {
  display: flex;
  align-items: center;
  margin-right: auto; /* Pushes the title to center */
}

.navbar-logo img {
  width: 30px; /* Smaller logo size */
  height: auto;
}

.navbar-title {
  flex-grow: 1;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

.navbar-menu {
  cursor: pointer;
}

.menu-icon {
  font-size: 1.5rem;
  color: white;
}

.dropdown-menu {
  position: absolute;
  top: 2.5rem; /* Adjusted to align with slimmer navbar */
  right: 1.5rem;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-menu button {
  background: none;
  border: none;
  color: #811429;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.dropdown-menu button:hover {
  background-color: #ececec;
}
</style>
