<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Welcome!</v-toolbar-title>
    </v-toolbar>
    <br /><br />
    <GoogleLogin />
    <br /><br />
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
