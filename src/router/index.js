import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/Main";
import Settings from "@/components/Settings";
import Menu from "@/components/Menu";
import Items from "@/components/Items";
import MenuView from "@/components/MenuView";
import MenuDay from "@/components/MenuDay";
import Meal from "@/components/Meal";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Feedbacks from "@/components/Feedbacks";
import NotFoundComponent from "@/components/NotFoundComponent";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: [
    {
      path: "/view-by-day",
      name: "MenuDay",
      component: MenuDay
    },
    {
      path: "/",
      component: Main,
      children: [
        {
          path: "/",
          name: "Menu",
          component: Menu
        },
        {
          path: "/settings",
          name: "Settings",
          component: Settings
        },
        {
          path: "/items",
          name: "Items",
          component: Items
        },
        {
          path: "/menu/:id/",
          name: "MenuView",
          component: MenuView
        },
        {
          path: "/meals",
          name: "Meal",
          component: Meal
        },
        {
          path: "feedbacks",
          name: "Feedbacks",
          component: Feedbacks
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "*",
      component: NotFoundComponent
    }
  ]
});

export default router;
