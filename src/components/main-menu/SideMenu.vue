<template>
  <v-navigation-drawer
    v-model="model"
    :permanent="false"
    :temporary="false"
    :clipped="true"
    :floating="false"
    absolute
    overflow
    mobile-break-point="0"
    app
  >
    <v-list two-line>
      <SideMenuItem v-bind:value="landingPageInfo" :index="0" />
      <SideMenuItem
        v-for="(item, index) in pageInfo"
        v-bind:index="index + 1"
        :value="item"
        v-bind:key="index"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import SideMenuItem from "./SideMenuItem.vue";

const axios = require("axios");

export default {
  components: {
    SideMenuItem
  },
  props: {},
  data: () => ({
    model: false,
    pageInfo: [],
    landingPageInfo: {
        main_menu: true,
        name: "Menu",
        entityData: {
            displayName: "Home",
            icon: "home"
        }
    },
    footer: {
      inset: false
    }
  }),
  mounted() {
    axios.get("https://localhost:44359/api/tweezers").then(response => {
      this.pageInfo = response.data;
    });
  },
  methods: {
    changeModel() {
      this.model = !this.model;
    }
  }
};
</script>
