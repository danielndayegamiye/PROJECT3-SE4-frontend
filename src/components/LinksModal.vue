<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Links</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="type" label="Name" class="text-field">
          </v-text-field>
          <v-text-field
            v-model="link"
            label="URL"
            class="text-field"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="actions">
        <div class="button-container">
          <v-btn @click="closeModal" class="cancel-button" text>Cancel</v-btn>
          <v-btn color="primary" @click="saveLink">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import LinkServices from '../services/linkServices'
import Utils from '../config/utils.js'

export default {
  name: 'LinksModal',
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      type: '',
      link: '',
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    async saveLink() {
      if (this.type.trim() && this.link.trim()) {
        try {
          const userId = Utils.getStore('user').userId
          const linkData = {
            type: this.type,
            link: this.link,
            userId,
          }
          await LinkServices.createLink(linkData)
          this.closeModal() // Close the modal on success
          this.$emit('link-added') // Emit an event to notify the parent component
        } catch (error) {
          console.error('Failed to add link:', error)
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
