<template>
  <v-app>
    <Navigator />
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
    Navigator,Drawer
  },
  data: () => ({
    //
  }),
};
</script>

