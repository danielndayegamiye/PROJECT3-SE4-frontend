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
    // Ensure the Google API is ready before initializing login
    if (window.google && window.google.accounts) {
      this.loginWithGoogle()
    } else {
      // Listen for the script's load event to initialize login
      window.addEventListener('load', this.onGoogleScriptLoad)
    }
  },
  beforeUnmount() {
    // Clean up the event listener to avoid memory leaks
    window.removeEventListener('load', this.onGoogleScriptLoad)
  },
  methods: {
    onGoogleScriptLoad() {
      if (window.google && window.google.accounts) {
        this.loginWithGoogle()
      } else {
        console.error('Google API failed to load.')
      }
    },
    async loginWithGoogle() {
      console.log('Google API loaded successfully!')

      // Assign the handleCredentialResponse function to the window scope
      window.handleCredentialResponse = this.handleCredentialResponse

      const client = import.meta.env.VITE_CLIENT_ID

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

      // Redirect to home page or perform further actions
      this.$router.push({ name: 'home' }) // Adjust route as needed
    },
  },
}
</script>
