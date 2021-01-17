<template>
  <button class="w-city-item">
    <span>
      <vnt-icon name="global-navigation"></vnt-icon>
      <p class="w-city-item__title" v-text="weatherData.name"></p>
    </span>
    <span style="height: 22px" @click="$emit('deleted', weatherData.id)">
      <vnt-icon name="delete"></vnt-icon>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    weatherData: Object,
  },
};
</script>