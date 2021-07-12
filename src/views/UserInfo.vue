<template>
  <v-row justify="center">
    <v-col cols="auto">
      <v-card width="470px" height="500px">
        <v-card-title class="font-weight-bold d-flex justify-center"
          >個人資訊</v-card-title
        >
        <v-row justify="center" class="text-subtitle-1">
          <v-col cols="auto">
            <v-icon size="160">mdi-clipboard-account</v-icon>
          </v-col>
          <v-col class="d-flex flex-column" cols="auto">
            <span class="sid">學號：B10923012</span>
            <span class="name">姓名：test</span>
            <span class="dutyTime">值班時間</span>
            <v-chip-group
              v-model="value"
              multiple
              active-class="teal--text text--lighten-1"
            >
              <v-chip
                v-for="(day, index) in week"
                :key="day"
                :value="index + 1"
              >
                {{ day }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
        <v-card-actions class="d-flex justify-center mt-4">
          <v-btn class="white--text" color="#43A047" @click="submitShiftTime"
            >送出</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="auto">
      <v-card width="470px" height="500px">
        <v-card-title class="font-weight-bold d-flex justify-center">
          更改密碼
        </v-card-title>
        <v-row align="center" class="d-flex flex-column mt-8">
          <v-col cols="8">
            <validation-observer ref="observer">
              <form>
                <validation-provider v-slot="{ errors }" rules="required">
                  <v-text-field
                    label="請輸入舊密碼"
                    outlined
                    :error-messages="errors"
                    v-model="oldPwd"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="newPwd"
                >
                  <v-text-field
                    label="請輸入新密碼"
                    outlined
                    :error-messages="errors"
                    v-model="newPwd"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  rules="required|confirm:@newPwd"
                >
                  <v-text-field
                    label="請再輸入一次"
                    outlined
                    :error-messages="errors"
                    v-model="confirmPwd"
                  ></v-text-field>
                </validation-provider>
              </form>
            </validation-observer>
          </v-col>
          <v-btn class="white--text" color="#43A047" @click="submitChangePwd"
            >確定</v-btn
          >
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Required!",
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
      week: ["一", "二", "三", "四", "五", "六", "日"],
      value: undefined,
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
    };
  },
  methods: {
    submitShiftTime() {},
    submitChangePwd() {
      this.$refs.observer.validate().then((validated) => {
        console.log(validated);
      });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "微軟正黑體";
}

.v-card {
  position: relative;
}
.v-btn {
  position: absolute;
  bottom: 45px;
}

.dutyTime,
.name,
.sid {
  margin-bottom: 8px;
}
</style>
