<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Preview</v-card-title>
      <v-card-text class="modal-content">
        <div class="preview-container">
          <iframe
            :src="pdfPath"
            width="100%"
            height="100%"
            frameborder="0"
            title="PDF Viewer"
            class="pdf-viewer"
          ></iframe>
          <div class="comments-box">
            <v-textarea
              v-model="comments"
              label="Add your comments"
              outlined
              rows="10"
            ></v-textarea>
            <v-card-actions class="actions">
              <div class="button-container">
                <v-btn @click="closeModal" class="cancel-button" text
                  >Cancel</v-btn
                >
                <v-btn color="primary" @click="saveComments">Save</v-btn>
              </div>
            </v-card-actions>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ResumePreview',
  props: {
    pdfPath: String,
    showModal: Boolean,
    commentsProp: String,
  },
  data() {
    return {
      comments: this.commentsProp || '',
    }
  },
  watch: {
    commentsProp(newVal) {
      this.comments = newVal
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    saveComments() {
      this.$emit('save-comments', this.comments)
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
  max-width: 900px;
  max-height: 95vh;
  margin: 0 auto;
}

.modal-card iframe {
  max-height: 75vh;
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

.modal-content {
  display: flex;
  gap: 16px;
  height: 600px;
}

.preview-container {
  display: flex;
  width: 100%;
}

.pdf-viewer {
  flex: 2;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.comments-box {
  flex-direction: column;
  gap: 8px;
  padding-left: 30px;
}
</style>
