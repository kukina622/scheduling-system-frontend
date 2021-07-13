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
            <span class="sid">學號：{{ sid }}</span>
            <span class="name">姓名：{{ username }}</span>
            <span class="dutyTime">值班時間</span>
            <v-chip-group
              v-model="shiftTime"
              multiple
              active-class="teal--text text--lighten-1"
            >
              <v-chip v-for="(day, index) in week" :key="day" :value="index">
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
              <form @keypress.enter="submitChangePwd">
                <validation-provider v-slot="{ errors }" rules="required">
                  <v-text-field
                    label="請輸入舊密碼"
                    outlined
                    :error-messages="errors"
                    v-model="oldPwd"
                    type="password"
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
                    type="password"
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
                    type="password"
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

import { mapState } from "vuex";

import { apiUpdateShiftTime, apiChangePassword } from "@/api";

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
      week: ["日", "一", "二", "三", "四", "五", "六"],
      shiftTime: [],
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
    };
  },
  methods: {
    submitShiftTime() {
      apiUpdateShiftTime(this.sid, { shiftTime: this.shiftTime })
        .then(async () => {
          alert("更新成功");
          await this.$store.dispatch("getAllUserShiftTime");
          this.$store.commit("updateShiftTime", this.shiftTime);
        })
        .catch((err) => {
          let errMessage = err.response.data.message;
          if (errMessage === "INVALID_FORMDATA") {
            alert("資料錯誤");
          }
        });
    },
    submitChangePwd() {
      this.$refs.observer.validate().then((validated) => {
        if (validated) {
          apiChangePassword(this.sid, {
            oldPassword: this.oldPwd,
            newPassword: this.newPwd,
          })
            .then(() => {
              alert("更改成功");
              this.resetForm();
            })
            .catch((err) => {
              let errMessage = err.response.data.message;
              if (errMessage === "WRONG_PASSWORD") {
                alert("密碼錯誤");
              }
            });
        }
      });
    },
    resetForm() {
      this.newPwd = "";
      this.oldPwd = "";
      this.confirmPwd = "";
      this.$refs.observer.reset();
    },
  },
  computed: {
    ...mapState({
      shiftTime_store: "shiftTime",
      sid: "sid",
      username: "username",
    }),
  },
  created() {
    this.shiftTime = this.shiftTime_store; //初始化值班時間
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
