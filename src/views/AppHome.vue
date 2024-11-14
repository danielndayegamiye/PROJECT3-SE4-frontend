<template>
  <!-- Header with Navigation Bar -->
  <header class="app-header">
    <NavBar />
  </header>

  <v-container class="app-home" fluid>
    <main class="content">
      <div v-if="!showResumeList">
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
          <div class="option-card" @click="useCohere">
            <span class="icon">📄</span>
            <div class="text-content">
              <h3>Check Resume with AI</h3>
              <p>tailor resume to job description</p>
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
                  Created at: {{ formatDate(resume.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- ResumeList Modal -->
      <div
        v-if="showResumeList"
        class="modal-backdrop"
        @click.self="closeModal"
      >
        <div class="modal-content">
          <button class="close-button" @click="closeModal">×</button>
          <ResumeList />
        </div>
      </div>
    </main>
  </v-container>
</template>

<script>
import NavBar from '../components/nav.vue'
import ResumeList from '../components/ResumeList.vue'
import apiClient from '../services/services.js'

export default {
  name: 'AppHome',
  components: {
    NavBar,
    ResumeList,
  },
  data() {
    return {
      resumes: [],
      showResumeList: false, // Controls display of ResumeList modal
    }
  },
  computed: {
    recentResumes() {
      // Sort resumes by createdAt date in descending order and take the top 3
      return [...this.resumes]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
    },
  },
  created() {
    this.fetchResumes()
  },
  methods: {
    fetchResumes() {
      apiClient
        .get('/resumes')
        .then(response => {
          this.resumes = response.data
        })
        .catch(error => {
          console.error('Error fetching resumes:', error)
        })
    },
    startFromScratch() {
      this.$router.push('/builder')
    },
    useCohere() {
      this.$router.push('/cohere')
    },
    viewExistingResumes() {
      this.showResumeList = true // Show the ResumeList modal
    },
    closeModal() {
      this.showResumeList = false // Close the modal
    },
    openResume(id) {
      this.$router.push({ name: 'resumeEditor', params: { id } })
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
  },
}
</script>

<style scoped>
/* Existing styles remain unchanged */

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

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #811429;
}

.close-button:hover {
  color: #c00;
}
</style>
