/* eslint-disable prettier/prettier */
import {
  createRouter,
  createWebHistory
} from "vue-router";
import routerName from "./consts.js";

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: "/",
      name: "home",
      component: () => import("../App.vue"),
      redirect: {
        name: "login"
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/public/loginView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/shared/template.vue"),
      redirect: {
        name: "projectManagement"
      },
      children: [{
          path: "/admin/projectManagement",
          name: routerName.admin.projectManagement,
          meta: {
            name: "Project Management"
          },
          component: () => import("../views/admin/projectManagement.vue")
        },
        {
          path: "/admin/sugarManagement",
          name: routerName.admin.sugarManagement,
          meta: {
            name: "Sugar Management"
          },
          component: () => import("../views/admin/sugarManagement.vue")
        },
        {
          path: "/admin/calendarView",
          name: routerName.admin.calendarView,
          meta: {
            name: "Calendar"
          },
          component: () => import("../views/admin/calendarView.vue")
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/errorPage/notFoundView.vue")
    }
  ],
});

export default router;