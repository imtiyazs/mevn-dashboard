<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="5" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="form-side text-center">
          <router-link tag="a" to="/">
            <img class="mb-5" src="/assets/logos/logo.png" width="200" />
          </router-link>
          <h6 class="mb-4">Register New Account</h6>
          <b-form @submit.prevent="formSubmit">
            <label class="form-group has-float-label mb-4">
              <input
                type="text"
                class="form-control"
                v-model="fullname"
                required
              />
              <span>{{ $t("user.fullname") }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input
                type="email"
                class="form-control"
                v-model="email"
                required
              />
              <span>{{ $t("user.email") }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input
                type="password"
                class="form-control"
                v-model="password"
                required
              />
              <span>{{ $t("user.password") }}</span>
            </label>
            <div class="d-flex justify-content-end align-items-center">
              <b-button
                type="submit"
                variant="primary"
                size="lg"
                class="btn-shadow"
                block
                >REGISTER ACCOUNT</b-button
              >
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { adminRoot } from "../../constants/config";
export default {
  data() {
    return {
      fullname: "",
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["processing", "loginError"])
  },
  methods: {
    ...mapActions(["register"]),
    async formSubmit() {
      await this.register({
        name: this.fullname,
        email: this.email,
        password: this.password
      });

      this.$toasted.success("Registration Successful");
      this.$router.push("/user/login");
    }
  },
  watch: {
    loginError(val) {
      if (val != null) {
        this.$toasted.error(val);
      }
    }
  }
};
</script>
