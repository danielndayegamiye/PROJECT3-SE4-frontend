<template>
  <v-container fluid>
    <h2 class="title">All Resumes</h2>

    <!-- Resume List -->
    <div v-if="paginatedResumes.length" class="resume-list">
      <div
        v-for="resume in paginatedResumes"
        :key="resume.id"
        class="resume-card"
        @click="openResume(resume.id)"
      >
        <span class="resume-icon">📄</span>
        <div class="resume-details">
          <h4 class="resume-title">{{ resume.title }}</h4>
          <p class="resume-date">
            Created at: {{ formatDate(resume.createdAt) }}
          </p>
        </div>
      </div>
    </div>
    <p v-else>No resumes found</p>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </v-container>
</template>

<script>
import apiClient from '../services/services.js'

export default {
  name: 'ResumeList',
  data() {
    return {
      resumes: [],
      currentPage: 1,
      pageSize: 4, // Show 5 resumes per page
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.resumes.length / this.pageSize)
    },
    paginatedResumes() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.resumes.slice(start, end)
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
    openResume(id) {
      this.$router.push({ name: 'resumeEditor', params: { id } })
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
  },
}
</script>

<style scoped>
.title {
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1rem;
}

.resume-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.resume-card {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  width: 300px;
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

.resume-title {
  font-size: 1.2rem;
  font-weight: 500;
}

.resume-date {
  font-size: 0.9rem;
  color: #666;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.pagination-controls button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  background-color: #811429;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
