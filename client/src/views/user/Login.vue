<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="5" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="form-side text-center">
          <router-link tag="a" to="/">
            <img class="mb-5" src="/assets/logos/logo.png" width="200" />
          </router-link>
          <h6 class="mb-4">Login to MEVN Dashboard</h6>

          <b-form
            @submit.prevent="formSubmit"
            class="av-tooltip tooltip-label-bottom"
          >
            <b-form-group
              :label="$t('user.email')"
              class="has-float-label mb-4"
            >
              <b-form-input
                type="text"
                v-model="$v.form.email.$model"
                :state="!$v.form.email.$error"
              />
              <b-form-invalid-feedback v-if="!$v.form.email.required"
                >Please enter your email address</b-form-invalid-feedback
              >
              <b-form-invalid-feedback v-else-if="!$v.form.email.email"
                >Please enter a valid email address</b-form-invalid-feedback
              >
              <b-form-invalid-feedback v-else-if="!$v.form.email.minLength"
                >Your email must be minimum 4
                characters</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              :label="$t('user.password')"
              class="has-float-label mb-4"
            >
              <b-form-input
                type="password"
                v-model="$v.form.password.$model"
                :state="!$v.form.password.$error"
              />
              <b-form-invalid-feedback v-if="!$v.form.password.required"
                >Please enter your password</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                v-else-if="
                  !$v.form.password.minLength || !$v.form.password.maxLength
                "
                >Your password must be between 4 and 16
                characters</b-form-invalid-feedback
              >
            </b-form-group>
            <div class="d-flex justify-content-between align-items-center">
              <b-button
                type="submit"
                variant="primary"
                size="lg"
                :disabled="processing"
                :class="{
                  'btn-multiple-state btn-shadow': true,
                  'show-spinner': processing,
                  'show-success': !processing && loginError === false,
                  'show-fail': !processing && loginError
                }"
              >
                <span class="spinner d-inline-block">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
                </span>
                <span class="icon success">
                  <i class="simple-icon-check"></i>
                </span>
                <span class="icon fail">
                  <i class="simple-icon-exclamation"></i>
                </span>
                <span class="label">{{ $t("user.login-button") }}</span>
              </b-button>
              OR
              <GoogleLogin
                :params="googleLoginParams"
                :onSuccess="onGoogleLoginSuccess"
                :onFailure="onGoogleLoginFailure"
                :renderParams="renderParams"
              ></GoogleLogin>
            </div>
            <div
              class="d-flex justify-content-between align-items-center mt-3 ml-1"
            >
              <router-link to="/user/register">
                Create New Account
              </router-link>
            </div>
          </b-form>
        </div>
      </b-card>
      <div class="text-center mt-3">
        <router-link class="ml-4" to="/user/forgot-password"
          >&copy; 2020. MEVN Dashboard. Made by Imtiyaz.</router-link
        >
      </div>
    </b-colxx>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { adminRoot } from "../../constants/config";
import GoogleLogin from "vue-google-login";

const {
  required,
  maxLength,
  minLength,
  email
} = require("vuelidate/lib/validators");

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      googleLoginParams: {
        client_id:
          "382853386402-ep44pmr5ijnicr5n2hq8u602pt9ugctp.apps.googleusercontent.com"
        // "382853386402-6jbqm9suqs9jdgrrblic3f968nlsq5j9.apps.googleusercontent.com"
      },
      renderParams: {
        longtitle: true
      }
    };
  },
  mixins: [validationMixin],
  components: {
    GoogleLogin
  },
  validations: {
    form: {
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
      email: {
        required,
        email,
        minLength: minLength(4)
      }
    }
  },
  computed: {
    ...mapGetters(["currentUser", "processing", "loginError"])
  },
  methods: {
    ...mapActions(["login", "glogin"]),
    formSubmit() {
      this.$v.$touch();
      this.$v.form.$touch();
      this.login({
        email: this.form.email,
        password: this.form.password
      });
    },
    async onGoogleLoginSuccess(data) {
      try {
        this.glogin({
          email: data.nt.Wt,
          name: data.nt.Ad
        });
      } catch (e) {
        console.error(e);
      }
    },
    onGoogleLoginFailure(e) {
      console.error(e);
      this.$toasted.error("Google Sign In Failed");
    }
  },
  watch: {
    currentUser(val) {
      if (val && val.id && val.id.length > 0) {
        this.$toasted.success("Login Successful");
        setTimeout(() => {
          this.$router.push(adminRoot);
        }, 200);
      }
    },
    loginError(val) {
      if (val != null) {
        this.$toasted.error(val);
      }
    }
  }
};
</script>
