<template>
  <v-container class="container--fluid fill-height container">
    <LoginForm
        title="API Builder"
        logo_url="https://warhammer40000.com/wp-content/themes/gw-warhammer-40k/legacy/assets/images/warhammer40k-logo-2020.png"
        logo_alt="Warhammer 40k logo"
        class="mx-auto pa-2"
        :submit_form="submitLogin"
        :is_submitting="isSubmitting"
        :response_error="loginError"
    >
    </LoginForm>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";
import {mapActions, mapState} from "vuex";

@Component({
  components: {
    LoginForm,
  },
  methods: {
    ...mapActions('auth', ['submitLogin']),
  },
  computed: {
    ...mapState('auth', ['isSubmitting','loginError'])
  }
})
export default class TheLogin extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  background-image: url("https://wallpaperaccess.com/full/1656157.jpg");
  background-position: center;
  background-size: cover;
}
</style>
