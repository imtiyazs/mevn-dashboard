import Vue from "vue";
import VueRouter from "vue-router";
import { adminRoot } from "./constants/config";
import { getUserToken } from "./utils";
import axios from "axios";
import store from "./store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/user/login"
  },
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: `${adminRoot}/dashboard`,
    meta: { isLoginRequired: true, title: "Dashboard" },
    children: [
      {
        path: "dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "./views/app/dashboard/Analytics"
          )
      }
    ]
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error"),
    meta: { title: "Error" }
  },
  {
    path: "/unauthorized",
    component: () =>
      import(/* webpackChunkName: "error" */ "./views/Unauthorized"),
    meta: { title: "Unauthorized Access" }
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login"),
        meta: { title: "MEVN Login" }
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register"),
        meta: { title: "MEVN Register" }
      }
    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

// Attach page title and check for session validation on each routing
router.beforeEach(async (to, from, next) => {
  // Session Validation
  if (to.meta.isLoginRequired) {
    let isValid = await store.dispatch("VALIDATE_SESSION");
    if (isValid) {
      next();
    }
  }

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map(el => el.parentNode.removeChild(el));

  if (!nearestWithMeta) return next();
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute("data-vue-router-controlled", "");
      return tag;
    })
    .forEach(tag => document.head.appendChild(tag));
  next();
});

// Set auth token in headers
axios.interceptors.request.use(
  req => {
    let token = getUserToken();
    if (token) req.headers["Authorization"] = `Bearer ${token}`;
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);

// Handle error responses
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // Redirect to login if unauthorized
    if (error.response.status === 401 || error.response.status === 403) {
      store.dispatch("signOut");
      router.push("/");
    }
    return Promise.reject(error); // this is the important part
  }
);

export default router;
