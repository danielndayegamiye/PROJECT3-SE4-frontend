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
        <!-- Plus icon to open personal info modal -->
        <button class="plus-icon" @click="openPersonalInfoModal">+</button>
      </div>

      <!-- Modal for Personal Info -->
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

      <!-- Modal for Skills -->
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
      ></EducationModal>

      <!-- Interests Section -->
      <div class="section">
        <h2>Interests</h2>
        <button class="plus-icon" @click="openInterestsModal">+</button>
      </div>

      <InterestsModal
        :showModal="interestsModalVisible"
        @close-modal="closeInterestsModal"
      ></InterestsModal>

      <!-- Links Section -->
      <div class="section">
        <h2>Links</h2>
        <button class="plus-icon" @click="openLinksModal">+</button>
      </div>

      <LinksModal
        :showModal="linksModalVisible"
        @close-modal="closeLinksModal"
      ></LinksModal>

      <!-- Experience Section -->
      <div class="section">
        <h2>Experience</h2>
        <button class="plus-icon" @click="openExperienceModal">+</button>
      </div>

      <!-- Modal for Experience -->
      <ExperienceModal
        :show-modal="experienceModalVisible"
        @close-modal="closeExperienceModal"
      ></ExperienceModal>

      <!-- Projects Section -->
      <div class="section">
        <h2>Projects</h2>
        <button class="plus-icon" @click="openProjectsModal">+</button>
      </div>

      <ProjectsModal
        :showModal="projectsModalVisible"
        @close-modal="closeProjectsModal"
      />

      <!-- Other Resume Sections -->
      <div class="section" v-for="section in sections" :key="section.name">
        <h2>{{ section.name }}</h2>
        <!-- Plus icon to open modal -->
        <button class="plus-icon" @click="openModal(section.name)">+</button>
      </div>

      <!-- Modal for other sections -->
      <div v-if="modalVisible" class="modal">
        <div class="modal-content">
          <span class="close-button" @click="closeModal">&times;</span>
          <p>{{ activeSection }} Content Placeholder</p>
        </div>
      </div>
    </div>

    <!-- Generate Resume Button -->
    <div class="generate-resume">
      <v-btn color="primary" @click="generateResume">Generate Resume</v-btn>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/nav.vue'
import PersonalInfoModal from '../components/PersonalInfo.vue' // Importing the Personal Info modal
import SkillsModal from '../components/SkillsModal.vue' //Importing the Skills Modal
import EducationModal from '../components/educationModal.vue' //Importing the education Modal
import InterestsModal from '../components/InterestsModal.vue' //Importing the interests Modal
import ProjectsModal from '../components/ProjectsModal.vue' //Importing the projects Modal
import ExperienceModal from '@/components/ExperienceModal.vue' //Importing the Experience Modal
import Utils from '../config/utils'
import SkillServices from '@/services/skillsServices'
import LinksModal from '../components/LinksModal.vue' //Importing the links Modal

export default {
  components: {
    NavBar,
    PersonalInfoModal, // Register PersonalInfoModal component
    SkillsModal, //Register SkillsModal component
    EducationModal, //Register EducationModal component
    ProjectsModal, //Register ProjectsModal component
    ExperienceModal,
    LinksModal,
    InterestsModal,
  },
  created() {
    this.fetchSkills()
  },

  data() {
    return {
      sections: [
        { name: 'Awards' }, // New section
      ],
      skills: [],
      modalVisible: false,
      personalInfoModalVisible: false, // Modal visibility for personal info
      skillsModalVisible: false,
      educationModalVisible: false,
      interestsModalVisible: false,
      linksModalVisible: false,
      projectsModalVisible: false,
      experienceModalVisible: false,
      skillsExpanded: false,
      activeSection: '',
    }
  },
  methods: {
    // Method to open modal for regular sections
    openModal(sectionName) {
      this.activeSection = sectionName
      this.modalVisible = true
    },
    closeModal() {
      this.modalVisible = false
      this.activeSection = ''
    },
    async fetchSkills() {
      try {
        const userId = Utils.getStore('user').userId // Retrieve userId from Utils
        const response = await SkillServices.getSkillsByUserId(userId) // Fetch skills from the server
        this.skills = response.data.map(skill => ({
          ...skill,
          props: {
            appendIcon: 'mdi-delete',
          },
        }))
        console.log('Here: ' + this.skills)
      } catch (error) {
        console.error('Failed to fetch skills:', error)
      }
    },
    // Methods for handling personal info modal
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
      this.fetchSkills()
    },
    openEducationModal() {
      this.educationModalVisible = true
    },
    closeEducationModal() {
      this.educationModalVisible = false
    },
    openInterestsModal() {
      this.interestModalVisible = true
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
  transform: scale(1.2);
}

/* Modal overlay styling */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Modal content box styling */
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  position: relative;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Box shadow for better appearance */
}

/* Close button styling */
.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Styling for the Generate Resume button */
.generate-resume {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

/* Additional styling to make the layout look more polished */
h2 {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 0.5rem;
}

button {
  cursor: pointer;
}

.rotated {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.expanded-content {
  padding: 1rem 0;
}

.skills-list {
  width: 90%;
}

@media (max-width: 768px) {
  /* Responsive design adjustments for smaller screens */
  .resume-sections {
    padding: 1rem;
  }

  .section {
    padding: 1rem;
  }

  .modal-content {
    width: 90%;
  }
}
</style>
