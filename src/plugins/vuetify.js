import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        formcolor: "#ECEFF1",
      },
      dark: {
        formcolor: "#1e1e1e",
      },
    },
  },
});
