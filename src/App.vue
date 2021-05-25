<template>
  <v-app>
    <Navigator />
    <Drawer />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
        <!-- shiftDialog -->
        <ChangeShiftDialog :show="showShiftDialog" @close="showShiftDialog = false" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigator from "@/components/Navigator";
import Drawer from "@/components/Drawer";
import ChangeShiftDialog from "@/components/ChangeShiftDialog";

export default {
  name: "App",
  components: {
    Navigator,
    Drawer,
    ChangeShiftDialog,
  },
  data: () => ({
    darkInit: undefined,
    showShiftDialog: false,
  }),
  created() {
    this.darkInit = JSON.parse(localStorage.getItem("dark"));
    if (this.darkInit === null) {
      this.darkInit = false;
      localStorage.setItem("dark", false);
    }
    this.darkInit = this.darkInit === true ? true : false;
    this.$vuetify.theme.dark = this.darkInit;

    this.$bus.$on("showShiftDialog", () => {
      this.showShiftDialog = true;
    });
  },
  beforeDestroy() {
    this.$bus.$off("showShiftDialog");
  },
};
</script>

