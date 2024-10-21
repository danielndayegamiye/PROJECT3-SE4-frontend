<template>
  <div class="signup-buttons">
    <v-row justify="center">
      <div id="parent_id"></div>
    </v-row>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'GoogleLogin',
  data() {
    return {
      user: {},
      errorMessage: '',
    }
  },
  mounted() {
    this.loginWithGoogle()
  },
  methods: {
    async loginWithGoogle() {
      if (!window.google) {
        console.error('Google API is not loaded yet.')
        return
      }

      // Assign the handleCredentialResponse function to the window scope
      window.handleCredentialResponse = this.handleCredentialResponse

      // Get the client ID from the environment variable
      const client = import.meta.env.VUE_APP_CLIENT_ID
      console.log('Client ID:', client) // Check if Client ID is loaded

      // Initialize Google accounts
      window.google.accounts.id.initialize({
        client_id: client,
        cancel_on_tap_outside: false,
        auto_select: true,
        callback: window.handleCredentialResponse,
      })

      // Render the Google login button
      window.google.accounts.id.renderButton(
        document.getElementById('parent_id'),
        {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'signup_with',
          width: 400,
        },
      )
    },
    handleCredentialResponse(response) {
      const token = response.credential

      // Here you can decode the token to extract user information
      this.decodeToken(token)
    },
    decodeToken(token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = JSON.parse(window.atob(base64))

      this.user = {
        name: jsonPayload.name,
        email: jsonPayload.email,
        picture: jsonPayload.picture,
      }

      // Navigate to a different route or perform any actions
      this.$router.push({ name: 'home' }) // Change to your home route name
    },
  },
}
</script>
