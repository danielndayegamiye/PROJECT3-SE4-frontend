<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Skills</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="newSkill" label="Skill" class="text-field">
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="actions">
        <div class="button-container">
          <v-btn @click="closeModal" class="cancel-button" text>Cancel</v-btn>
          <v-btn color="primary" @click="saveSkill">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import SkillServices from '../services/skillsServices'
import Utils from '../config/utils.js'

export default {
  name: 'SkillsModal',
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      newSkill: '', // Holds the value of the skill entered by the user
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
      this.newSkill = '' // Clear the skill input field
    },
    async saveSkill() {
      if (this.newSkill.trim()) {
        try {
          const userId = Utils.getStore('user').userId // Retrieve userId from Utils
          const skillData = { name: this.newSkill, userId } // Add userId to skillData

          await SkillServices.createSkill(skillData) // Call createSkill with skillData
          this.closeModal() // Close the modal on success
          this.$emit('skill-added') // Emit an event to notify the parent component
        } catch (error) {
          console.error('Failed to add skill:', error)
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
