<template>
  <div>
    <v-divider :inset="value.inset" :key="index"></v-divider>

    <v-list-tile :key="value.name" avatar ripple @click="goToGrid()">
      <v-list-tile-avatar color="white">
        <v-icon color="purple">{{ value.iconName }}</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-html="value.displayName"></v-list-tile-title>
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
      if (this.value.main_menu) {
        this.$router.push('/');
      } else {
        this.$router.push({
          name: 'multiple_items_view',
          params: { itemName: this.value.name, item: this.value },
        });
      }
    },
  },
};
</script>
