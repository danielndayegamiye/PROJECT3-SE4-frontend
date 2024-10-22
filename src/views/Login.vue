<template>
  <v-container
    class="d-flex flex-column align-center"
    style="padding-top: 20px"
  >
    <v-row justify="center" class="mb-1">
      <img src="@/assets/logo.png" width="400" height="250" />
    </v-row>
    <v-row justify="center">
      <GoogleLogin />
    </v-row>
  </v-container>
</template>

<script>
import GoogleLogin from '@/components/GoogleLogin.vue'
export default {
  name: 'UserLogin',
  components: {
    GoogleLogin,
  },
}
</script>

<style scoped>
/* Optional: Adjust styles as needed */
.v-container {
  height: auto; /* Ensure it collapses to content height */
}

.v-row {
  margin-top: 0; /* Remove margin on top */
}
</style>
