<template>
  <v-app-bar app>
    <v-row align="center">
      <v-app-bar-nav-icon @click="drawerShow()"></v-app-bar-nav-icon>
      <v-col cols="2">
        <router-link to="/">
          <v-img :src="img_dark" v-if="this.$vuetify.theme.dark"></v-img>
          <v-img :src="img_light" v-else></v-img>
        </router-link>
      </v-col>
      <v-spacer></v-spacer>
      <template v-if="show">
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
        <v-btn class="mr-2 font-weight-bold" outlined color="#43A047" tile>
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
export default {
  data() {
    return {
      img_light: require("@/assets/Yunnet-light.svg"),
      img_dark: require("@/assets/Yunnet-dark.svg"),
      show: true,
    };
  },
  methods: {
    drawerShow() {
      this.$bus.$emit("changeDrawer");
    },
  },
};
</script>

<style>
</style>