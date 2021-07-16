<template>
  <v-navigation-drawer app v-model="drawerShow">
    <v-img :src="img_dark" v-if="this.$vuetify.theme.dark" class="ma-4"></v-img>
    <v-img :src="img_light" v-else class="ma-4"></v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group color="#26A69A" mandatory>
        <v-list-item
          v-for="item in authCheckDrawList"
          :key="item.name"
          :to="{ name: item.name }"
          exact
        >
          <v-list-item-title class="font-weight-bold">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      img_light: require("@/assets/Yunnet-light.svg"),
      img_dark: require("@/assets/Yunnet-dark.svg"),
      drawerShow: false,
      drawerList: [
        { name: "calendar", title: "行事曆", isLogin: false, isAdmin: false },
        { name: "userinfo", title: "個人頁面", isLogin: true, isAdmin: false },
        { name: "table", title: "班表", isLogin: true, isAdmin: false },
        // { name: "", title: "後台", isLogin: true, isAdmin: true },
      ],
    };
  },
  computed: {
    ...mapState(["isLogin", "isAdmin"]),
    authCheckDrawList() {
      return this.drawerList.filter((n) => {
        if (!n.isLogin || this.isLogin) {
          if (!n.isAdmin || this.isAdmin) {
            return true;
          }
        }
        return false;
      });
    },
  },
  created() {
    this.$bus.$on("changeDrawerStatus", () => {
      this.drawerShow = !this.drawerShow;
    });
  },
  beforeDestroy() {
    this.$bus.off("changeDrawerStatus");
  },
};
</script>

<style scoped>
.v-list-item__title {
  font-family: "微軟正黑體" !important;
}
</style>
