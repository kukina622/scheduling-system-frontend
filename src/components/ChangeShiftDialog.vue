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
                    :items="generateShiftDate(selectedUserSid)"
                    v-model="selectedDate_Other"
                  ></v-select>
                  <div>
                    <v-btn large class="mr-2 white--text" color="#43a047">
                      確定
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
import { mapState } from "vuex";
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
    containSidShiftData(sid) {
      const allShiftData = this.allShiftData;
      return allShiftData.filter(
        (shiftData) =>
          shiftData.user_1.sid === sid || shiftData.user_2.sid === sid
      );
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
    selectedUserSid() {
      const selectedUserData = this.allUserShiftTime.find(
        (userData) => userData.username === this.selectedUser
      );
      // undefined的情況
      if (!selectedUserData) return "";
      return selectedUserData.sid;
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
