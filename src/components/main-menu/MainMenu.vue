<template>
  <v-app id="sandbox" :dark="dark">
    <SideMenu ref="sideMenu"/>
    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="changeSideMenu()"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Tweezers UI</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs10>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
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
    pageInfo: [],
    dark: true,
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: true,
      floating: false,
      mini: false,
    },
    footer: {
      inset: false,
    },
    methods: {
    },
  }),
  methods: {
    changeSideMenu() {
      this.$refs.sideMenu.changeModel();
    },
  },
};
</script>
