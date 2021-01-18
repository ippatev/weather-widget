<template>
  <div class="weather">
    <div class="weather__header">
      <h4 class="widget__content--title">{{ weatherData.name }}</h4>
      <div class="weather__header--img">
        <img
          width="80px"
          height="80px"
          :src="getImageUrl(weatherData.weather[0].icon)"
          alt=""
        />
        <h2 class="weather__header--title">
          {{ weatherData.main.temp_max.toFixed(0) }}℃
        </h2>
      </div>
    </div>
    <div class="weather__content">
      <div>
        <p>
          Feels like {{ weatherData.main.feels_like.toFixed() }}℃.
          {{
            weatherData.weather[0].main +
            ". " +
            weatherData.weather[0].description
          }}
        </p>
        <div class="row">
          <div class="col">
            <div>
              <icon-wind-direction :windDeg="weatherData.wind.deg" />
              <p>{{ weatherData.wind.speed.toFixed(1) }} m/s</p>
            </div>
          </div>
          <div class="col">
            <div>
              <icon-pressure />
              <p>{{ weatherData.main.pressure }}hPa</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p>Humidity: {{ weatherData.main.humidity }}%</p>
          </div>
          <div class="col">
            <p>Dew point: 0℃</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p>Visibility: {{ weatherVisKm.toFixed(1) }}km</p>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconWindDirection from "./Icons/IconWindDirection";
import IconPressure from "./Icons/IconPressure";
export default {
  components: {
    IconWindDirection,
    IconPressure,
  },
  props: {
    weatherData: {
      type: Object,
    },
  },
  computed: {
    weatherVisKm() {
      return this.weatherData.visibility / 1000;
    },
  },
  methods: {
    getImageUrl(id) {
      return `https://openweathermap.org/img/w/${id}.png`;
    },
  },
};
</script>