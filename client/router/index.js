/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  createRouter,
  createWebHistory
} from "vue-router";
import routerName from "./consts.js";
import Api from "../api/index.js";
import store from "../core/store";

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: "/",
      name: "home",
      component: () => import("../App.vue"),
      redirect: {
        name: routerName.login
      }
    },
    {
      path: "/login",
      name: routerName.login,
      component: () => import("../views/public/loginView.vue"),
    },
    {
      path: "/profile",
      name: routerName.profile,
      meta: {
        requireLogin: true,
      },
      component: () => import("../views/public/profileView.vue")
    },
    {
      path: "/admin",
      name: "admin",
      meta: {
        requireLogin: true,
      },
      component: () => import("../views/admin/shared/template.vue"),
      redirect: {
        name: routerName.admin.form.formSubmit
      },
      children: [{
          path: "/admin/project",
          redirect: {
            name: routerName.admin.project.projectSubmit
          },
          name: "Project",
          meta: {
            name: "Project",
          },
          children: [{
            path: "/admin/projectManagement",
            meta: {
              name: "Project Management",
              requireLogin: true,
              requireAdmin: true
            },
            name: routerName.admin.project.projectManagment,
            component: () => import("../views/admin/projectManagement.vue")
          }, {
            path: "/admin/projectSubmit",
            meta: {
              name: "Project Submit",
              requireLogin: true,
              requireAdmin: false
            },
            name: routerName.admin.project.projectSubmit,
            component: () => import("../views/admin/projectSubmit.vue")
          }],
        },
        {
          path: "/admin/form",
          redirect: {
            name: routerName.admin.form.formSubmit
          },
          name: "Form",
          meta: {
            name: "Form",
          },
          children: [{
              path: "/admin/formManagement",
              name: routerName.admin.form.formManagement,
              meta: {
                name: "Form Management",
                requireLogin: true,
                requireAdmin: true
              },
              component: () => import("../views/admin/formManagement.vue")
            },
            {
              path: "/admin/formSubmit",
              name: routerName.admin.form.formSubmit,
              meta: {
                name: "Form Submit",
                requireLogin: false,
                requireAdmin: false
              },
              component: () => import("../views/admin/formSubmit.vue")
            }
          ]

        },
        {
          path: "/admin/sugar",
          redirect: {
            name: routerName.admin.sugar.sugarRequest
          },
          name: "Sugar",
          meta: {
            name: "Sugar",
          },
          children: [{
              path: "/admin/sugarManagement",
              name: routerName.admin.sugar.sugarManagement,
              meta: {
                name: "Sugar Management",
                requireLogin: true,
                requireAdmin: true
              },
              component: () => import("../views/admin/sugarManagement.vue")
            },
            {
              path: "/admin/sugarRequest",
              name: routerName.admin.sugar.sugarRequest,
              meta: {
                name: "Sugar Request",
                requireLogin: false,
                requireAdmin: false
              },
              component: () => import("../views/admin/sugarRequest.vue")
            }
          ]
        },
        {
          path: "/admin/usersManager",
          name: routerName.admin.usersManager,
          meta: {
            name: "User Manager",
            requireLogin: true
          },
          component: () => import("../views/admin/usersManager.vue")
        },
        {
          path: "/admin/shop",
          name: routerName.admin.shop,
          meta: {
            name: "Shop",
            requireLogin: true
          },
          component: () => import("../views/admin/shopView.vue")
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

// comment
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(rs => rs.meta.requireLogin) === true) {
//     return Api.login.checkRouter().then(result => {
//       if (result.status === false) {
//         return next({
//           name: routerName.login
//         });
//       }
//       store.state.user_info = result.userInfo;
//       return next();
//     });
//   }
//   return next();
// });



export default router;