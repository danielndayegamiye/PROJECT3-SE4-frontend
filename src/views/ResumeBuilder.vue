<template>
  <div>
    <!-- Navbar Component with updated color -->
    <NavBar class="navbar" />

    <!-- Header description to guide the user -->
    <div class="header-description">
      <h1>Welcome to the Resume Builder!</h1>
      <p>
        Please fill out your personal information and complete each section of
        your resume by clicking the plus button. Once you're done, click
        "Generate Resume" to create your personalized resume.
      </p>
    </div>

    <!-- Resume Sections -->
    <div class="resume-sections">
      <!-- Personal Info Section -->
      <div class="section">
        <h2>Personal Info</h2>
        <button class="plus-icon" @click="openPersonalInfoModal">+</button>
      </div>
      <PersonalInfoModal
        :showModal="personalInfoModalVisible"
        @close-modal="closePersonalInfoModal"
      />

      <!-- Skills Section -->
      <div class="section">
        <h2 @click="toggleSkillsExpand">
          Skills
          <v-icon
            :class="{ rotated: skillsExpanded }"
            class="arrow-icon"
            size="small"
            >mdi-chevron-down</v-icon
          >
        </h2>
        <button class="plus-icon" @click="openSkillsModal">+</button>
        <v-expand-transition>
          <div v-show="skillsExpanded" class="expanded-content">
            <v-list dense>
              <v-list-item v-for="skill in skills" :key="skill.id">
                <v-list-item-content>
                  <v-list-item-title>{{ skill.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>
      </div>
      <SkillsModal
        :showModal="skillsModalVisible"
        @close-modal="closeSkillsModal"
      />

      <!-- Education Section -->
      <div class="section">
        <h2>Education</h2>
        <button class="plus-icon" @click="openEducationModal">+</button>
      </div>
      <EducationModal
        :showModal="educationModalVisible"
        @close-modal="closeEducationModal"
      />

      <!-- Interests Section -->
      <div class="section">
        <h2>Interests</h2>
        <button class="plus-icon" @click="openInterestsModal">+</button>
      </div>
      <InterestsModal
        :showModal="interestsModalVisible"
        @close-modal="closeInterestsModal"
      />

      <!-- Links Section -->
      <div class="section">
        <h2>Links</h2>
        <button class="plus-icon" @click="openLinksModal">+</button>
      </div>
      <LinksModal
        :showModal="linksModalVisible"
        @close-modal="closeLinksModal"
      />

      <!-- Experience Section -->
      <div class="section">
        <h2>Experience</h2>
        <button class="plus-icon" @click="openExperienceModal">+</button>
      </div>
      <ExperienceModal
        :show-modal="experienceModalVisible"
        @close-modal="closeExperienceModal"
      />

      <!-- Projects Section -->
      <div class="section">
        <h2>Projects</h2>
        <button class="plus-icon" @click="openProjectsModal">+</button>
      </div>
      <ProjectsModal
        :showModal="projectsModalVisible"
        @close-modal="closeProjectsModal"
      />

      <!-- Awards Section -->
      <div class="section">
        <h2>Awards</h2>
        <button class="plus-icon" @click="openAwardsModal">+</button>
      </div>
      <AwardsModal
        :showModal="awardsModalVisible"
        @close-modal="closeAwardsModal"
        @award-added="addAward"
      />
    </div>

    <!-- Generate Resume Button -->
    <div class="generate-resume">
      <v-btn color="primary" @click="generateResume">Generate Resume</v-btn>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/nav.vue'
import PersonalInfoModal from '../components/PersonalInfo.vue'
import SkillsModal from '../components/SkillsModal.vue'
import EducationModal from '../components/educationModal.vue'
import InterestsModal from '../components/InterestsModal.vue'
import ProjectsModal from '../components/ProjectsModal.vue'
import ExperienceModal from '@/components/ExperienceModal.vue'
import LinksModal from '../components/LinksModal.vue'
import AwardsModal from '../components/AwardsModal.vue' // Import AwardsModal

export default {
  components: {
    NavBar,
    PersonalInfoModal,
    SkillsModal,
    EducationModal,
    ProjectsModal,
    ExperienceModal,
    LinksModal,
    InterestsModal,
    AwardsModal, // Register AwardsModal
  },
  data() {
    return {
      skills: [],
      personalInfoModalVisible: false,
      skillsModalVisible: false,
      educationModalVisible: false,
      interestsModalVisible: false,
      linksModalVisible: false,
      projectsModalVisible: false,
      experienceModalVisible: false,
      awardsModalVisible: false, // Visibility for Awards modal
      skillsExpanded: false,
      awards: [], // List to store awards
    }
  },
  methods: {
    openPersonalInfoModal() {
      this.personalInfoModalVisible = true
    },
    closePersonalInfoModal() {
      this.personalInfoModalVisible = false
    },
    openSkillsModal() {
      this.skillsModalVisible = true
    },
    closeSkillsModal() {
      this.skillsModalVisible = false
    },
    openEducationModal() {
      this.educationModalVisible = true
    },
    closeEducationModal() {
      this.educationModalVisible = false
    },
    openInterestsModal() {
      this.interestsModalVisible = true
    },
    closeInterestsModal() {
      this.interestsModalVisible = false
    },
    openLinksModal() {
      this.linksModalVisible = true
    },
    closeLinksModal() {
      this.linksModalVisible = false
    },
    openProjectsModal() {
      this.projectsModalVisible = true
    },
    closeProjectsModal() {
      this.projectsModalVisible = false
    },
    openExperienceModal() {
      this.experienceModalVisible = true
    },
    closeExperienceModal() {
      this.experienceModalVisible = false
    },
    openAwardsModal() {
      this.awardsModalVisible = true
    },
    closeAwardsModal() {
      this.awardsModalVisible = false
    },
    addAward(award) {
      console.log('Award added:', award) // Handle adding the award
      this.awards.push(award) // Add the award to the awards list
    },
    toggleSkillsExpand() {
      this.skillsExpanded = !this.skillsExpanded
    },
    // Empty method for generating resume
    generateResume() {
      console.log('Generate Resume button clicked!')
      // Logic for generating resume will go here
    },
  },
}
</script>

<style scoped>
/* New styling for the navbar */
.navbar {
  background-color: #82152b; /* Set the new navbar color */
  color: white;
  padding: 1rem;
}

/* Header description styling */
.header-description {
  text-align: center;
  margin: 2rem 0;
}

.header-description h1 {
  color: #82152b;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.header-description p {
  color: #333;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Styling for the resume sections container */
.resume-sections {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto; /* Center the content */
}

/* Styling for individual sections */
.section {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;
  transition: box-shadow 0.3s ease; /* Add a smooth shadow effect */
}

.section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow on hover */
}

/* Plus icon styling */
.plus-icon {
  position: absolute;
  right: 1rem;
  bottom: 3rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #82152b;
  cursor: pointer;
  transition: transform 0.3s ease; /* Add animation */
}

.plus-icon:hover {
  transform: scale(1.2); /* Scale up the icon on hover */
}

.arrow-icon {
  position: absolute;
  right: 0.67rem;
  bottom: 1rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #82152b;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.arrow-icon:hover {
  transform: rotate(180deg); /* Rotate arrow on hover */
}

/* Button container for generate resume button */
.generate-resume {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.generate-resume .v-btn {
  background-color: #82152b;
  color: white;
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
}
</style>
