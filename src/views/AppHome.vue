<template>
  <v-container class="app-home" fluid>
    <!-- Header with Navigation Bar -->
    <header class="app-header">
      <Nav />
    </header>

    <main class="content">
      <!-- Main Title -->
      <div class="title-container">
        <h1 class="title">How will you make your resume?</h1>
      </div>

      <!-- Options for Creating or Viewing Resumes -->
      <div class="options">
        <div class="option-card" @click="startFromScratch">
          <span class="icon">✨</span>
          <div class="text-content">
            <h3>Start from scratch</h3>
            <p>Build a new Resume</p>
          </div>
          <span class="arrow">→</span>
        </div>

        <div class="option-card" @click="viewExistingResumes">
          <span class="icon">📄</span>
          <div class="text-content">
            <h3>View Existing Resumes</h3>
            <p>Access your saved resumes</p>
          </div>
          <span class="arrow">→</span>
        </div>
      </div>

      <!-- Recent Resumes Section -->
      <section class="recent-resumes">
        <h2 class="recent-title">Recent Resumes</h2>
        <div class="resume-list">
          <div
            v-for="resume in recentResumes"
            :key="resume.id"
            class="resume-card"
            @click="openResume(resume.id)"
          >
            <span class="resume-icon">📑</span>
            <div class="resume-details">
              <h4 class="resume-title">{{ resume.title }}</h4>
              <p class="resume-date">
                Last accessed: {{ resume.lastAccessed }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </v-container>
</template>

<script></script>
