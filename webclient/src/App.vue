<template>
  <v-app class="app">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://warhammer40000.com/wp-content/themes/gw-warhammer-40k/legacy/assets/images/warhammer40k-logo-2020.png"
          transition="scale-transition"
          width="200"
        />
        <h2>API Builder</h2>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

});

</script>

<style lang="scss">
</style>