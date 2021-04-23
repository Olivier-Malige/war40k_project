<template>
  <v-card elevation="6" outlined shaped min-width="300" class="pa-5">
    <v-form ref="form" v-model="valid">
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
        required
      ></v-text-field>
    </v-form>
    <v-card-actions>
      <v-btn color="primary" elevation="2"> SIGN IN </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  data: () => ({
    valid: true,
    password: "",
    passwordRules: [
      (v) => !!v || "A password is required",
      (v) => (v && v.length > 6) || "Password must be more than 6 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped></style>
