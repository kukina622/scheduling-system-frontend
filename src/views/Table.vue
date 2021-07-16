<template>
  <v-row justify="center">
    <v-col cols="12" class="d-flex justify-center text-h5">
      <span>班表</span>
    </v-col>
    <table class="shiftTable" border="1">
      <thead>
        <tr>
          <td>週日</td>
          <td>週一</td>
          <td>週二</td>
          <td>週三</td>
          <td>週四</td>
          <td>週五</td>
          <td>週六</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(userOfLayer, index1) in gerenateTableData" :key="index1">
          <td v-for="(eachUser, index2) in userOfLayer" :key="index2">
            {{ eachUser.username }}
          </td>
        </tr>
      </tbody>
    </table>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    compareSid(a, b) {
      let ta = parseInt(String(a).substr(1));
      let tb = parseInt(String(b).substr(1));
      return ta < tb ? -1 : 1;
    },
  },
  computed: {
    ...mapState(["allUserShiftTime"]),
    gerenateTableData() {
      let weekObj = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
      let baseFormat = [];
      for (let eachUser of this.allUserShiftTime) {
        eachUser.shiftTime.forEach((day) => {
          weekObj[[day]].push(eachUser);
        });
      }
      // 用學號做排序
      for (let i = 0; i < 7; i++) {
        weekObj[[i]].sort((a, b) => {
          return this.compareSid(a.sid, b.sid);
        });
      }
      // 表格的層數
      let layers = 0;
      Object.values(weekObj).forEach((n) => {
        if (n.length > layers) layers = n.length;
      });

      for (let i = 0; i < layers; i++) {
        baseFormat.push([]);
        for (let day in weekObj) {
          let userData = weekObj[day].shift();
          if (userData) {
            baseFormat[i].push(userData);
          } else {
            baseFormat[i].push({ username: "" });
          }
        }
      }
      return baseFormat;
    },
  },
};
</script>

<style scoped>
* {
  font-family: "微軟正黑體";
}
.shiftTable {
  text-align: center;
  border: solid;
  border-collapse: collapse;
}
.shiftTable td {
  width: 150px;
  height: 50px;
}
.shiftTable thead {
  font-size: 18px;
}
</style>
