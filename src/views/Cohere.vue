<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="app-home">
    <!-- Navbar Component with updated color -->
    <NavBar class="navbar" />

    <div class="content">
      <section class="header-description">
        <h1>Check Resume Tailoring</h1>
        <p>
          Compare your resume against the job description to see how well it
          fits.
        </p>
      </section>

      <form @submit.prevent="submitMessage" class="resume-sections">
        <!-- Textarea for Resume -->
        <div class="section">
          <label for="resume" class="title"
            >Paste Resume (up to 500 words):</label
          >
          <textarea
            v-model="resumeText"
            id="resume"
            placeholder="Paste your resume here..."
            required
          ></textarea>
        </div>

        <!-- Textarea for Job Description -->
        <div class="section">
          <label for="jobDescription" class="title"
            >Paste Job Description (up to 500 words):</label
          >
          <textarea
            v-model="jobDescriptionText"
            id="jobDescription"
            placeholder="Paste the job description here..."
            required
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="generate-resume">
          <button type="submit">Check Tailoring</button>
        </div>
      </form>

      <!-- Display the Response -->
      <div class="response modal-content">
        <p>{{ responseText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { CohereClient } from 'cohere-ai'
import NavBar from '../components/nav.vue'

const cohere = new CohereClient({
  token: '54HJQWDqhTBvz7HsoKaXQWG78CCWA5MJALDENfdA', // Replace with your actual API key
})

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      resumeText: '',
      jobDescriptionText: '',
      responseText: '',
    }
  },
  methods: {
    async submitMessage() {
      const combinedMessage = `Can you see how well this resume is tailored to the job description?\n\nResume:\n${this.resumeText}\n\nJob Description:\n${this.jobDescriptionText}`
      this.responseText = ''

      try {
        const stream = await cohere.chatStream({
          model: 'command-r-08-2024',
          message: combinedMessage,
          temperature: 0.3,
          promptTruncation: 'AUTO',
        })

        for await (const chat of stream) {
          if (chat.eventType === 'text-generation') {
            this.responseText += chat.text
          }
        }
      } catch (error) {
        console.error('Error with Cohere API:', error)
        this.responseText = 'There was an error processing your request.'
      }

      this.resumeText = ''
      this.jobDescriptionText = ''
    },
  },
}
</script>

<style scoped>
/* Existing styles remain unchanged */

.app-home {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.app-header {
  width: 100%;
  background-color: #811429;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
}

.content {
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-description h1 {
  color: #82152b;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.header-description p {
  color: #333;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.resume-sections {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.section {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: box-shadow 0.3s ease;
}

.section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.generate-resume button {
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  background-color: #811429; /* Burgundy color */
  color: white;
  border: 2px solid #811429; /* Border matching the button color */
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.generate-resume button:hover {
  background-color: white;
  color: #811429; /* Burgundy color on hover */
  border-color: #811429; /* Burgundy border on hover */
}

.generate-resume button:focus {
  border-color: #4d0f1c; /* Darker burgundy when focused */
}
textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
}

button {
  cursor: pointer;
}

.response {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  line-height: 1.5;
}

.response p {
  font-size: 1rem;
  color: #555;
  margin: 0;
}
</style>
