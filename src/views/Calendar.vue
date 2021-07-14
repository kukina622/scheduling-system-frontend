<template>
  <v-row>
    <!-- month picker -->
    <v-dialog v-model="month_picker" width="300px">
      <v-date-picker
        type="month"
        @change="pickMonth"
        v-model="selected_month"
      ></v-date-picker>
    </v-dialog>
    <!-- Control button -->
    <v-col cols="12">
      <v-btn @click="setToday" color="#43A047" outlined> Today </v-btn>
      <!-- prev -->
      <v-btn fab text small @click="prev">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
      <!-- next -->
      <v-btn fab text small @click="next">
        <v-icon> mdi-chevron-right </v-icon>
      </v-btn>
      <h2 class="calendar_date">{{ calendar_month }}月{{ calendar_year }}</h2>
      <v-btn fab text small @click="month_picker = true">
        <v-icon> mdi-calendar </v-icon>
      </v-btn>
    </v-col>
    <!-- calender -->
    <v-col cols="12">
      <v-calendar
        ref="calendar"
        v-model="focus"
        :start="now"
        @change="generateEvent"
        :events="events"
      ></v-calendar>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      now: undefined,
      events: [],
      focus: undefined,
      calendar_month: undefined,
      calendar_year: undefined,
      month_picker: false,
      selected_month: undefined,
    };
  },
  methods: {
    generateEvent({ start, end }) {
      this.calendar_year = start.year;
      this.calendar_month = start.month;
      let events = [];

      //產生weekday的物件
      let weekdayObj = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
      let tmpDay = new Date(start.date);
      for (let date = start.day; date <= end.day; date++) {
        tmpDay.setDate(date);
        weekdayObj[tmpDay.getDay()].push(this.formatDate(tmpDay));
      }
      // 建立班表(不包括換班)
      for (let eachUser of this.allUserShiftTime) {
        for (let shiftTime of eachUser.shiftTime) {
          weekdayObj[shiftTime].forEach((day) => {
            events.push({
              name: eachUser.username,
              start: day,
            });
          });
        }
      }
      // 加入換班日期
      for (let eachData of this.allShiftData) {
        const shiftDate_1 = this.formatDate(new Date(eachData.shiftDate_1));
        const shiftDate_2 = this.formatDate(new Date(eachData.shiftDate_2));
        events.push({
          name: eachData.user_1.username,
          start: shiftDate_2,
        });
        events.push({
          name: eachData.user_2.username,
          start: shiftDate_1,
        });
      }
      // 把原本值班時間刪掉
      for (let eachData of this.allShiftData) {
        let index;
        const shiftDate_1 = this.formatDate(new Date(eachData.shiftDate_1));
        const shiftDate_2 = this.formatDate(new Date(eachData.shiftDate_2));
        const username_1 = eachData.user_1.username;
        const username_2 = eachData.user_2.username;
        index = events.findIndex(
          (event) => event.name === username_1 && event.start === shiftDate_1
        );
        if (index > -1) events.splice(index, 1);
        index = events.findIndex(
          (event) => event.name === username_2 && event.start === shiftDate_2
        );
        if (index > -1) events.splice(index, 1);
      }

      this.events = events;
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    next() {
      this.$refs.calendar.next();
    },
    prev() {
      this.$refs.calendar.prev();
    },
    setToday() {
      this.focus = this.now;
      this.selected_month = `${this.now.getFullYear()}-${
        this.now.getMonth() + 1
      }`;
    },
    pickMonth() {
      this.focus = `${this.selected_month}-01`;
    },
  },
  computed: {
    ...mapState(["allUserShiftTime", "allShiftData"]),
  },
  created() {
    this.now = new Date(Date.now());
    this.focus = this.now;
  },
};
</script>

<style scoped>
h2 {
  display: inline-block;
  margin-top: 10px;
  position: relative;
  top: 3px;
}
</style>
