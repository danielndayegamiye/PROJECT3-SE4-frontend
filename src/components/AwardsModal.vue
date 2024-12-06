<template>
  <div v-if="showModal" class="modal-overlay">
    <v-card class="modal-card" elevation="3">
      <v-card-title class="modal-title">Award Information</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Title input -->
          <v-text-field
            label="Title"
            outlined
            class="text-field"
            v-model="title"
            :rules="[rules.required]"
          ></v-text-field>

          <!-- Description input -->
          <v-text-field
            label="Description"
            outlined
            class="text-field"
            v-model="description"
            :rules="[rules.required]"
          ></v-text-field>

          <!-- Year input -->
          <v-text-field
            label="Year"
            outlined
            class="text-field"
            v-model="year_Awarded"
            :rules="[rules.required]"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="actions">
        <div class="button-container">
          <v-btn @click="closeModal" class="cancel-button" text>Cancel</v-btn>
          <v-btn color="primary" @click="saveAward">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import AwardServices from '../services/awardsServices.js';
import Utils from '../config/utils.js';

export default {
  name: 'AwardsModal',
  props: {
    showModal: Boolean,
    award: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      id: null,
      title: '',
      description: '',
      year_Awarded: '',
      valid: false,
      rules: {
        required: (value) => !!value || 'This field is required',
      },
    };
  },
  watch: {
    award: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.id = newVal.id || null;
          this.title = newVal.title || '';
          this.description = newVal.description || '';
          this.year_Awarded = newVal.year_Awarded || '';
        } else {
          this.resetFields();
        }
      },
    },
  },
  methods: {
    resetFields() {
      this.id = null;
      this.title = '';
      this.description = '';
      this.year_Awarded = '';
    },
    closeModal() {
      const form = this.$refs.form;
      if (form) form.resetValidation();
      this.resetFields();
      this.$emit('close-modal');
    },
    async saveAward() {
      const form = this.$refs.form;

      if (form.validate()) {
        try {
          const userId = Utils.getStore('user').userId;

          const awardData = {
            id: this.id,
            title: this.title,
            description: this.description,
            year_Awarded: this.year_Awarded,
            userId,
          };

          if (this.id) {
            await AwardServices.updateAward(awardData);
            this.$emit('award-updated');
          } else {
            await AwardServices.createAward(awardData);
            this.$emit('award-created');
          }

          this.closeModal();
        } catch (error) {
          console.error('Failed to add award:', error);
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
