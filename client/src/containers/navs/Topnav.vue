<template>
  <nav class="navbar fixed-top">
    <div class="d-flex navbar-left">
      <router-link class="navbar-logo" tag="a" :to="adminRoot">
        <img src="/assets/logos/logo.png" width="110" />
      </router-link>
    </div>

    <div class="navbar-right">
      <div class="d-none d-md-inline-block align-middle mr-3">
        <switches
          id="tool-mode-switch"
          v-model="isDarkActive"
          theme="custom"
          class="vue-switcher-small"
          color="primary"
        />
        <b-tooltip
          target="tool-mode-switch"
          placement="left"
          title="Dark Mode"
        ></b-tooltip>
      </div>
      <div class="user d-inline-block" v-if="currentUser">
        <b-dropdown
          class="dropdown-menu-right"
          right
          variant="empty"
          toggle-class="p-0"
          menu-class="mt-3"
          no-caret
        >
          <template slot="button-content">
            <span class="name mr-1">{{ currentUser.name }}</span>
            <span>
              <img :alt="currentUser.name" src="/assets/img/profiles/2.jpg" />
            </span>
          </template>
          <b-dropdown-item>Account</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item @click="logout">Sign out</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
import Switches from "vue-switches";

import { mapGetters, mapMutations, mapActions } from "vuex";

import { menuHiddenBreakpoint, adminRoot } from "../../constants/config";
import {
  getDirection,
  setDirection,
  getThemeColor,
  setThemeColor
} from "../../utils";
export default {
  components: {
    switches: Switches
  },
  data() {
    return {
      menuHiddenBreakpoint,
      adminRoot,
      isDarkActive: false
    };
  },
  methods: {
    ...mapMutations(["changeSideMenuStatus", "changeSideMenuForMobile"]),
    ...mapActions(["setLang", "signOut"]),
    logout() {
      this.signOut().then(() => {
        this.$toasted.success("Logged Out");
        this.$router.push("/user/login");
      });
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
      menuType: "getMenuType",
      menuClickCount: "getMenuClickCount",
      selectedMenuHasSubItems: "getSelectedMenuHasSubItems"
    })
  },
  created() {
    const color = getThemeColor();
    this.isDarkActive = color.indexOf("dark") > -1;
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.$router.go(this.$route.path);
      }
    },
    isDarkActive(val) {
      let color = getThemeColor();
      let isChange = false;
      if (val && color.indexOf("light") > -1) {
        isChange = true;
        color = color.replace("light", "dark");
      } else if (!val && color.indexOf("dark") > -1) {
        isChange = true;
        color = color.replace("dark", "light");
      }
      if (isChange) {
        setThemeColor(color);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    }
  }
};
</script>
