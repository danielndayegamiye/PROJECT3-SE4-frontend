<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Experience</v-card-title>
      <v-card-text class="modal-content">
        <v-form>
          <v-text-field
            v-model="job_title"
            label="Job Title (Role)"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            v-model="company_name"
            label="Company Name"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            v-model="location"
            label="Location (City, State)"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            v-model="start_date"
            label="Start Date"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            v-model="end_date"
            label="End Date or Current"
            outlined
            class="text-field"
          ></v-text-field>
          <v-textarea
            v-model="responsibilities"
            label="Responsibilities/Accomplishments"
            outlined
            rows="3"
            class="text-field"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions class="actions">
        <div class="button-container">
          <v-btn @click="closeModal" class="cancel-button" text>Cancel</v-btn>
          <v-btn color="primary" @click="saveExperience">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ExperienceServices from '@/services/experienceServices'
import Utils from '@/config/utils'

export default {
  name: 'ExperienceModal',
  props: {
    showModal: Boolean,
    experience: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      id: null,
      job_title: '',
      company_name: '',
      location: '',
      responsibilities: '',
      start_date: '',
      end_date: '',
    }
  },
  watch: {
    experience: {
      immediate: true,
      handler(newVal) {
        console.log("Received experience prop:", newVal)
        if (newVal) {
          // Populate fields for editing
          
          this.id = newVal.id || null;
          this.job_title = newVal.job_title || '';
          this.company_name = newVal.company_name || '';
          this.location = newVal.location || '';
          this.responsibilities = newVal.responsibilities || '';
          this.start_date = newVal.start_date || '';
          this.end_date = newVal.end_date || '';
        } else {
          // Reset fields for adding
          this.resetFields();
        }
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
      this.resetFields()
    },
    resetFields() {
      this.id = null,
      this.job_title = ''
      this.company_name = ''
      this.location = ''
      this.responsibilities = ''
      this.start_date = ''
      this.end_date = ''
    },
    async saveExperience() {
      if (
        this.job_title.trim() &&
        this.company_name.trim() &&
        this.location.trim() &&
        this.responsibilities.trim() &&
        this.start_date.trim() &&
        this.end_date.trim()
      ) {
        try {
          const userId = Utils.getStore('user').userId

          if(this.id){
            const experienceData = {
              id: this.id,
              job_title: this.job_title,
              company_name: this.company_name,
              location: this.location,
              responsibilities: this.responsibilities,
              start_date: this.start_date,
              end_date: this.end_date,
              userId,
            }
            await ExperienceServices.updateExperience(experienceData)
            this.$emit('experience-updated') // Emit an event to notify the parent component
          } else {
            const experienceData = {
              job_title: this.job_title,
              company_name: this.company_name,
              location: this.location,
              responsibilities: this.responsibilities,
              start_date: this.start_date,
              end_date: this.end_date,
              userId,
            }
            await ExperienceServices.createExperience(experienceData)
            this.$emit('experience-added') // Emit an event to notify the parent component
          }
          this.closeModal() // Close the modal on success
        } catch (error) {
          console.error('Failed to add experience:', error)
        }
      }
    },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh; /* Adjust maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
}

.modal-title {
  font-weight: bold;
  font-size: 1.5rem;
  color: #333;
}

.modal-content {
  max-height: 60vh; /* Limit height to make room for actions */
  overflow-y: auto; /* Enable scrolling for the content area */
}

.text-field {
  margin: 12px 0;
}

.actions {
  justify-content: flex-end;
}

.button-container {
  display: flex;
  gap: 8px;
}

.cancel-button {
  color: #3c3c3c;
}

.cancel-button:hover {
  color: #2c2c2c;
}
</style>
