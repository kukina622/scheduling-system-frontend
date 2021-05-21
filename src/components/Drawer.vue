<template>
  <v-navigation-drawer app v-model="drawerShow">
    <v-img :src="img_dark" v-if="this.$vuetify.theme.dark" class="ma-4"></v-img>
    <v-img :src="img_light" v-else class="ma-4"></v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group color="#26A69A" mandatory>
        <v-list-item
          v-for="(item,index) in drawerList"
          :key="index"
          :to="{ name: item.name }"
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
export default {
  data() {
    return {
      img_light: require("@/assets/Yunnet-light.svg"),
      img_dark: require("@/assets/Yunnet-dark.svg"),
      drawerShow: false,
      drawerList: [
        { name: "calendar", title: "班表" },
        { name: "#", title: "個人頁面" },
        { name: "#", title: "後台" },
      ],
    };
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