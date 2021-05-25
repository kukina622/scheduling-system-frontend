<template>
  <v-app-bar app>
    <v-row align="center">
      <v-app-bar-nav-icon @click="showDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="mt-1 ml-2">
        <router-link :to="{ name: 'calendar' }">
          <img
            :src="this.$vuetify.theme.dark ? img_dark : img_light"
            height="36px"
          />
        </router-link>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <!-- theme control -->
      <v-icon v-if="$vuetify.theme.dark">mdi-weather-night</v-icon>
      <v-icon v-else color="#F57F17">mdi-weather-sunny</v-icon>
      <v-switch
        hide-details
        inset
        class="ml-2"
        v-model="$vuetify.theme.dark"
        @change="changeTheme"
        color="#66BB6A"
      >
      </v-switch>
      <!-- button -->
      <template v-if="auth === 'guest'">
        <v-btn
          class="mr-2 font-weight-bold"
          outlined
          color="#43A047"
          tile
          :to="{ name: 'register' }"
        >
          註冊
        </v-btn>
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
  data() {
    return {
      img_light: require("@/assets/Yunnet-light.svg"),
      img_dark: require("@/assets/Yunnet-dark.svg"),
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
      localStorage.setItem("dark", this.$vuetify.theme.dark);
    },
  },
  computed: {
    ...mapState(["auth"]),
  },
};
</script>

<style>
</style>