<template>
  <div class="widget">
    <div class="widget__toolbar">
      <h4>Weather Widget</h4>
      <vnt-icon name="settings" />
    </div>
    <div class="widget__content">
      <weather :weatherData="weatherData"></weather>
    </div>
  </div>
</template>

<script>
import Weather from "@/components/Weather";
export default {
  components: { Weather },
  name: "App",
  data() {
    return {
      weatherData: {},
    };
  },
  created() {
    this.getWeather();
  },
  methods: {
    async getWeather() {
      try {
        const result = await this.$http
          .get(
            "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=5fefa6da73425bc10f941aab7619eef9&units=metric"
          )
          .then((r) => r.data);
        this.weatherData = result;
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {},
};
</script>
