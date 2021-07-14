<template>
  <v-row justify="center" align="center">
    <v-card class="mt-6" color="formcolor" width="620px" height="640px">
      <v-row justify="center">
        <v-card-title class="text-h3 font-weight-black mb-9 ma-6"
          >Sign up
        </v-card-title>
        <v-card-text>
          <validation-observer ref="observer">
            <form @keypress.enter="submitForm">
              <v-row justify="center">
                <v-col cols="8" class="pb-0">
                  <!-- username -->
                  <validation-provider v-slot="{ errors }" rules="required">
                    <v-text-field
                      label="姓名"
                      outlined
                      clearable
                      autofocus
                      v-model="username"
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="8" class="pb-0">
                  <!-- sid -->
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|SIDformat"
                  >
                    <v-text-field
                      label="學號"
                      outlined
                      clearable
                      v-model="sid"
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="8" class="pb-0">
                  <!-- password -->
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="password"
                  >
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
                <v-col cols="8" class="pb-0">
                  <!-- confirm password -->
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|confirm:@password"
                  >
                    <v-text-field
                      label="確認密碼"
                      outlined
                      clearable
                      :append-icon="showPwd2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPwd2 ? 'text' : 'password'"
                      @click:append="showPwd2 = !showPwd2"
                      :error-messages="errors"
                      v-model="confirmPwd"
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
                    註冊
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

import { apiRegister } from "@/api";

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

extend("confirm", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Must match the new password.",
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      sid: "",
      username: "",
      password: "",
      confirmPwd: "",
      showPwd: false,
      showPwd2: false,
    };
  },
  methods: {
    submitForm() {
      this.$refs.observer.validate().then((validated) => {
        if (validated) {
          apiRegister({
            sid: this.sid,
            password: this.password,
            username: this.username,
          })
            .then(() => {
              this.$router.push({ name: "login" });
            })
            .catch((err) => {
              this.$store.dispatch("errorHandler", err);
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
