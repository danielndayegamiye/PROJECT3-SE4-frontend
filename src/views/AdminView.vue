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
          @click="openPreviewModal(resume)"
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

    <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
  </v-container>

  <!-- Pass the PDF path and showModal to the modal -->
  <ResumePreview
    v-if="showPreviewModal"
    :pdfPath="pdfPath"
    :commentsProp="currentComment"
    :showModal="showPreviewModal"
    @close-modal="showPreviewModal = false"
    @save-comments="updateComment"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ResumeServices from '@/services/resumesServices'
import NavBar from '@/components/nav.vue'
import ResumePreview from '@/components/ResumePreview.vue'

const resumes = ref([])
const userNames = ref({})
const currentPage = ref(1)
const resumesPerPage = 12
const pdfPath = ref('') // Initial value is empty, will be set when a resume is selected
const showPreviewModal = ref(false)
const currentComment = ref('')
const selectedResumeId = ref(null)

onMounted(async () => {
  try {
    const response = await ResumeServices.getAllResumes()
    resumes.value = response.data

    for (const resume of resumes.value) {
      if (!userNames.value[resume.userId]) {
        fetchUserName(resume.userId)
      }
    }
  } catch (error) {
    console.error('Error fetching resumes:', error)
  }
})

async function fetchUserName(userId) {
  try {
    const response = await ResumeServices.getUser(userId)
    userNames.value[userId] = response.data.fName + ' ' + response.data.lName
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error)
    userNames.value[userId] = 'Unknown User'
  }
}

const paginatedResumes = computed(() => {
  const start = (currentPage.value - 1) * resumesPerPage
  const end = start + resumesPerPage
  return resumes.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(resumes.value.length / resumesPerPage)
})

async function openPreviewModal(resume) {
  // When a resume is clicked, fetch the PDF base64 data from the backend
  ResumeServices.getResume(resume.id)
    .then(response => {
      pdfPath.value = response.data.pdfData
    })
    .catch(error => {
      console.error('Error fetching resume:', error)
    })

  try {
    const response = await ResumeServices.getComment(resume.id)
    currentComment.value = response.data.comment || ''
  } catch (error) {
    console.error(`Error fetching comments for resume ID ${resume.id}:`, error)
    currentComment.value = ''
  }

  selectedResumeId.value = resume.id
  showPreviewModal.value = true
}

async function updateComment(updatedComment) {
  try {
    await ResumeServices.updateComment(selectedResumeId.value, updatedComment)
    console.log('Comments updated successfully!')
  } catch (error) {
    console.error('Error updating comments:', error)
  }

  showPreviewModal.value = false
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
