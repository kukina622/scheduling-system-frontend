<template>
  <v-row justify="center" align="center">
    <v-card class="mt-6" color="formcolor" height="600px" width="620px">
      <v-row justify="center">
        <v-card-title class="text-h3 font-weight-black mb-9 ma-6"
          >Sign in
        </v-card-title>
        <v-card-text>
          <validation-observer ref="observer">
            <form @keypress.enter="submitForm">
              <v-row justify="center">
                <v-col cols="8">
                  <!-- sid -->
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|SIDformat"
                  >
                    <v-text-field
                      label="學號"
                      outlined
                      clearable
                      autofocus
                      v-model="sid"
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="8">
                  <!-- password -->
                  <validation-provider v-slot="{ errors }" rules="required">
                    <v-text-field
                      label="密碼"
                      outlined
                      clearable
                      :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPwd ? 'text' : 'password'"
                      @click:append="showPwd = !showPwd"
                      v-model="password"
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="8">
                  <v-btn
                    @click="submitForm"
                    block
                    color="#43A047"
                    tile
                    height="40px"
                    class="white--text"
                  >
                    登入
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </validation-observer>
        </v-card-text>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import { apiLogin } from "@/api";

extend("required", {
  ...required,
  message: "Required!",
});

extend("SIDformat", (value) => {
  const re = new RegExp("^[A-z][0-9]{8}$");
  if (String(value).match(re)) {
    return true;
  }
  return "Format wrong!!!";
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      sid: "b10923012",
      password: "123",
      showPwd: false,
    };
  },
  methods: {
    submitForm() {
      this.$refs.observer.validate().then((validated) => {
        if (validated) {
          apiLogin({ sid: this.sid, password: this.password })
            .then(async (res) => {
              localStorage.setItem("sid", res.data.sid);
              localStorage.setItem("token", res.data.token);
              await this.$store.dispatch("getUserInfo");
              await this.$store.dispatch("getAllUserShiftTime");
              await this.$store.dispatch("getAllShiftData");
              this.$router.push({ name: "calendar" });
            })
            .catch((err) => {
              let errMessage = err.response.data.message;
              if (errMessage === "LOGIN_FAILED") {
                alert("帳號或密碼錯誤");
              }
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.v-text-field >>> label {
  font-family: "微軟正黑體" !important;
}
</style>
