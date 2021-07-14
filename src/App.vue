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
    darkInit: undefined,
    showShiftDialog: false,
  }),
  methods: {
    async autoLogin() {
      const sid = localStorage.getItem("sid");
      const token = localStorage.getItem("token");
      if (!!sid && !!token) {
        await this.$store.dispatch("getUserInfo");
        await this.$store.dispatch("getAllUserShiftTime");
        await this.$store.dispatch("getAllShiftData");
      }
    },
  },
  async created() {
    this.darkInit = JSON.parse(localStorage.getItem("dark"));
    this.darkInit = !!this.darkInit || false;
    this.$vuetify.theme.dark = this.darkInit;
    localStorage.setItem("dark", this.darkInit);

    await this.autoLogin();
    this.$bus.$on("showShiftDialog", () => {
      this.showShiftDialog = true;
    });
  },
  beforeDestroy() {
    this.$bus.$off("showShiftDialog");
  },
};
</script>
