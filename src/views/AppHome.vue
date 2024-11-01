<template>
  <div class="app-home">
    <!-- Header Section -->
    <header class="app-header">
      <Nav />
      <!-- Import your nav bar component here -->
    </header>

    <!-- Main Content Area -->
    <main class="content">
      <!-- Left Section: Build Resume Button and Existing Resumes -->
      <section class="left-section">
        <button class="build-resume-btn" @click="buildResume">
          Build a Resume
        </button>

        <div class="existing-resumes">
          <h2>Existing Resumes</h2>
          <ul>
            <li
              v-for="resume in existingResumes"
              :key="resume.id"
              @click="openResume(resume.id)"
            >
              {{ resume.name }}
            </li>
          </ul>
        </div>
      </section>

      <!-- Right Section: Recently Viewed Resumes -->
      <aside class="right-section">
        <h2>Recently Viewed</h2>
        <ul>
          <li
            v-for="resume in recentlyViewed"
            :key="resume.id"
            @click="openResume(resume.id)"
          >
            {{ resume.name }}
          </li>
        </ul>
      </aside>
    </main>
  </div>
</template>

<script>
import Nav from '../components/nav.vue'

export default {
  name: 'AppHome',
  components: {
    Nav,
  },
  data() {
    return {
      existingResumes: [
        { id: 1, name: 'Resume 1' },
        { id: 2, name: 'Resume 2' },
        { id: 3, name: 'Resume 3' },
      ],
      recentlyViewed: [
        { id: 2, name: 'Resume 2' },
        { id: 1, name: 'Resume 1' },
      ],
    }
  },
  methods: {
    buildResume() {
      // Navigate to the resume builder page
      this.$router.push('/builder')
    },
    openResume(resumeId) {
      // Logic to open the resume
      this.$router.push(`/resume/${resumeId}`)
    },
  },
}
</script>

<style scoped>
.app-home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #333;
  color: white;
}

.content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 2rem;
}

.left-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.build-resume-btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: start;
}

.existing-resumes ul,
.right-section ul {
  list-style-type: none;
  padding: 0;
}

.existing-resumes ul li,
.right-section ul li {
  padding: 0.5rem;
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
}

.existing-resumes ul li:hover,
.right-section ul li:hover {
  color: #0056b3;
}

.right-section {
  background-color: #f4f4f4;
  padding: 1.5rem;
  border-radius: 5px;
}

.right-section h2,
.existing-resumes h2 {
  font-size: 1.2rem;
  color: #333;
}
</style>
