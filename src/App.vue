<template>
  <v-app>
    <Navigator />
    <Drawer />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
        <!-- shiftDialog -->
        <ChangeShiftDialog
          :show="showShiftDialog"
          @close="showShiftDialog = false"
        />
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
    showShiftDialog: false,
  }),
  methods: {
    async autoLogin() {
      const sid = localStorage.getItem("sid");
      const token = localStorage.getItem("token");
      if (!!sid && !!token) {
        try {
          await this.$store.dispatch("getUserInfo");
          await this.$store.dispatch("getAllUserShiftTime");
          await this.$store.dispatch("getAllShiftData");
        } catch (err) {
          this.$store.commit("logout");
        }
      }
    },
  },
  async created() {
    this.$vuetify.theme.dark = !!localStorage.getItem("dark") || false;
    localStorage.setItem("dark", this.$vuetify.theme.dark);
    this.$bus.$on("showShiftDialog", () => {
      this.showShiftDialog = true;
    });
    await this.autoLogin();
  },
  beforeDestroy() {
    this.$bus.$off("showShiftDialog");
  },
};
</script>

<style>
.swal2-container {
  font-family: "微軟正黑體";
}
</style>
