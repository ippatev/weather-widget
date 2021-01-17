<template>
  <div class="widget">
    <widget-toolbar
      @iconClickHandler="setWindow"
      :icon="getWidgetIcon"
      :title="getWidgetTitle"
    ></widget-toolbar>
    <div class="widget__content">
      <div v-if="showSettingsWindow">
        <settings></settings>
      </div>
      <div v-else-if="weathers.length === 0" @click="setWindow('')">
        <vnt-button class="weather-none">Добавить город</vnt-button>
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
import { mapActions, mapState } from "vuex";
export default {
  components: { Weather, WidgetToolbar, Settings },
  name: "App",
  data() {
    return {
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
  created() {
    this.loadWeathers();
  },
  methods: {
    ...mapActions({
      loadWeathers: "load",
    }),
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
