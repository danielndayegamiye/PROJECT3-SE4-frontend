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
                  ><v-icon class="icon mr-4" @click="openPersonalInfoModal(personalInfo)">mdi-pencil</v-icon
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
        :personalInfo="selectedPersonalInfo"
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
                  ><v-icon class="icon mr-4" @click="openSkillsModal(skill)">mdi-pencil</v-icon
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
        :skill="selectedSkill"
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
                  ><v-icon class="icon mr-4" @click="openEducationModal(edu)">mdi-pencil</v-icon
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
        :education="selectedEducation"
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
                  ><v-icon class="icon mr-4" @click="openInterestsModal(interest)">mdi-pencil</v-icon
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
        :interest="selectedInterest"
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
                  ><v-icon class="icon mr-4" @click="openLinksModal(link)">mdi-pencil</v-icon
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
        :link="selectedLink"
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
                  ><v-icon class="icon mr-4" @click="openExperienceModal(experience)">mdi-pencil</v-icon
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
        :experience="selectedExperience"
        @close-modal="closeExperienceModal"
        
      ></ExperienceModal>

      <!-- Projects Section -->
      <div class="section">
        <h2 @click="toggleProjectsExpand">
          Projects
          <v-icon
            :class="{ rotated: projectsExpanded }"
            class="arrow-icon"
            size="small"
          >
            mdi-chevron-down
          </v-icon>
        </h2>
        <button class="plus-icon" @click="openProjectsModal">+</button>

        <v-expand-transition>
          <div v-show="projectsExpanded" class="expanded-content">
            <v-list class="list" dense>
              <v-list-item
                v-for="project in projects"
                :key="project.id"
                class="list-item"
                density="compact"
                :title="project.project_name.trim()"
              >
                <template v-slot:append
                  ><v-icon class="icon mr-4" @click="openProjectsModal(project)">mdi-pencil</v-icon
                  ><v-icon
                    class="icon"
                    @click="
                      openDeleteModal(
                        project.id,
                        `${project.project_name.trim()}`,
                        'Project',
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

      <ProjectsModal
        :showModal="projectsModalVisible"
        :project="selectedProject"
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
                :title="`${award.title.trim()} - ${award.year_Awarded}`"
              >
                <template v-slot:append
                  ><v-icon class="icon mr-4" @click="openAwardsModal(award)">mdi-pencil</v-icon
                  ><v-icon
                    class="icon"
                    @click="
                      openDeleteModal(
                        award.id,
                        `${award.title.trim()} - ${award.year_Awarded}`,
                        'Award',
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

      <!-- Modal for Awards -->
      <AwardsModal
        :showModal="awardsModalVisible"
        :award="selectedAward"
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
  <!-- PDF Preview Modal -->
  <v-dialog v-model="pdfPreviewVisible" max-width="800px">
    <v-card>
      <v-card-title>PDF Preview</v-card-title>
      <v-card-text>
        <iframe
          v-if="pdfDataUrl"
          :src="pdfDataUrl"
          width="100%"
          height="600px"
        ></iframe>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="pdfPreviewVisible = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import NavBar from '../components/nav.vue'
import jsPDF from 'jspdf'
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
import ProjectsServices from '@/services/projectsServices'
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
      this.fetchProjects(),
      this.fetchExperiences(),
      this.fetchAwards()
  },
  data() {
    return {
      pdfPreviewVisible: false,
      pdfDataUrl: null,
      skills: [],
      education: [],
      links: [],
      interests: [],
      personalInfos: [],
      projects: [],
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
      projectsExpanded: false,
      experienceExpanded: false,
      itemToDeleteId: null,
      itemToDeleteName: '',
      deleteService: '',
      awardsExpanded: false,
      activeSection: '',
      selectedPersonalInfo: null,
      selectedSkill: null,
      selectedEducation: null,
      selectedInterest: null,
      selectedLink: null,
      selectedExperience: null,
      selectedProject: null,
      selectedAward: null,
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
      } catch (error) {
        console.error('Failed to fetch education:', error)
      }
    },
    async fetchProjects() {
      try {
        const userId = Utils.getStore('user').userId // Retrieve userId from Utils
        const response = await ProjectsServices.getProjectsByUserId(userId) // Fetch projects from the server
        this.projects = response.data.map(project => ({
          ...project,
          props: {
            appendIcon: 'mdi-delete',
          },
        }))
      } catch (error) {
        console.error('Failed to fetch projects:', error)
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
      } catch (error) {
        console.error('Failed to fetch awards:', error)
      }
    },
    async deletePersonalInfo(personalInfoId) {
      try {
        await PersonalInfoServices.deletePersonalInfo(personalInfoId)
        this.fetchPersonalInfos()
      } catch (error) {
        console.error('Failed to delete personal info:', error)
      }
    },
    async deleteExperience(experienceId) {
      try {
        await ExperienceServices.deleteExperience(experienceId)
        this.fetchExperiences()
      } catch (error) {
        console.error('Failed to delete experience:', error)
      }
    },
    async deleteSkill(skillId) {
      try {
        await SkillServices.deleteSkill(skillId)
        this.fetchSkills()
      } catch (error) {
        console.error('Failed to delete skill:', error)
      }
    },
    async deleteEducation(educationId) {
      try {
        await EducationServices.deleteEducation(educationId)
        this.fetchEducation()
      } catch (error) {
        console.error('Failed to delete education:', error)
      }
    },
    async deleteInterest(interestId) {
      try {
        await InterestServices.deleteInterest(interestId)
        this.fetchInterest()
      } catch (error) {
        console.error('Failed to delete interest:', error)
      }
    },
    async deleteLink(linkId) {
      try {
        await LinkServices.deleteLink(linkId)
        this.fetchLink()
      } catch (error) {
        console.error('Failed to delete link:', error)
      }
    },
    async deleteProject(projectId) {
      try {
        await ProjectsServices.deleteProject(projectId)
        this.fetchProjects()
      } catch (error) {
        console.error('Failed to delete project:', error)
      }
    },
    async deleteAward(awardId) {
      try {
        await AwardsServices.deleteAward(awardId)
        this.fetchAwards()
      } catch (error) {
        console.error('Failed to delete award:', error)
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
          this.deleteProject(itemId)
          break
        case 'Award':
          this.deleteAward(itemId)
          break
        default:
          break
      }

      this.closeDeleteModal()
    },
    openPersonalInfoModal(personalInfo = null) {
      if (personalInfo) {
        // Editing existing personal info
        this.selectedPersonalInfo = { ...personalInfo };
        console.log(`Opening for editing ${this.personalInfo}`)
      } else {
        // Adding new personal info
        this.selectedPersonalInfo = null;
      }
      this.personalInfoModalVisible = true;
    },
    closePersonalInfoModal() {
      this.personalInfoModalVisible = false
      this.selectedPersonalInfo = null;
      this.fetchPersonalInfos()
    },
    openSkillsModal(skill = null) {
      if(skill){
        this.selectedSkill = {...skill};
      } else {
        this.selectedSkill = null;
      }
      this.skillsModalVisible = true;
    },
    closeSkillsModal() {
      this.skillsModalVisible = false
      this.selectedSkill = null;
      this.fetchSkills()
    },
    openEducationModal(education = null) {
      if(education){
        this.selectedEducation = {...education};
        console.log(`Opening for editing: ${this.education}`)
      } else {
        this.selectedEducation = null;
      }
      this.educationModalVisible = true;
    },
    closeEducationModal() {
      this.educationModalVisible = false
      this.selectedEducation = null;
      this.fetchEducation()
    },
    openInterestsModal(interest = null) {
      if(interest){
        this.selectedInterest = {...interest};
      } else {
        this.selectedInterest = null;
      }
      this.interestsModalVisible = true;
    },
    closeInterestsModal() {
      this.interestsModalVisible = false
      this.selectedInterest = null
      this.fetchInterest()
    },
    openLinksModal(link = null) {
      if(link){
        this.selectedLink = {...link};
      } else {
        this.selectedLink = null;
      }
      this.linksModalVisible = true;
    },
    closeLinksModal() {
      this.linksModalVisible = false
      this.selectedLink = null;
      this.fetchLink()
    },
    openProjectsModal(project = null) {
      if(project) {
        this.selectedProject = {...project}
      } else {
        this.selectedProject = null
      }
      this.projectsModalVisible = true;
    },
    closeProjectsModal() {
      this.projectsModalVisible = false
      this.selectedProject = null;
      this.fetchProjects()
    },
    openExperienceModal(experience = null) {
      if(experience){
        this.selectedExperience = {...experience}
      } else {
        this.selectedExperience = null;
      }
      this.experienceModalVisible = true;
    },
    closeExperienceModal() {
      this.experienceModalVisible = false
      this.selectedExperience = null;
      this.fetchExperiences()
    },
    openAwardsModal(award = null) {
      if(award){
        this.selectedAward = {...award}          
      } else {
        this.selectedAward = null
      }
      this.awardsModalVisible = true;
    },
    closeAwardsModal() {
      this.awardsModalVisible = false
      this.selectedAward = null
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
    toggleProjectsExpand() {
      this.projectsExpanded = !this.projectsExpanded
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
      // Generate the PDF and open the preview modal
      const doc = this.generatePdf()
      this.pdfDataUrl = doc.output('dataurlstring')
      this.pdfPreviewVisible = true
    },

    generatePdf() {
      const doc = new jsPDF()
      let yPosition = 20
      const leftMargin = 20
      const pageWidth = 210 // A4 width in mm

      // Helper functions for consistent styling
      const addHeader = (text, y) => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(12)
        doc.setTextColor(0, 0, 0)
        doc.text(text.toUpperCase(), leftMargin, y)
        doc.line(leftMargin, y + 2, pageWidth - leftMargin, y + 2) // Add underline
        return y + 10
      }

      const addBulletPoint = (text, y) => {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        doc.text('•', leftMargin, y)
        doc.text(text, leftMargin + 5, y)
        return y + 6
      }

      // Name and Contact Header
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(16)
      doc.text(
        `${this.personalInfos[0]?.first_name} ${this.personalInfos[0]?.last_name}`,
        pageWidth / 2,
        yPosition,
        { align: 'center' },
      )

      // Contact Info Line
      yPosition += 10
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      const contactInfo = [
        this.personalInfos[0]?.address,
        this.personalInfos[0]?.phone_number,
        this.personalInfos[0]?.email,
      ]
        .filter(Boolean)
        .join(' | ')
      doc.text(contactInfo, pageWidth / 2, yPosition, { align: 'center' })

      // Professional Summary
      if (this.personalInfos[0]?.summary) {
        yPosition += 15
        yPosition = addHeader('PROFESSIONAL SUMMARY', yPosition)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        const lines = doc.splitTextToSize(
          this.personalInfos[0].summary,
          pageWidth - 2 * leftMargin,
        )
        doc.text(lines, leftMargin, yPosition)
        yPosition += lines.length * 6 + 10
      }

      // Education Section
      if (this.education.length > 0) {
        yPosition = addHeader('EDUCATION', yPosition)
        this.education.forEach(edu => {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(11)
          doc.text(
            `${edu.institution}, ${edu.location || ''}`,
            leftMargin,
            yPosition,
          )

          yPosition += 6
          doc.setFont('helvetica', 'italic')
          doc.text(
            `${edu.degree} in ${edu.field_of_study}`,
            leftMargin,
            yPosition,
          )

          // Add graduation date on the right
          doc.setFont('helvetica', 'normal')
          const dateText = `${edu.graduationDate}`
          const dateWidth = doc.getTextWidth(dateText)
          doc.text(dateText, pageWidth - leftMargin - dateWidth, yPosition)

          if (edu.gpa) {
            yPosition += 6
            doc.text(`GPA: ${edu.gpa}`, leftMargin, yPosition)
          }
          yPosition += 10
        })
      }

      // Professional Experience
      if (this.experiences.length > 0) {
        yPosition = addHeader('PROFESSIONAL EXPERIENCE', yPosition)
        this.experiences.forEach(exp => {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(11)
          doc.text(
            `${exp.company_name}, ${exp.location || ''}`,
            leftMargin,
            yPosition,
          )

          // Add date range on the right
          const dateText = `${exp.start_date} - ${exp.end_date || 'Present'}`
          const dateWidth = doc.getTextWidth(dateText)
          doc.setFont('helvetica', 'normal')
          doc.text(dateText, pageWidth - leftMargin - dateWidth, yPosition)

          yPosition += 6
          doc.setFont('helvetica', 'italic')
          doc.text(exp.job_title, leftMargin, yPosition)
          yPosition += 6

          // Split responsibilities into bullet points
          const responsibilities = exp.responsibilities
            .split('. ')
            .filter(Boolean)
          responsibilities.forEach(resp => {
            if (resp.trim()) {
              yPosition = addBulletPoint(resp.trim(), yPosition)
            }
          })
          yPosition += 6
        })
      }

      // Skills Section
      if (this.skills.length > 0) {
        yPosition = addHeader('SKILLS', yPosition)
        const skillsList = this.skills.map(skill => skill.name).join(' • ')
        const skillsLines = doc.splitTextToSize(
          skillsList,
          pageWidth - 2 * leftMargin,
        )
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        doc.text(skillsLines, leftMargin, yPosition)
        yPosition += skillsLines.length * 6 + 10
      }

      // Projects Section
      if (this.projects.length > 0) {
        yPosition = addHeader('PROJECTS', yPosition)
        this.projects.forEach(project => {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(11)
          doc.text(project.project_name, leftMargin, yPosition)
          yPosition += 6

          if (project.role) {
            doc.setFont('helvetica', 'italic')
            doc.setFontSize(10)
            doc.text(`Role: ${project.role}`, leftMargin, yPosition)
            yPosition += 6
          }

          if (project.description) {
            const descLines = doc.splitTextToSize(
              project.description,
              pageWidth - 2 * leftMargin,
            )
            doc.setFont('helvetica', 'normal')
            doc.text(descLines, leftMargin, yPosition)
            yPosition += descLines.length * 6 + 6
          }
        })
      }

      // Awards Section
      if (this.awards.length > 0) {
        yPosition = addHeader('AWARDS & ACHIEVEMENTS', yPosition)
        this.awards.forEach(award => {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(10)
          doc.text(
            `${award.title} (${award.year_Awarded})`,
            leftMargin,
            yPosition,
          )
          yPosition += 6

          if (award.description) {
            doc.setFont('helvetica', 'normal')
            const descLines = doc.splitTextToSize(
              award.description,
              pageWidth - 2 * leftMargin,
            )
            doc.text(descLines, leftMargin, yPosition)
            yPosition += descLines.length * 6 + 6
          }
        })
      }

      return doc
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
