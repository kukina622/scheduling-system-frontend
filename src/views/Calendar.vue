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
      let nowtDay = new Date(start.date);
      const events = [];
      for (let day = start.day; day <= end.day; day++) {
        nowtDay.setDate(day);
        events.push({
          name: "",
          start: this.formatDate(nowtDay),
        });
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
  computed: {},
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
