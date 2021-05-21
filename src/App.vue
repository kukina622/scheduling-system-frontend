<template>
  <v-app>
    <Navigator :theme="dark" />
    <Drawer />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigator from "@/components/Navigator";
import Drawer from "@/components/Drawer";

export default {
  name: "App",
  components: {
    Navigator,
    Drawer,
  },
  data: () => ({
    dark: undefined,
  }),
  created() {
    this.dark = localStorage.getItem("dark");
    if (this.dark === null) {
      this.dark = false;
      localStorage.setItem("dark", false);
    }
    this.$vuetify.theme.dark = this.dark === true ? true : false;
  },
};
</script>

