<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Interests</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isValid">
          <!-- Career Position Input -->
          <v-text-field
            v-model="careerPosition"
            label="Name"
            class="text-field"
            :rules="[rules.required, rules.maxLength(100)]"
            outlined
            required
          ></v-text-field>
          
          <!-- Description Input -->
          <v-text-field
            v-model="description"
            label="Description"
            class="text-field"
            :rules="[rules.required, rules.maxLength(255)]"
            outlined
            required
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
import InterestServices from '../services/interestServices';
import Utils from '../config/utils.js';

export default {
  name: 'InterestsModal',
  props: {
    showModal: Boolean,
    interest: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      id: null,
      careerPosition: '',
      description: '',
      isValid: false,
      rules: {
        required: (value) => !!value || 'This field is required.',
        maxLength: (max) => (value) =>
          value.length <= max || `Must be ${max} characters or less.`,
      },
    };
  },
  watch: {
    interest: {
      immediate: true,
      handler(newVal) {
        console.log('Received interest prop:', newVal);
        if (newVal) {
          this.id = newVal.id || null;
          this.careerPosition = newVal.careerPosition || '';
          this.description = newVal.description || '';
        } else {
          this.resetFields();
        }
      },
    },
  },
  methods: {
    resetFields() {
      this.id = null;
      this.careerPosition = '';
      this.description = '';
    },
    closeModal() {
      this.$emit('close-modal');
      this.resetFields();
    },
    async saveInterest() {
      const isFormValid = await this.$refs.form.validate();

      if (isFormValid) {
        try {
          const userId = Utils.getStore('user').userId;
          const interestData = {
            id: this.id,
            careerPosition: this.careerPosition,
            description: this.description,
            userId,
          };

          if (this.id) {
            await InterestServices.updateInterests(interestData);
            this.$emit('interest-updated');
          } else {
            await InterestServices.createInterest(interestData);
            this.$emit('interest-added');
          }

          this.closeModal();
        } catch (error) {
          console.error('Failed to save interest:', error);
        }
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
