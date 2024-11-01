<template>
  <nav class="navbar">
    <!-- Logo Placeholder -->
    <div class="navbar-logo">
      <router-link to="/">
        <img src="../../public/resume.png" alt="Logo" class="logo" />
      </router-link>
    </div>

    <!-- Menu Icon for Dropdown -->
    <div class="navbar-menu" @click="toggleDropdown">
      <span class="menu-icon">&#9776;</span>
    </div>

    <!-- Dropdown Menu -->
    <div v-if="dropdownVisible" class="dropdown-menu">
      <button @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      dropdownVisible: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible
    },
    logout() {
      // Clear tokens in localStorage
      localStorage.removeItem('authToken')
      // Redirect to login page after logout
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
  position: relative;
}

.navbar-logo img {
  width: 40px; /* Adjust size as needed */
  height: auto;
}

.navbar-menu {
  cursor: pointer;
}

.menu-icon {
  font-size: 1.5rem;
}

.dropdown-menu {
  position: absolute;
  top: 3rem;
  right: 2rem;
  background-color: #444;
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.dropdown-menu button {
  background: none;
  border: none;
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: #555;
}
</style>
