<template>
  <v-row justify="center" align="center">
    <v-col cols="5">
      <v-card class="mt-6" height="80vh" color="formcolor">
        <v-row justify="center">
          <v-card-title class="text-h3 font-weight-black mb-9 ma-6"
            >Sign in
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="8">
                <!-- username -->
                <v-text-field
                  label="學號"
                  outlined
                  clearable
                  autofocus
                  :rules="[rule.required]"
                  v-model="UID"
                >
                </v-text-field>
              </v-col>
              <v-col cols="8">
                <!-- password -->
                <v-text-field
                  label="密碼"
                  outlined
                  clearable
                  :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPwd ? 'text' : 'password'"
                  @click:append="showPwd = !showPwd"
                  :rules="[rule.required]"
                  v-model="password"
                >
                </v-text-field>
              </v-col>
              <v-col cols="8">
                <v-btn block color="#43A047" tile height="40px">
                  <span style="color: white">登入</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      UID: "",
      password: "",
      showPwd: false,
      rule: {
        required: (value) => !!value || "Required.",
      },
    };
  },
};
</script>

<style scoped>
.v-text-field >>> label {
  font-family: "微軟正黑體" !important;
}
</style>



