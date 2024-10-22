// src/plugins/vuetify.js
import 'vuetify/styles' // Import Vuetify CSS styles
import { createVuetify } from 'vuetify' // Import Vuetify functionality
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#80162B',
          secondary: '#E1E1E1',
          accent: '#47121D',
          success: '#47121D',
          error: '#EE5044',
          teal: '#63BAC0',
          blue: '#196CA2',
          yellow: '#F8C545',
          darkblue: '#032F45',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

export default vuetify
