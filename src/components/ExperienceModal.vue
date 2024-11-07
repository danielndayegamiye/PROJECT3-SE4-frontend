<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Experience</v-card-title>
      <v-card-text class="modal-content">
        <v-form>
          <v-text-field
            label="Job Title (Role)"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            label="Company Name"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            label="Location (City, State)"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            label="Start Date"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            label="End Date or Current"
            outlined
            class="text-field"
          ></v-text-field>
          <v-textarea
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
          <v-btn color="primary" @click="closeModal">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ExperienceModal',
  props: {
    showModal: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
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
