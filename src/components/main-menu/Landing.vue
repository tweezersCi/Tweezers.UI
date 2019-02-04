<template>
  <v-app id="sandbox" :dark="dark">
    <SideMenu ref="sideMenu"/>
    <v-toolbar :clipped-left="true" app absolute>
      <v-toolbar-side-icon
        @click.stop="toggleSideMenu()"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Tweezers UI</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer :inset="footer.inset" app>
      <v-spacer/>
      <span class="px-2">&copy; {{ new Date().getFullYear() }} powered by</span>
      <svg-icon name="tweez" width="20" height="20" color="#FFFFFF"></svg-icon>
      <span class="px-1"/>
    </v-footer>
  </v-app>
</template>

<script>
import SideMenu from './SideMenu.vue';

export default {
  components: {
    SideMenu,
  },
  data: () => ({
    dark: true,
    footer: {
      inset: true,
    },
    methods: {
    },
  }),
  methods: {
    toggleSideMenu() {
      this.$refs.sideMenu.changeModel();
    },
  },
};
</script>
