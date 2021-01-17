<template>
  <div @click="iconClickHandler" class="widget__toolbar">
    <h4 class="widget__toolbar--title">{{ title }}</h4>
    <vnt-icon class="w-btn-icon" :name="icon" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  methods: {
    iconClickHandler() {
      this.$emit("iconClickHandler", this.title);
    },
  },
};
</script>