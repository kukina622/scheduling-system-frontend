<template>
  <v-app-bar app>
    <v-row align="center">
      <v-app-bar-nav-icon @click="showDrawer"></v-app-bar-nav-icon>
      <v-col cols="2">
        <router-link to="/">
          <v-img :src="img_dark" v-if="this.$vuetify.theme.dark"></v-img>
          <v-img :src="img_light" v-else></v-img>
        </router-link>
      </v-col>
      <v-spacer></v-spacer>
      <!-- theme control -->
      <v-icon v-if="dark">mdi-weather-night</v-icon>
      <v-icon v-else color="#F57F17">mdi-weather-sunny</v-icon>
      <v-switch
        hide-details
        inset
        class="ml-2"
        v-model="dark"
        @change="changeTheme"
        color="#66BB6A"
      >
      </v-switch>
      <!-- button -->
      <template v-if="auth === 'guest'">
        <v-btn
          class="mr-5 font-weight-bold"
          outlined
          color="#43A047"
          tile
          :to="{ name: 'login' }"
        >
          登入
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          class="mr-2 font-weight-bold"
          outlined
          color="#43A047"
          tile
          @click="showShiftDialog"
        >
          換班
        </v-btn>
        <v-btn class="mr-5 font-weight-bold" outlined color="#43A047" tile>
          登出
        </v-btn>
      </template>
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      img_light: require("@/assets/Yunnet-light.svg"),
      img_dark: require("@/assets/Yunnet-dark.svg"),
      show: true,
    };
  },
  methods: {
    showDrawer() {
      this.$bus.$emit("changeDrawerStatus");
    },
    showShiftDialog() {
      this.$bus.$emit("showShiftDialog");
    },
    changeTheme() {
      localStorage.setItem("dark", this.dark);
      this.$vuetify.theme.dark = this.dark;
    },
  },
  computed: {
    ...mapState(["auth"]),
  },
};
</script>

<style>
</style>