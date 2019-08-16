import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css'
import colors from 'badc-styleguide/theme/colors'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa',
  },
  theme: {
    themes: {
      light: Object.freeze({

        // base BADC colors
        ...colors,
    
        // replace any project specfic colors
        primary: colors.blue,
        secondary: colors.purple,
        accent: colors.indigo,
        error: colors.red,
        info: colors.cyan,
        success: colors.green,
        warning: colors.yellow,
    
      })
    }
  },
});