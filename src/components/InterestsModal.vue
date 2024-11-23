<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Interests</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="careerPosition"
            label="Name"
            class="text-field"
          >
          </v-text-field>
          <v-text-field
            v-model="description"
            label="Description"
            class="text-field"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="actions">
        <div class="button-container">
          <v-btn @click="closeModal" class="cancel-button" text>Cancel</v-btn>
          <v-btn color="primary" @click="saveInterest">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import InterestServices from '../services/interestServices'
import Utils from '../config/utils.js'

export default {
  name: 'InterestsModal',
  props: {
    showModal: Boolean,
    interest: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      id: null,
      careerPosition: '',
      description: '',
    }
  },
  watch: {
    interest: {
      immediate: true,
      handler(newVal) {
        console.log("Received interest prop:", newVal)
        if (newVal) {
          // Populate fields for editing
          
          this.id = newVal.id || null;
          this.careerPosition = newVal.careerPosition || '';
          this.description = newVal.description || '';
        } else {
          // Reset fields for adding
          this.resetFields();
        }
      },
    },
  },
  methods: {
    resetFields(){
      this.id = null,
      this.careerPosition = '',
      this.description = ''
    },
    closeModal() {
      this.$emit('close-modal')
    },
    async saveInterest() {
      if (this.careerPosition.trim() && this.description.trim()) {
        try {
          const userId = Utils.getStore('user').userId;
          const interestData = {
            id: this.id, // Include `id` for updates
            careerPosition: this.careerPosition,
            description: this.description,
            userId,
          };

          if (this.id) {
            // Update existing interest
            console.log('Updating interest:', interestData);
            await InterestServices.updateInterests(interestData); // Call the update service
            this.$emit('interest-updated'); // Notify parent component
          } else {
            // Create new interest
            console.log('Creating new interest:', interestData);
            await InterestServices.createInterest(interestData); // Call the create service
            this.$emit('interest-added'); // Notify parent component
          }

          this.closeModal(); // Close the modal on success
        } catch (error) {
          console.error('Failed to save interest:', error);
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
