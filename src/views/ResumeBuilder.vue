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
                    @click="
                      openDeleteModal(
                        personalInfo.id,
                        `${personalInfo.first_name.trim()} ${personalInfo.last_name.trim()}, ${personalInfo.email.trim()}, ${personalInfo.phone_number.trim()}`,
                        'Personal Info',
                      )
                    "
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
                  ><v-icon
                    class="icon"
                    @click="
                      openDeleteModal(skill.id, `${skill.name.trim()}`, 'Skill')
                    "
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
                  ><v-icon
                    class="icon"
                    @click="
                      openDeleteModal(
                        edu.id,
                        `${edu.degree.trim()}, ${edu.institution.trim()}`,
                        'Education',
                      )
                    "
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
            <v-list class="list" dense>
              <v-list-item
                v-for="interest in interests"
                :key="interest.id"
                class="list-item"
                density="compact"
                :title="interest.careerPosition"
              >
                <template v-slot:append
                  ><v-icon class="icon mr-4">mdi-pencil</v-icon
                  ><v-icon
                    class="icon"
                    @click="
                      openDeleteModal(
                        interest.id,
                        `${interest.careerPosition.trim()}`,
                        'Interest',
                      )
                    "
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
                :title="link.type"
              >
                <template v-slot:append
                  ><v-icon class="icon mr-4">mdi-pencil</v-icon
                  ><v-icon
                    class="icon"
                    @click="
                      openDeleteModal(link.id, `${link.type.trim()}`, 'Link')
                    "
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
                  ><v-icon
                    class="icon"
                    @click="
                      openDeleteModal(
                        experience.id,
                        `${experience.job_title.trim()}, ${experience.company_name.trim()}, ${experience.start_date.trim()} - ${experience.end_date.trim()}`,
                        'Experience',
                      )
                    "
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
        <h2 @click="toggleAwardsExpand">
          Awards
          <v-icon
            :class="{ rotated: awardsExpanded }"
            class="arrow-icon"
            size="small"
            >mdi-chevron-down</v-icon
          >
        </h2>
        <button class="plus-icon" @click="openAwardsModal">+</button>

        <v-expand-transition>
          <div v-show="awardsExpanded" class="expanded-content">
            <v-list class="list" dense>
              <v-list-item
                v-for="award in awards"
                :key="award.id"
                class="list-item"
                density="compact"
                :title="award.title"
              >
                <template v-slot:append
                  ><v-icon class="icon mr-4">mdi-pencil</v-icon
                  ><v-icon class="icon" @click="deleteAward(award.id)"
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

      <!-- Modal for Awards -->
      <AwardsModal
        :showModal="awardsModalVisible"
        @close-modal="closeAwardsModal"
      ></AwardsModal>
    </div>

    <!-- Generate Resume Button -->
    <div class="generate-resume">
      <v-btn color="primary" @click="generateResume">Generate Resume</v-btn>
    </div>
  </div>

  <DeleteConfirm
    :showModal="deleteModalVisible"
    :itemId="itemToDeleteId"
    :itemName="itemToDeleteName"
    :deleteService="deleteService"
    @close-modal="closeDeleteModal"
    @confirm-delete="deleteItem"
  />
</template>

<script>
import NavBar from '../components/nav.vue'
import PersonalInfoModal from '../components/PersonalInfo.vue'
import SkillsModal from '../components/SkillsModal.vue'
import EducationModal from '../components/educationModal.vue'
import InterestsModal from '../components/InterestsModal.vue'
import ProjectsModal from '../components/ProjectsModal.vue'
import ExperienceModal from '@/components/ExperienceModal.vue'
import Utils from '../config/utils'
import SkillServices from '@/services/skillsServices'
import EducationServices from '@/services/educationServices'
import LinkServices from '@/services/linkServices'
import InterestServices from '@/services/interestServices'
import PersonalInfoServices from '@/services/personalInfoServices'
import LinksModal from '../components/LinksModal.vue'
import AwardsModal from '@/components/AwardsModal.vue'
import ExperienceServices from '@/services/experienceServices'
import DeleteConfirm from '@/components/DeleteConfirm.vue'
import AwardsServices from '@/services/awardsServices'

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
    AwardsModal,
    DeleteConfirm,
  },
  created() {
    this.fetchSkills(),
      this.fetchEducation(),
      this.fetchLink(),
      this.fetchInterest(),
      this.fetchPersonalInfos(),
      this.fetchExperiences(),
      this.fetchAwards()
  },
  data() {
    return {
      skills: [],
      education: [],
      links: [],
      interests: [],
      personalInfos: [],
      experiences: [],
      awards: [],
      modalVisible: false,
      personalInfoModalVisible: false,
      skillsModalVisible: false,
      educationModalVisible: false,
      interestsModalVisible: false,
      linksModalVisible: false,
      projectsModalVisible: false,
      experienceModalVisible: false,
      awardsModalVisible: false,
      deleteModalVisible: false,
      skillsExpanded: false,
      interestsExpanded: false,
      educationExpanded: false,
      linksExpanded: false,
      personalInfoExpanded: false,
      experienceExpanded: false,
      itemToDeleteId: null,
      itemToDeleteName: '',
      deleteService: '',
      awardsExpanded: false,
      activeSection: '',
    }
  },
  methods: {
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
        const userId = Utils.getStore('user').userId
        const response = await SkillServices.getSkillsByUserId(userId)
        this.skills = response.data.map(skill => ({
          ...skill,
          props: { appendIcon: 'mdi-delete' },
        }))
        console.log('Here: ' + this.skills)
      } catch (error) {
        console.error('Failed to fetch skills:', error)
      }
    },
    async fetchEducation() {
      try {
        const userId = Utils.getStore('user').userId
        const response = await EducationServices.getEducationByUserId(userId)
        this.education = response.data.map(edu => ({
          ...edu,
          props: { appendIcon: 'mdi-delete' },
        }))
        console.log('Fetched Education:', this.education)
      } catch (error) {
        console.error('Failed to fetch education:', error)
      }
    },
    async fetchLink() {
      try {
        const userId = Utils.getStore('user').userId
        const response = await LinkServices.getLinksByUserId(userId)
        this.links = response.data.map(link => ({
          ...link,
          props: { appendIcon: 'mdi-delete' },
        }))
        console.log('Fetched links:', this.links)
      } catch (error) {
        console.error('Failed to fetch link:', error)
      }
    },
    async fetchInterest() {
      try {
        const userId = Utils.getStore('user').userId
        const response = await InterestServices.getInterestsByUserId(userId)
        this.interests = response.data.map(interest => ({
          ...interest,
          props: { appendIcon: 'mdi-delete' },
        }))
        console.log('Fetched Interest:', this.interests)
      } catch (error) {
        console.error('Failed to fetch interest:', error)
      }
    },
    async fetchPersonalInfos() {
      try {
        const userId = Utils.getStore('user').userId
        const response =
          await PersonalInfoServices.getPersonalInfoByUserId(userId)
        this.personalInfos = response.data.map(personalInfo => ({
          ...personalInfo,
          props: { appendIcon: 'mdi-delete' },
        }))
        console.log('Fetched Personal Info:', this.personalInfos)
      } catch (error) {
        console.error('Failed to fetch personal info:', error)
      }
    },
    async fetchExperiences() {
      try {
        const userId = Utils.getStore('user').userId
        const response = await ExperienceServices.getExperienceByUserId(userId)
        this.experiences = response.data.map(experience => ({
          ...experience,
          props: { appendIcon: 'mdi-delete' },
        }))
        console.log('Fetched Experiences:', this.experiences)
      } catch (error) {
        console.error('Failed to fetch experiences:', error)
      }
    },
    async fetchAwards() {
      try {
        const userId = Utils.getStore('user').userId
        const response = await AwardsServices.getAwardsByUserId(userId)
        this.awards = response.data.map(award => ({
          ...award,
          props: { appendIcon: 'mdi-delete' },
        }))
        console.log('Fetched Awards:', this.awards)
      } catch (error) {
        console.error('Failed to fetch awards:', error)
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
    async deleteSkill(skillId) {
      try {
        await SkillServices.deleteSkill(skillId)
        this.fetchSkills()
        console.log(`Skill with id ${skillId} deleted successfully.`)
      } catch (error) {
        console.error('Failed to delete skill:', error)
      }
    },
    async deleteEducation(educationId) {
      try {
        await EducationServices.deleteEducation(educationId)
        this.fetchEducation()
        console.log(`Education with id ${educationId} deleted successfully.`)
      } catch (error) {
        console.error('Failed to delete education:', error)
      }
    },
    async deleteInterest(interestId) {
      try {
        await InterestServices.deleteInterest(interestId)
        this.fetchInterest()
        console.log(`Interest with id ${interestId} deleted successfully.`)
      } catch (error) {
        console.error('Failed to delete interest:', error)
      }
    },
    async deleteLink(linkId) {
      try {
        await LinkServices.deleteLink(linkId)
        this.fetchLink()
        console.log(`Link with id ${linkId} deleted successfully.`)
      } catch (error) {
        console.error('Failed to delete link:', error)
      }
    },
    deleteItem(itemId, deleteService) {
      switch (deleteService) {
        case 'Personal Info':
          this.deletePersonalInfo(itemId)
          break
        case 'Skill':
          this.deleteSkill(itemId)
          break
        case 'Education':
          this.deleteEducation(itemId)
          break
        case 'Interest':
          this.deleteInterest(itemId)
          break
        case 'Link':
          this.deleteLink(itemId)
          break
        case 'Experience':
          this.deleteExperience(itemId)
          break
        case 'Project':
          break
        case 'Award':
          break
        default:
          break
      }

      this.closeDeleteModal()
    },
    // Methods for handling personal info modal
    async deleteAward(awardId) {
      try {
        await AwardsServices.deleteAward(awardId)
        this.fetchAwards()
        console.log(`Award with id ${awardId} deleted successfully.`)
      } catch (error) {
        console.error('Failed to delete award:', error)
      }
    },
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
      this.fetchAwards()
    },
    openDeleteModal(itemId, itemName, deleteService) {
      this.itemToDeleteId = itemId
      this.itemToDeleteName = itemName
      this.deleteService = deleteService
      this.deleteModalVisible = true
    },
    closeDeleteModal() {
      this.deleteModalVisible = false
      this.itemToDeleteId = null
      this.itemToDeleteName = ''
      this.deleteService = ''
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
    toggleAwardsExpand() {
      this.awardsExpanded = !this.awardsExpanded
    },
    generateResume() {
      console.log('Generate Resume button clicked!')
    },
  },
}
</script>

<style scoped>
/* New styling for the navbar */
.navbar {
  background-color: #82152b;
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
  margin: 0 auto;
}

.section {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;
  transition: box-shadow 0.3s ease;
}

.section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.plus-icon {
  position: absolute;
  right: 1rem;
  bottom: 3rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #82152b;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.plus-icon:hover {
  transform: scale(1.2);
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

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  position: relative;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.generate-resume {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

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
