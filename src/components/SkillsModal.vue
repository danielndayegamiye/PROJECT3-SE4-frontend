<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Skills</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="newSkill"
            label="Skill"
            class="text-field"
            :error-messages="skillError ? ['Skill is required'] : []"
            @blur="validateSkill"
          ></v-text-field>
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
    skill: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      skillId: null,
      newSkill: '', // Holds the value of the skill entered by the user
      skillError: false, // To handle error state for skill input
    }
  },
  watch: {
    skill: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // Populate fields for editing
          this.skillId = newVal.id || null;
          this.newSkill = newVal.name || '';
        } else {
          // Reset fields for adding
          this.resetFields();
        }
      },
    },
  },
  methods: {
    resetFields() {
      this.skillId = null;
      this.newSkill = '';
      this.skillError = false; // Reset error state
    },
    closeModal() {
      this.$emit('close-modal')
      this.resetFields(); // Clear the skill input field
    },
    validateSkill() {
      this.skillError = this.newSkill.trim() === '';
    },
    async saveSkill() {
      this.validateSkill(); // Validate the skill input field

      if (this.skillError) {
        console.error('Please provide a skill');
        return;
      }

      try {
        const userId = Utils.getStore('user').userId; // Retrieve userId from Utils

        const skillData = { name: this.newSkill, userId };

        if (this.skillId) {
          // Update existing skill
          skillData.id = this.skillId;
          await SkillServices.updateSkill(skillData); // Call updateSkill with skillData
          this.$emit('skill-updated'); // Emit an event to notify the parent component
        } else {
          // Create new skill
          await SkillServices.createSkill(skillData); // Call createSkill with skillData
          this.$emit('skill-added'); // Emit an event to notify the parent component
        }

        this.closeModal(); // Close the modal on success
      } catch (error) {
        console.error('Failed to save skill:', error);
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
