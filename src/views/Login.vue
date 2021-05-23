<template>
  <v-row justify="center" align="center">
    <v-card class="mt-6" color="formcolor" height="600px" width="620px">
      <v-row justify="center">
        <v-card-title class="text-h3 font-weight-black mb-9 ma-6"
          >Sign in
        </v-card-title>
        <v-card-text>
          <validation-observer ref="observer">
            <form @submit.prevent="submitForm">
              <v-row justify="center">
                <v-col cols="8">
                  <!-- username -->
                  <validation-provider v-slot="{ errors }" rules="required|UIDformat">
                    <v-text-field
                      label="學號"
                      outlined
                      clearable
                      autofocus
                      v-model="UID"
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
                    type="submit"
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

extend("required", {
  ...required,
  message: "Required!",
});

extend("UIDformat",value=>{
  const re = new RegExp('^[A-z][0-9]{8}$')
  if (String(value).match(re)){
    return true
  }
  return "Format wrong!!!"
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      UID: "",
      password: "",
      showPwd: false,
    };
  },
  methods: {
    submitForm() {
      this.$refs.observer.validate()
      .then(validated=>{
        if (validated){
          console.log(true)
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



