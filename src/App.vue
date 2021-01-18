<template>
  <div class="widget">
    <vnt-dialog
      :opened.sync="dialogError"
      title="Warning"
      content="Near the top, you'll find Access Your Location, and you can uncheck the Use default box and select the permission you prefer, in this case, Allow."
    >
      <vnt-dialog-btn-dismiss result="cancel">Ok</vnt-dialog-btn-dismiss>
    </vnt-dialog>
    <widget-toolbar
      @iconClickHandler="setWindow"
      :icon="getWidgetIcon"
      :title="getWidgetTitle"
    ></widget-toolbar>
    <div class="widget__content">
      <div v-if="showSettingsWindow">
        <settings></settings>
      </div>
      <div v-else-if="weathers.length === 0" @click="addMyCity()">
        <vnt-button class="weather-none">Add my city ☁️</vnt-button>
      </div>
      <div v-else>
        <weather v-for="w in weathers" :key="w.id" :weatherData="w"></weather>
      </div>
    </div>
  </div>
</template>

<script>
import Weather from "@/components/Weather";
import WidgetToolbar from "@/components/WidgetToolbar";
import Settings from "@/components/Settings";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  components: { Weather, WidgetToolbar, Settings },
  name: "App",
  data() {
    return {
      dialogError: false,
      showSettingsWindow: false,
    };
  },
  computed: {
    ...mapState({
      weathers: "weathers",
    }),
    getWidgetIcon() {
      return this.showSettingsWindow ? "close" : "settings";
    },
    getWidgetTitle() {
      return this.showSettingsWindow ? "Settings" : "";
    },
  },
  mounted() {
    if (this.weathers.length === 0) {
      // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    }
  },
  created() {
    this.loadWeathers();
  },
  methods: {
    ...mapActions({
      loadWeathers: "load",
    }),
    ...mapMutations({
      addWeather: "ADD_WEATHER",
    }),
    async addWeatherHanlder({ lat, lon }) {
      try {
        await this.$http
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5fefa6da73425bc10f941aab7619eef9&units=metric`
          )
          .then((r) => {
            this.addWeather(r.data);
          });
      } catch (err) {
        console.error(err);
      }
    },
    async addMyCity() {
      if (window.navigator.geolocation) {
        const ok = await window.navigator.permissions
          .query({ name: "geolocation" })
          .then((result) => result.state);

        if (ok === "prompt" || ok === "granted") {
          window.navigator.geolocation.getCurrentPosition(
            (success, failure) => {
              if (failure) {
                console.error("error ", failure);
              }
              console.log(success);
              this.addWeatherHanlder({
                lat: success.coords.latitude,
                lon: success.coords.longitude,
              });
            }
          );
        } else {
          this.dialogError = true;
        }
      }
    },
    setWindow(toolbarTitle) {
      switch (toolbarTitle) {
        case "Settings":
          this.showSettingsWindow = false;
          break;
        case "":
          this.showSettingsWindow = true;
          break;
      }
    },
    getWeather() {
      try {
        let lsArray = localStorage.getItem("list")
          ? JSON.parse(localStorage.getItem("list"))
          : [];
        this.weathers = lsArray;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
