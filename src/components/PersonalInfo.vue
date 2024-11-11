<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Personal Information</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="first_name"
            label="First Name"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            v-model="last_name"
            label="Last Name"
            outlined
            class="text-field"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            type="email"
            class="text-field"
          ></v-text-field>
          <v-text-field
            v-model="phone_number"
            label="Phone Number"
            outlined
            type="tel"
            class="text-field"
          ></v-text-field>
          <v-text-field
            v-model="address"
            label="Address(Optional)"
            outlined
            class="text-field"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="actions">
        <div class="button-container">
          <v-btn @click="closeModal" class="cancel-button" text>Cancel</v-btn>
          <v-btn color="primary" @click="savePersonalInfo">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import PersonalInfoServices from '../services/personalInfoServices'
import Utils from '../config/utils'

export default {
  name: 'PersonalInfoModal',
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
      this.resetFields()
    },
    resetFields() {
      this.first_name = ''
      this.last_name = ''
      this.email = ''
      this.phone_number = ''
      this.address = ''
    },
    async savePersonalInfo() {
      if (
        this.first_name.trim() &&
        this.last_name.trim() &&
        this.phone_number.trim() &&
        this.address.trim() &&
        this.email.trim()
      ) {
        try {
          const userId = Utils.getStore('user').userId
          const personalInfoData = {
            first_name: this.first_name,
            last_name: this.last_name,
            phone_number: this.phone_number,
            address: this.address,
            email: this.email,
            userId,
          }
          await PersonalInfoServices.createPersonalInfo(personalInfoData)
          this.closeModal() // Close the modal on success
          this.$emit('personalInfo-added') // Emit an event to notify the parent component
        } catch (error) {
          console.error('Failed to add personal info:', error)
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
