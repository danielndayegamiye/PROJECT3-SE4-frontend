<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Personal Information</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="First Name"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            label="Last Name"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            label="Email"
            outlined
            type="email"
            class="text-field"
          ></v-text-field>
          <v-text-field
            label="Phone Number"
            outlined
            type="tel"
            class="text-field"
          ></v-text-field>
          <v-text-field
            label="Address(Optional)"
            outlined
            class="text-field"
          ></v-text-field>
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
  name: 'PersonalInfoModal',
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
  width: 90%; /* Adjust as needed */
  max-width: 800px; /* Maximum width */
  margin: 0 auto; /* Center the card */
}

.modal-title {
  font-weight: bold;
  font-size: 1.5rem;
  color: #333;
}

.text-field {
  margin: 12px 0; /* Space above and below each text field */
}

.actions {
  justify-content: flex-end;
}

.button-container {
  display: flex;
  gap: 8px;
}

.cancel-button {
  color: #3c3c3c; /* Darker text color for the cancel button */
}

.cancel-button:hover {
  color: #2c2c2c; /* Slightly darker on hover */
}
</style>
