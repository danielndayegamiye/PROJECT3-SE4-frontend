<template>
  <!-- Header with Navigation Bar -->
  <header class="app-header">
    <Nav />
  </header>

  <v-container class="app-home" fluid>
    <main class="content">
      <!-- Main Title -->
      <div class="title-container">
        <h1 class="title">How will you make your resume?</h1>
      </div>

      <!-- Options for Creating or Viewing Resumes -->
      <div class="options">
        <div class="option-card" @click="startFromScratch">
          <span class="icon">✨</span>
          <div class="text-content">
            <h3>Start from scratch</h3>
            <p>Build a new Resume</p>
          </div>
          <span class="arrow">→</span>
        </div>

        <div class="option-card" @click="viewExistingResumes">
          <span class="icon">📄</span>
          <div class="text-content">
            <h3>View Existing Resumes</h3>
            <p>Access your saved resumes</p>
          </div>
          <span class="arrow">→</span>
        </div>
      </div>

      <!-- Recent Resumes Section -->
      <section class="recent-resumes">
        <h2 class="recent-title">Recent Resumes</h2>
        <div class="resume-list">
          <div
            v-for="resume in recentResumes"
            :key="resume.id"
            class="resume-card"
            @click="openResume(resume.id)"
          >
            <span class="resume-icon">📑</span>
            <div class="resume-details">
              <h4 class="resume-title">{{ resume.title }}</h4>
              <p class="resume-date">
                Last accessed: {{ resume.lastAccessed }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </v-container>
</template>

<script>
import Nav from '../components/Nav.vue'

export default {
  name: 'AppHome',
  components: {
    Nav,
  },
  data() {
    return {
      recentResumes: [
        {
          id: 1,
          title: 'Software Engineer Resume',
          lastAccessed: 'Oct 28, 2024',
        },
        { id: 2, title: 'Data Analyst Resume', lastAccessed: 'Oct 26, 2024' },
        {
          id: 3,
          title: 'Product Manager Resume',
          lastAccessed: 'Oct 25, 2024',
        },
      ],
    }
  },
  methods: {
    startFromScratch() {
      this.$router.push('/builder')
    },
    viewExistingResumes() {
      this.$router.push('/existing-resumes')
    },
  },
}
</script>

<style scoped>
.app-home {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.app-header {
  width: 100%;
  background-color: #811429;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
}

.content {
  padding-top: 5rem; /* Adjust padding to account for fixed header */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-container {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  color: #333;
  font-weight: 500;
}

.options {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.option-card {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 1.5rem;
  color: #811429;
  margin-right: 1rem;
}

.text-content {
  flex-grow: 1;
}

.arrow {
  font-size: 1.5rem;
  color: #811429;
}

.recent-resumes {
  width: 100%;
  max-width: 800px;
}

.recent-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.resume-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.resume-card {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.resume-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.resume-icon {
  font-size: 1.5rem;
  color: #811429;
  margin-right: 0.5rem;
}

.resume-details {
  display: flex;
  flex-direction: column;
}

.resume-date {
  font-size: 0.85rem;
  color: #666;
}
</style>
