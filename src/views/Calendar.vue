<template>
  <v-row>
    <!-- Control button -->
    <v-col cols="12">
      <v-btn @click="setToday" color="#43A047" outlined>
        Today
      </v-btn>
      <!-- prev -->
      <v-btn fab text small @click="prev">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
      <!-- next -->
      <v-btn fab text small @click="next">
        <v-icon> mdi-chevron-right </v-icon>
      </v-btn>
    </v-col>
    <!-- calender -->
    <v-col cols="12">
      <v-calendar
        ref="calendar"
        v-model="focus"
        :start="formatNow"
        @change="rnd"
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
      focus: "",
    };
  },
  methods: {
    rnd({ start, end }) {
      console.log(start);
      console.log(end);
      let nowtDay = new Date(start.date);
      // let endDay = new Date(end.date)
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
      this.focus = "";
    },
  },
  computed: {
    formatNow() {
      const _now = this.now;
      return `${_now.getFullYear()}-${_now.getMonth() + 1}-${_now.getDate()}`;
    },
  },
  created() {
    this.now = new Date(Date.now());
  },
};
</script>
