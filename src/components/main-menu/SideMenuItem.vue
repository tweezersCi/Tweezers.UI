<template>
  <div>
    <v-divider :inset="value.inset" :key="index"></v-divider>

    <v-list-tile :key="value.title" avatar ripple @click="goToGrid()">
      <v-list-tile-avatar color="white">
        <v-icon color="purple">{{ value.entityData.iconName }}</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-html="value.entityData.displayName"></v-list-tile-title>
        <v-list-tile-sub-title v-html="value.name"></v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToGrid() {
      this.$router.push({
        name: 'single_item',
        params: { item_name: this.value.name },
      });
    },
  },
};
</script>
