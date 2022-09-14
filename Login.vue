<template>
  <div class="col-md-12">
    <div class="card card-container">
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Nom d'utilisateur :</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <custom-button
            text="Connexion"
            type="submit"
            class="btn btn-secondary md login-button"
            :disabled="loading"
          ></custom-button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import CustomButton from "@/components/Button/CustomButton.vue";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
    CustomButton,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Le nom d'utilisateur est requis!"),
      password: yup.string().required("Le mot de passe est requis!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },

  mounted() {
    if (this.$store.state.auth.status.loggedIn) {
      this.$router.push("/");
    }
  },

  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style lang="scss" src="./Login.scss" scoped></style>
