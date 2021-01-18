<template>
  <div class="container">
    <vnt-listview>
      <draggable v-model="dod" draggable=".vnt-listview-item">
        <transition-group>
          <vnt-listview-item v-for="(weather, index) in weathers" :key="index">
            <city-item
              :weatherData="weather"
              @deleted="deleteCityHandler"
            ></city-item>
          </vnt-listview-item>
        </transition-group>
      </draggable>
    </vnt-listview>
    <div class="w-input">
      <vnt-input v-model="city" label="Add Location"></vnt-input>
      <span @click="addWeatherHanlder(city)">
        <vnt-icon class="w-input__icon" name="add"></vnt-icon>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CityItem from "./City/CityItem.vue";
import draggable from "vuedraggable";

export default {
  components: {
    CityItem,
    draggable,
  },
  data() {
    return { city: null, dod: [] };
  },
  mounted() {
    this.dod = this.weathers;
  },
  watch: {
    dod(value) {
      if (Object.keys(value) !== Object.keys(this.weathers)) {
        this.setWeathersList(value);
      }
    },
  },
  methods: {
    deleteCityHandler(cityId) {
      this.removeCity(cityId);
    },
    ...mapActions({
      removeCity: "remove",
    }),
    ...mapMutations({
      addWeather: "ADD_WEATHER",
      setWeathersList: "SET_WEATHERS",
    }),
    async addWeatherHanlder(City) {
      try {
        console.log(City);
        await this.$http
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=5fefa6da73425bc10f941aab7619eef9&units=metric`
          )
          .then((r) => {
            this.addWeather(r.data);
          });
      } catch (err) {
        console.error(err);
      }
    },
  },
  computed: {
    ...mapState({
      weathers: "weathers",
    }),
  },
};
</script>