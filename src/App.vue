<template>
  <MainMenu/>
</template>

<script>
import MainMenu from './components/main-menu/MainMenu.vue';
import SideMenu from "./components/main-menu/SideMenu.vue";

export default {
  name: 'App',
  components: {
    MainMenu,
    SideMenu,
  },
  data() {
    return {
      //
    };
  },
};
</script>
