<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Education</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field 
            v-model="institution"
            :rules="[rules.required]"
            label="Institution"
            class="text-field">
          </v-text-field>
          <v-text-field
            v-model="degree"
            :rules="[rules.required]"
            label="Degree or Study"
            class="text-field"
          ></v-text-field>
          <v-text-field
            v-model="graduationDate"
            :rules="[rules.required]"
            label="Graduation Date"
            class="text-field"
          ></v-text-field>
          <v-text-field
            v-model="gpa"
            :rules="[rules.required]"
            label="GPA"
            class="text-field"
          ></v-text-field>
          <v-text-field
            v-model="relevantWork"
            :rules="[rules.required]"
            label="Relevant Work"
            class="text-field"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="actions">
        <div class="button-container">
          <v-btn @click="closeModal" class="cancel-button" text>Cancel</v-btn>
          <v-btn color="primary" @click="saveEducation">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import EducationServices from '../services/educationServices';
import Utils from '../config/utils.js';

export default {
  name: 'EducationModal',
  props: {
    showModal: Boolean,
    education: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      id: null,
      institution: '',
      degree: '',
      graduationDate: '',
      gpa: '',
      relevantWork: '',
      valid: false,
      rules: {
        required: (value) => !!value || 'This field is required',
      },
    };
  },
  watch: {
    education: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.id = newVal.id || null;
          this.institution = newVal.institution || '';
          this.degree = newVal.degree || '';
          this.graduationDate = newVal.graduationDate || '';
          this.gpa = newVal.gpa || '';
          this.relevantWork = newVal.relevantWork || '';
        } else {
          this.resetFields();
        }
      },
    },
  },
  methods: {
    resetFields() {
      this.id = null;
      this.institution = '';
      this.degree = '';
      this.graduationDate = '';
      this.gpa = '';
      this.relevantWork = '';
    },
    closeModal() {
      const form = this.$refs.form;
      if (form) form.resetValidation();
      this.resetFields();
      this.$emit('close-modal');
    },
    async saveEducation() {
      const form = this.$refs.form;

      if (form.validate()) {
        try {
          const userId = Utils.getStore('user').userId;

          const educationData = {
            id: this.id,
            institution: this.institution,
            degree: this.degree,
            graduationDate: this.graduationDate,
            gpa: this.gpa,
            relevantWork: this.relevantWork,
            userId,
          };

          if (this.id) {
            await EducationServices.updateEducation(educationData);
            this.$emit('education-updated');
          } else {
            await EducationServices.createEducation(educationData);
            this.$emit('education-added');
          }

          this.closeModal();
        } catch (error) {
          console.error('Failed to save education:', error);
        }
      } else {
        console.log('Form is invalid!');
      }
    },
  },
};
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
