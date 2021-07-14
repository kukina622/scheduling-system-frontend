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
                  <span class="self">{{ username }}</span>
                  <v-select
                    outlined
                    label="請選擇日期"
                    :items="generateShiftDate(sid)"
                    v-model="selectedDate_Self"
                  ></v-select>
                  <v-icon x-large>mdi-swap-vertical-bold</v-icon>
                  <v-select
                    label="換班對象"
                    :items="otherUsername"
                    v-model="selectedUser"
                  ></v-select>
                  <v-select
                    outlined
                    label="請選擇日期"
                    :items="generateShiftDate(findSidByUsername(selectedUser))"
                    v-model="selectedDate_Other"
                  ></v-select>
                  <div>
                    <v-btn
                      large
                      class="mr-2 white--text"
                      color="#43a047"
                      @click="submitForm"
                    >
                      確定
                    </v-btn>
                    <v-btn
                      large
                      class="ml-2"
                      outlined
                      color="#43a047"
                      @click="resetForm"
                    >
                      重設
                    </v-btn>
                  </div>
                </div>
              </v-form>
            </v-card>
          </v-col>
          <!-- 自己換班的列表 -->
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
                  <tr v-for="shiftData in tableShiftList" :key="shiftData._id">
                    <td>
                      {{ shiftData.orginalDate }}{{ shiftData.orginalDate_day }}
                    </td>
                    <td>{{ shiftData.target }}</td>
                    <td>
                      {{ shiftData.shiftDate }}{{ shiftData.shiftDate_day }}
                    </td>
                    <td>
                      <v-btn color="error" @click="deleteShift(shiftData)">
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
import { mapState } from "vuex";

import { apiChangeShift, apiDeleteShift } from "@/api";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      week: ["日", "一", "二", "三", "四", "五", "六"],
      selectedDate_Self: "",
      selectedUser: "",
      selectedDate_Other: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    generateShiftDate(sid) {
      if (!this.isLogin) {
        return [];
      }
      let now = new Date();
      let end = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
      let result = [];

      // 找出sid的資料
      let userData = this.allUserShiftTime.find(
        (userShiftData) => userShiftData.sid === sid
      );
      // 找不到sid的情況
      if (!userData) return [];

      let shiftTime_sid = userData.shiftTime;
      for (let day = new Date(); day <= end; day.setDate(day.getDate() + 1)) {
        if (shiftTime_sid.includes(day.getDay())) {
          result.push(`${this.formatDate(day)}(${this.week[day.getDay()]})`);
        }
      }
      // 加入換班
      for (let eachData of this.containSidShiftData(sid)) {
        if (eachData.user_1.sid === sid) {
          let shiftdate_2 = new Date(eachData.shiftDate_2);
          if (shiftdate_2 >= now) {
            result.push(
              `${this.formatDate(shiftdate_2)}(${
                this.week[shiftdate_2.getDay()]
              })`
            );
          }
        } else if (eachData.user_2.sid === sid) {
          let shiftdate_1 = new Date(eachData.shiftDate_1);
          if (shiftdate_1 >= now) {
            result.push(
              `${this.formatDate(shiftdate_1)}(${
                this.week[shiftdate_1.getDay()]
              })`
            );
          }
        }
      }

      // 刪掉原日期
      for (let eachData of this.containSidShiftData(sid)) {
        let index = -1,
          shiftdate_1,
          shiftdate_2;
        if (eachData.user_1.sid === sid) {
          shiftdate_1 = new Date(eachData.shiftDate_1);
          let tmp = `${this.formatDate(shiftdate_1)}(${
            this.week[shiftdate_1.getDay()]
          })`;
          index = result.findIndex((n) => n === tmp);
        } else if (eachData.user_2.sid === sid) {
          shiftdate_2 = new Date(eachData.shiftDate_2);
          let tmp = `${this.formatDate(shiftdate_2)}(${
            this.week[shiftdate_2.getDay()]
          })`;
          index = result.findIndex((n) => n === tmp);
        }
        if (index > -1) {
          result.splice(index, 1);
        }
      }

      // 回傳排序過後的Array
      return result.sort((a, b) => {
        let ta = new Date(a.substr(0, a.length - 3));
        let tb = new Date(b.substr(0, b.length - 3));
        return ta < tb ? -1 : 1;
      });
    },
    //找出有包括sid的換班資料
    containSidShiftData(sid) {
      const allShiftData = this.allShiftData;
      return allShiftData.filter(
        (shiftData) =>
          shiftData.user_1.sid === sid || shiftData.user_2.sid === sid
      );
    },
    resetForm() {
      this.selectedDate_Self = "";
      this.selectedUser = "";
      this.selectedDate_Other = "";
    },
    submitForm() {
      const selectedDate_Self = this.selectedDate_Self;
      const selectedUserSid = this.findSidByUsername(this.selectedUser);
      const selectedDate_Other = this.selectedDate_Other;
      if (!!selectedDate_Self && !!selectedUserSid && !!selectedDate_Other) {
        let data = {
          orginalDate: selectedDate_Self
            .substr(0, selectedDate_Self.length - 3)
            .replaceAll("/", "-"),
          target: selectedUserSid,
          shiftDate: selectedDate_Other
            .substr(0, selectedDate_Other.length - 3)
            .replaceAll("/", "-"),
        };
        apiChangeShift(this.sid, data)
          .then(async () => {
            await this.$store.dispatch("getAllShiftData");
            alert("換班成功");
          })
          .catch((err) => {
            let errMessage = err.response.data.message;
            if (errMessage === "UNKNOWN_USER") {
              alert("未知的使用者");
            }
          });
      }
    },
    findSidByUsername(username) {
      const selectedUserData = this.allUserShiftTime.find(
        (userData) => userData.username === username
      );
      // undefined的情況
      if (!selectedUserData) return "";
      return selectedUserData.sid;
    },
    deleteShift(shiftData) {
      let data = {
        orginalDate: shiftData.orginalDate.replaceAll("/", "-"),
        target: shiftData.target,
        shiftDate: shiftData.shiftDate.replaceAll("/", "-"),
      };
      apiDeleteShift(this.sid, data)
        .then(async () => {
          alert("刪除成功");
          await this.$store.dispatch("getAllShiftData");
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
  },
  computed: {
    ...mapState([
      "shiftTime",
      "allShiftData",
      "sid",
      "isLogin",
      "username",
      "allUserShiftTime",
    ]),
    otherUsername() {
      const filterSelfUserData = this.allUserShiftTime.filter(
        (userData) => userData.sid !== this.sid
      );
      return filterSelfUserData.map((userData) => userData.username);
    },
    tableShiftList() {
      // 找出有自己的換班資料
      const SelfShiftData = this.containSidShiftData(this.sid);
      let result = [];
      for (let shiftData of SelfShiftData) {
        let shiftdate_1 = new Date(shiftData.shiftDate_1);
        let shiftdate_2 = new Date(shiftData.shiftDate_2);
        if (shiftData.user_1.sid === this.sid) {
          result.push({
            orginalDate: this.formatDate(shiftdate_1),
            target: shiftData.user_2.username,
            shiftDate: this.formatDate(shiftdate_2),
            orginalDate_day: `(${this.week[shiftdate_1.getDay()]})`,
            shiftDate_day: `(${this.week[shiftdate_2.getDay()]})`,
            _id: Symbol(),
          });
        } else {
          result.push({
            orginalDate: this.formatDate(shiftdate_2),
            target: shiftData.user_1.username,
            shiftDate: this.formatDate(shiftdate_1),
            orginalDate_day: `(${this.week[shiftdate_2.getDay()]})`,
            shiftDate_day: `(${this.week[shiftdate_1.getDay()]})`,
            _id: Symbol(),
          });
        }
      }
      return result;
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
