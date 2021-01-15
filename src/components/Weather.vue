<template>
  <div class="weather">
    <div class="weather__header">
      <img
        width="80px"
        height="80px"
        :src="getImageUrl(weatherData.weather[0].icon)"
        alt=""
      />
      <h2>{{ weatherData.main.temp_max }}℃</h2>
    </div>
    <div class="weather__content">
      <div>
        <p>
          Feels like {{ weatherData.main.feels_like }}.
          {{
            weatherData.weather[0].main +
            ". " +
            weatherData.weather[0].description
          }}
        </p>
        <div class="row">
          <div class="col">
            <div>
              <icon-wind-direction />
              {{ weatherData.wind.speed }} m/s
            </div>
          </div>
          <div class="col">
            <div>
              <icon-pressure />
              {{ weatherData.main.pressure }}hPa
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p>Humidity: {{ weatherData.main.humidity }}%</p>
          </div>
          <div class="col">Dew point: 0℃</div>
        </div>
        <div class="row">
          <div class="col">
            <p>Visibility: {{ weatherVisKm }}km</p>
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
      return `http://openweathermap.org/img/w/${id}.png`;
    },
  },
};
</script>