<template>
  <v-app-bar app>
    <v-row align="center">
      <v-app-bar-nav-icon @click="showDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <router-link :to="{ name: 'calendar' }"> 值班系統 </router-link>
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
      <template v-if="!isLogin">
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
        <v-btn
          class="mr-5 font-weight-bold"
          outlined
          color="#43A047"
          tile
          @click="logout"
        >
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
    return {};
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
    logout() {
      this.$store.commit("logout");
      this.$swal.fire({
        icon: "success",
        title: "已登出",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  },
  computed: {
    ...mapState(["isLogin"]),
  },
};
</script>

<style scoped>
.v-app-bar-title >>> a {
  font-family: "微軟正黑體";
  text-decoration: none;
  color: inherit;
}
</style>
