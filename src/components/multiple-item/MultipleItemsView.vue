<template>
  <GridView :key="randomKey()" v-bind:item="this.item"></GridView>
</template>

<script>
import GridView from './layouts/GridView.vue';

export default {
  components: {
    GridView,
  },

  props: {
    itemName: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },

  methods: {
    randomKey() { return Math.round(Math.random() * 1000); },
  },

  mounted() {
  },
};
</script>
