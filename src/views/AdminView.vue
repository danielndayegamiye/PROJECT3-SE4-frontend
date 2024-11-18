<template>
  <NavBar class="navbar" />
  <h2 class="h2">Resumes</h2>
  <v-container>
    <!-- Resume Cards -->
    <v-row>
      <v-col
        cols="12"
        md="4"
        v-for="resume in paginatedResumes"
        :key="resume.id"
      >
        <v-card
          class="resume-card"
          @click="viewResume(resume.id)"
          outlined
          elevation="5"
        >
          <v-card-title>
            <span class="icon">📄 </span>{{ resume.title }}
          </v-card-title>
          <v-card-subtitle>
            Created by: {{ userNames[resume.userId] || 'Loading...' }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination Controls -->
    <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ResumeServices from '@/services/resumesServices'
import NavBar from '@/components/nav.vue'

const resumes = ref([])
const userNames = ref({}) // To store user names keyed by userId
const currentPage = ref(1)
const resumesPerPage = 12

// Fetch resumes on component mount
onMounted(async () => {
  try {
    const response = await ResumeServices.getAllResumes()
    resumes.value = response.data // Ensure the backend returns an array of resumes

    // Fetch user information for each resume asynchronously
    for (const resume of resumes.value) {
      if (!userNames.value[resume.userId]) {
        fetchUserName(resume.userId)
      }
    }
  } catch (error) {
    console.error('Error fetching resumes:', error)
  }
})

// Function to fetch and cache user name
async function fetchUserName(userId) {
  try {
    const response = await ResumeServices.getUser(userId) // Call the service function
    userNames.value[userId] = response.data.fName + ' ' + response.data.lName // Assuming the user object has a "name" field
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error)
    userNames.value[userId] = 'Unknown User' // Handle errors gracefully
  }
}

// Computed property for paginated resumes
const paginatedResumes = computed(() => {
  const start = (currentPage.value - 1) * resumesPerPage
  const end = start + resumesPerPage
  return resumes.value.slice(start, end)
})

// Total pages based on resume count
const totalPages = computed(() => {
  return Math.ceil(resumes.value.length / resumesPerPage)
})

function viewResume(id) {
  // Navigate to the ResumeDetail route
}
</script>

<style scoped>
.navbar {
  background-color: #82152b;
  color: white;
  padding: 1rem;
}

.h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.resume-card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  height: 130px; /* Set a standard height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.resume-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}
</style>
