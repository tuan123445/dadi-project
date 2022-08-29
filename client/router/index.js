/* eslint-disable prettier/prettier */
import {
  createRouter,
  createWebHistory
} from "vue-router";
import routerName from "./consts.js";
import Api from "../api/index.js";

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
      meta: {
        requireLogin: true
      },
      component: () => import("../views/admin/shared/template.vue"),
      redirect: {
        name: "projectManagement"
      },
      children: [{
          path: "/admin/projectManagement",
          name: routerName.admin.projectManagement,
          meta: {
            name: "Project Management",
            requireLogin: true
          },
          component: () => import("../views/admin/projectManagement.vue")
        },
        {
          path: "/admin/sugarManagement",
          name: routerName.admin.sugarManagement,
          meta: {
            name: "Sugar Management",
            requireLogin: true
          },
          component: () => import("../views/admin/sugarManagement.vue")
        },
        {
          path: "/admin/calendarView",
          name: routerName.admin.calendarView,
          meta: {
            name: "Calendar",
            requireLogin: true
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

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(rs => rs.meta.requireLogin) === true) {
//     return Api.login.checkRouter().then(result => {
//       if (result.status === false) {
//         return next({
//           name: routerName.login
//         });
//       }
//       return next();
//     });
//   }
//   return next();
// });



export default router;