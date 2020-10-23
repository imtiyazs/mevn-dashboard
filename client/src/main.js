import Vue from "vue";
import App from "./App";
// BootstrapVue add
import BootstrapVue from "bootstrap-vue";
// Router & Store add
import router from "./router";
import store from "./store";
// Multi Language Add
import en from "./locales/en.json";
import VueI18n from "vue-i18n";
// Breadcrumb Component Add
import Breadcrumb from "./components/Common/Breadcrumb";
// RefreshButton Component Add
import RefreshButton from "./components/Common/RefreshButton";
// Colxx Component Add
import Colxx from "./components/Common/Colxx";
// Perfect Scrollbar Add
import vuePerfectScrollbar from "vue-perfect-scrollbar";
import VueLineClamp from "vue-line-clamp";
import VueScrollTo from "vue-scrollto";
import { getCurrentLanguage } from "./utils";
import axios from "axios";
import Toasted from "vue-toasted";

Vue.use(BootstrapVue);
Vue.use(VueI18n);
Vue.use(Toasted, {
  duration: 3000
});

const messages = { en: en };
const locale = getCurrentLanguage();
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: "en",
  messages
});

Vue.use(require("vue-shortkey"));
Vue.use(VueScrollTo);
Vue.use(VueLineClamp, {
  importCss: true
});

Vue.component("mevn-breadcrumb", Breadcrumb);
Vue.component("b-refresh-button", RefreshButton);
Vue.component("b-colxx", Colxx);
Vue.component("vue-perfect-scrollbar", vuePerfectScrollbar);

// Set axios base URL
axios.defaults.baseURL = "/server";

Vue.config.productionTip = false;

export default new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
