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
        <h2 @click="togglePersonalInfoExpand">
          Personal Info
          <v-icon
            :class="{ rotated: personalInfoExpanded }"
            class="arrow-icon"
            size="small"
            >mdi-chevron-down</v-icon
          >
        </h2>
        <button class="plus-icon" @click="openPersonalInfoModal">+</button>

        <v-expand-transition>
          <div v-show="personalInfoExpanded" class="expanded-content">
            <v-list class="list" dense>
              <v-list-item
                v-for="personalInfo in personalInfos"
                :key="personalInfo.id"
                class="list-item"
                density="compact"
                :title="`${personalInfo.first_name.trim()} ${personalInfo.last_name.trim()}, ${personalInfo.email.trim()}, ${personalInfo.phone_number.trim()}`"
              >
                <template v-slot:append
                  ><v-icon class="icon mr-4">mdi-pencil</v-icon
                  ><v-icon
                    class="icon"
                    @click="deletePersonalInfo(personalInfo.id)"
                    >mdi-delete</v-icon
                  ></template
                >
                <template v-slot:prepend
                  ><v-checkbox-btn></v-checkbox-btn
                ></template>
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>
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
            <v-list class="list" dense>
              <v-list-item
                v-for="skill in skills"
                :key="skill.id"
                class="list-item"
                density="compact"
                :title="skill.name"
              >
                <template v-slot:append
                  ><v-icon class="icon mr-4">mdi-pencil</v-icon
                  ><v-icon class="icon">mdi-delete</v-icon></template
                >
                <template v-slot:prepend
                  ><v-checkbox-btn></v-checkbox-btn
                ></template>
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
        <h2 @click="toggleEducationExpand">
          Education
          <v-icon
            :class="{ rotated: educationExpanded }"
            class="arrow-icon"
            size="small"
          >
            mdi-chevron-down
          </v-icon>
        </h2>
        <button class="plus-icon" @click="openEducationModal">+</button>

        <v-expand-transition>
          <div v-show="educationExpanded" class="expanded-content">
            <v-list class="list" dense>
              <v-list-item
                v-for="edu in education"
                :key="edu.id"
                class="list-item"
                density="compact"
                :title="`${edu.degree.trim()}, ${edu.institution.trim()}`"
              >
                <template v-slot:append
                  ><v-icon class="icon mr-4">mdi-pencil</v-icon
                  ><v-icon class="icon">mdi-delete</v-icon></template
                >
                <template v-slot:prepend
                  ><v-checkbox-btn></v-checkbox-btn
                ></template>
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>
      </div>

      <EducationModal
        :showModal="educationModalVisible"
        @close-modal="closeEducationModal"
      />

      <!-- Interests Section -->
      <div class="section">
        <h2 @click="toggleInterestsExpand">
          Interests
          <v-icon
            :class="{ rotated: interestsExpanded }"
            class="arrow-icon"
            size="small"
            >mdi-chevron-down</v-icon
          >
        </h2>
        <button class="plus-icon" @click="openInterestsModal">+</button>

        <v-expand-transition>
          <div v-show="interestsExpanded" class="expanded-content">
            <v-list class="skills-list" dense>
              <v-list-item
                v-for="interest in interests"
                :key="interest.id"
                class="list-item"
                density="compact"
                append-icon="mdi-delete"
                :title="interest.careerPosition"
              >
                <template v-slot:prepend
                  ><v-checkbox-btn></v-checkbox-btn
                ></template>
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>
      </div>

      <InterestsModal
        :showModal="interestsModalVisible"
        @close-modal="closeInterestsModal"
      ></InterestsModal>

      <!-- Links Section -->
      <div class="section">
        <h2 @click="toggleLinksExpand">
          Links
          <v-icon
            :class="{ rotated: linksExpanded }"
            class="arrow-icon"
            size="small"
            >mdi-chevron-down</v-icon
          >
        </h2>
        <button class="plus-icon" @click="openLinksModal">+</button>

        <v-expand-transition>
          <div v-show="linksExpanded" class="expanded-content">
            <v-list class="list" dense>
              <v-list-item
                v-for="link in links"
                :key="link.id"
                class="list-item"
                density="compact"
                append-icon="mdi-delete"
                :title="link.type"
              >
                <template v-slot:prepend
                  ><v-checkbox-btn></v-checkbox-btn
                ></template>
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>
      </div>

      <LinksModal
        :showModal="linksModalVisible"
        @close-modal="closeLinksModal"
      ></LinksModal>

      <!-- Experience Section -->
      <div class="section">
        <h2 @click="toggleExperienceExpand">
          Experience
          <v-icon
            :class="{ rotated: experienceExpanded }"
            class="arrow-icon"
            size="small"
            >mdi-chevron-down</v-icon
          >
        </h2>
        <button class="plus-icon" @click="openExperienceModal">+</button>

        <v-expand-transition>
          <div v-show="experienceExpanded" class="expanded-content">
            <v-list class="list" dense>
              <v-list-item
                v-for="experience in experiences"
                :key="experience.id"
                class="list-item"
                density="compact"
                :title="`${experience.job_title.trim()}, ${experience.company_name.trim()}, ${experience.start_date.trim()} - ${experience.end_date.trim()}`"
              >
                <template v-slot:append
                  ><v-icon class="icon mr-4">mdi-pencil</v-icon
                  ><v-icon class="icon" @click="deleteExperience(experience.id)"
                    >mdi-delete</v-icon
                  ></template
                >
                <template v-slot:prepend
                  ><v-checkbox-btn></v-checkbox-btn
                ></template>
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>
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

      <!-- Awards Section -->
      <div class="section">
        <h2>Awards</h2>
        <button class="plus-icon" @click="openAwardsModal">+</button>
      </div>
      <AwardsModal
        :showModal="awardsModalVisible"
        @close-modal="closeAwardsModal"
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
import PersonalInfoModal from '../components/PersonalInfo.vue' // Importing the Personal Info modal
import SkillsModal from '../components/SkillsModal.vue' //Importing the Skills Modal
import EducationModal from '../components/educationModal.vue' //Importing the education Modal
import InterestsModal from '../components/InterestsModal.vue' //Importing the interests Modal
import ProjectsModal from '../components/ProjectsModal.vue' //Importing the projects Modal
import ExperienceModal from '@/components/ExperienceModal.vue' //Importing the Experience Modal
import Utils from '../config/utils'
import SkillServices from '@/services/skillsServices'
import EducationServices from '@/services/educationServices'
import LinkServices from '@/services/linkServices'
import InterestServices from '@/services/interestServices'
import PersonalInfoServices from '@/services/personalInfoServices'
import LinksModal from '../components/LinksModal.vue' //Importing the links Modal
import AwardsModal from '@/components/AwardsModal.vue'
import ExperienceServices from '@/services/experienceServices'

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
    AwardsModal,
  },
  created() {
    this.fetchSkills(),
      this.fetchEducation(),
      this.fetchLink(),
      this.fetchInterest(),
      this.fetchPersonalInfos()
    this.fetchExperiences()
  },

  data() {
    return {
      skills: [],
      education: [],
      links: [],
      interests: [],
      personalInfos: [],
      experiences: [],
      modalVisible: false,
      personalInfoModalVisible: false, // Modal visibility for personal info
      skillsModalVisible: false,
      educationModalVisible: false,
      interestsModalVisible: false,
      linksModalVisible: false,
      projectsModalVisible: false,
      experienceModalVisible: false,
      awardsModalVisible: false,
      skillsExpanded: false,
      interestsExpanded: false,
      educationExpanded: false,
      linksExpanded: false,
      personalInfoExpanded: false,
      experienceExpanded: false,
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
    async fetchEducation() {
      try {
        const userId = Utils.getStore('user').userId // Retrieve userId from Utils
        const response = await EducationServices.getEducationByUserId(userId) // Fetch education from the server
        this.education = response.data.map(edu => ({
          ...edu,
          props: {
            appendIcon: 'mdi-delete',
          },
        }))
        console.log('Fetched Education:', this.education)
      } catch (error) {
        console.error('Failed to fetch education:', error)
      }
    },
    async fetchLink() {
      try {
        const userId = Utils.getStore('user').userId // Retrieve userId from Utils
        const response = await LinkServices.getLinksByUserId(userId) // Fetch education from the server
        console.log(response.data)
        this.links = response.data.map(link => ({
          ...link,
          props: {
            appendIcon: 'mdi-delete',
          },
        }))
        console.log('Fetched links:', this.links)
      } catch (error) {
        console.error('Failed to fetch link:', error)
      }
    },
    async fetchInterest() {
      try {
        const userId = Utils.getStore('user').userId // Retrieve userId from Utils
        const response = await InterestServices.getInterestsByUserId(userId) // Fetch education from the server
        this.interests = response.data.map(interest => ({
          ...interest,
          props: {
            appendIcon: 'mdi-delete',
          },
        }))
        console.log('Fetched Interest:', this.interests)
      } catch (error) {
        console.error('Failed to fetch interest:', error)
      }
    },
    async fetchPersonalInfos() {
      try {
        const userId = Utils.getStore('user').userId // Retrieve userId from Utils
        const response =
          await PersonalInfoServices.getPersonalInfoByUserId(userId)
        this.personalInfos = response.data.map(personalInfo => ({
          ...personalInfo,
          props: {
            appendIcon: 'mdi-delete',
          },
        }))
        console.log('Fetched Personal Info:', this.personalInfos)
      } catch (error) {
        console.error('Failed to fetch personal info:', error)
      }
    },
    async fetchExperiences() {
      try {
        const userId = Utils.getStore('user').userId // Retrieve userId from Utils
        const response = await ExperienceServices.getExperienceByUserId(userId)
        this.experiences = response.data.map(experience => ({
          ...experience,
          props: {
            appendIcon: 'mdi-delete',
          },
        }))
        console.log('Fetched Experiences:', this.experiences)
      } catch (error) {
        console.error('Failed to fetch experiences:', error)
      }
    },
    async deletePersonalInfo(personalInfoId) {
      try {
        await PersonalInfoServices.deletePersonalInfo(personalInfoId)
        this.fetchPersonalInfos()
        console.log(
          `Personal Info with id ${personalInfoId} deleted successfully.`,
        )
      } catch (error) {
        console.error('Failed to delete personal info:', error)
      }
    },
    async deleteExperience(experienceId) {
      try {
        await ExperienceServices.deleteExperience(experienceId)
        this.fetchExperiences()
        console.log(`Experience with id ${experienceId} deleted successfully.`)
      } catch (error) {
        console.error('Failed to delete experience:', error)
      }
    },
    // Methods for handling personal info modal
    openPersonalInfoModal() {
      this.personalInfoModalVisible = true
    },
    closePersonalInfoModal() {
      this.personalInfoModalVisible = false
      this.fetchPersonalInfos()
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
      this.fetchEducation()
    },
    openInterestsModal() {
      this.interestsModalVisible = true
    },
    closeInterestsModal() {
      this.interestsModalVisible = false
      this.fetchInterest()
    },
    openLinksModal() {
      this.linksModalVisible = true
    },
    closeLinksModal() {
      this.linksModalVisible = false
      this.fetchLink()
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
      this.fetchExperiences()
    },
    openAwardsModal() {
      this.awardsModalVisible = true
    },
    closeAwardsModal() {
      this.awardsModalVisible = false
    },
    toggleSkillsExpand() {
      this.skillsExpanded = !this.skillsExpanded
    },
    toggleEducationExpand() {
      this.educationExpanded = !this.educationExpanded
    },
    toggleLinksExpand() {
      this.linksExpanded = !this.linksExpanded
    },
    toggleInterestsExpand() {
      this.interestsExpanded = !this.interestsExpanded
    },
    togglePersonalInfoExpand() {
      this.personalInfoExpanded = !this.personalInfoExpanded
    },
    toggleExperienceExpand() {
      this.experienceExpanded = !this.experienceExpanded
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

.icon {
  color: #000000;
  transition: transform 0.3s ease;
}

.icon:hover {
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

.list {
  width: 90%;
  margin-bottom: 1px;
  padding: 4px 16px;
}

.list-item {
  padding: 4px 16px;
  margin-bottom: 1px;
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
