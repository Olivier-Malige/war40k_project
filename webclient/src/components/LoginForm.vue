<template>
  <v-card elevation="5"
          outlined
          shaped
          min-width="300"
          class="pa-5"
          :loading="is_submitting">
      <v-card-title>
        <v-img
            :alt="logo_alt"
            class="shrink mr-2"
            contain
            :src="logo_url"
            transition="scale-transition"
            width="200"
        />
        <h3>{{title}}</h3>
      </v-card-title>
      <v-form @submit="trySubmit" ref="form" v-model="valid">
        <v-text-field
            color="accent"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>
        <v-text-field
            color="accent"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
        ></v-text-field>
        <h4 v-if="response_error !== null">{{response_error}}</h4>
      <v-card-actions class="justify-center">
        <v-btn type="submit" :disabled="is_submitting || !valid" color="primary" elevation="2"> SIGN IN </v-btn>
      </v-card-actions>
      </v-form>
    </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  data: () => ({
    valid: false,
    password: "",
    passwordRules: [
      (value) => !!value || "A password is required",
      (value) => (value && value.length > 6) || "Password must be more than 6 characters",
    ],
    email: "",
    emailRules: [
      (value) => !!value || "E-mail is required",
      (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
    ],
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    trySubmit(evt) {
      evt.preventDefault();
      this.submit_form({
        email : this.email,
        password :this.password
      });
    },
  },
  updated() {
    console.log(this.response_error)
  },
  props: {
    submit_form : Function,
    title : String,
    logo_url : String,
    logo_alt : String,
    is_submitting : {
      type: Boolean,
      default: false
    },
    response_error: String,
  }
};
</script>
