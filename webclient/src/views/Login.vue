<template>
  <v-container class="container--fluid fill-height container">
    <LoginForm class="mx-auto pa-2"></LoginForm>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";

@Component({
  components: {
    LoginForm,
  },
})

export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.container {
    background-image: url("https://wallpaperaccess.com/full/1656157.jpg");
    background-position: center;
    background-size: cover;
  }
</style>