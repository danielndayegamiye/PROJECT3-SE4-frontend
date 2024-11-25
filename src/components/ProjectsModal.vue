<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Projects</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="project_name" label="Project Name" class="text-field"></v-text-field>
          <v-text-field v-model="description" label="Description" class="text-field"></v-text-field>
          <v-text-field v-model="role" label="Your Role" class="text-field"></v-text-field>
          <v-text-field v-model="results" label="Results" class="text-field"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="actions">
        <div class="button-container">
          <v-btn @click="closeModal" class="cancel-button" text>Cancel</v-btn>
          <v-btn color="primary" @click="saveProjects">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ProjectsServices from '../services/projectsServices'
import Utils from '../config/utils.js'

export default {
  name: 'ProjectsModal',
  props: {
    showModal: Boolean,
    project: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      id: null,
      project_name: '',
      description: '',
      role: '',
      results: ''
    }
  },
  watch: {
    project: {
      immediate: true,
      handler(newVal) {
        console.log("Received project:",newVal)
        if (newVal) {
          // Populate fields for editing
          
          this.id = newVal.id || null;
          this.project_name = newVal.project_name || '';
          this.description = newVal.description || '';
          this.role = newVal.role || '';
          this.results = newVal.results || '';
        } else {
          // Reset fields for adding
          this.resetFields();
        }
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    resetFields(){
      this.id = null,
      this.project_name = ''
      this.description = ''
      this.role = ''
      this.results = ''
    },
    async saveProjects() {
      if (this.project_name.trim() && this.description.trim() && this.role.trim() && this.results.trim()) {
        try {
          const userId = Utils.getStore('user').userId;
          if(this.id){
            const projectsData = {
              id: this.id,
              project_name: this.project_name,
              description: this.description,
              role: this.role,
              results: this.results,
              userId
            };

            await ProjectsServices.updateProject(projectsData);
            this.$emit('projects-updated'); // Emit an event to notify the parent component
          } else {
            const projectsData = {
              project_name: this.project_name,
              description: this.description,
              role: this.role,
              results: this.results,
              userId
            };

            await ProjectsServices.createProjects(projectsData);
            this.$emit('projects-added'); // Emit an event to notify the parent component
          }
          this.closeModal(); // Close the modal on success

        } catch (error) {
          console.error('Failed to add projects:', error);
        }
      }
    },
  }

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
  margin: 0 auto;
}

.modal-title {
  font-weight: bold;
  font-size: 1.5rem;
  color: #333;
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
