<template>
  <v-dialog
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-model="show"
  >
    <v-card :color="this.$vuetify.theme.dark ? '#212121' : 'white'">
      <!-- toolbar -->
      <v-toolbar color="#43A047">
        <v-btn icon @click="close">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <span class="barTitle"></span>
        </v-toolbar-title>
      </v-toolbar>
      <!-- content -->
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="auto">
            <v-card height="600px" width="470px">
              <v-card-title>換班</v-card-title>
              <v-form ref="form">
                <div class="contentLayout">
                  <span class="self">test</span>
                  <v-select outlined label="請選擇日期"></v-select>
                  <v-icon x-large>mdi-swap-vertical-bold</v-icon>
                  <v-select label="換班對象"></v-select>
                  <v-select outlined label="請選擇日期"></v-select>
                  <div>
                    <v-btn large class="mr-2" color="#43a047">
                      <span style="color: #ffffff">確定</span>
                    </v-btn>
                    <v-btn large class="ml-2" outlined color="#43a047">
                      重設
                    </v-btn>
                  </div>
                </div>
              </v-form>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-card height="600px" width="470px">
              <v-card-title>已交換</v-card-title>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>原日期</th>
                    <th>換班對象</th>
                    <th>換班日期</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2021-05-21(二)</td>
                    <td>test</td>
                    <td>2021-05-21(二)</td>
                    <td>
                      <v-btn color="error">
                        <v-icon>mdi-delete-forever</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show2: false,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
* {
  font-family: "微軟正黑體";
}
.v-card__title {
  color: white;
  background-color: #43a047;
  display: flex;
}
.contentLayout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.self {
  margin: 20px;
}
</style>