import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: "Home" }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true , title: "Login" }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guestOnly: true , title: "Register" }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { authOnly: true, title: "Dashboard" }
    }
  ]
})

function isLoggedIn() {
  return localStorage.getItem("auth");
}

router.beforeEach((to, from, next) => {
  document.title = `Laravue - ${to.meta.title}`
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      Swal.fire({
        title: 'Login required',
        text: 'Please log in to access dashboard.',
        icon: 'warning',
       })
      next({name:"login"});
      document.title = `Laravue - Login`
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      Swal.fire({
        title: 'Already loggedin',
        text: 'Your are already logged in.',
        icon: 'success',
       })
      next({name:"dashboard"});
      document.title = `Laravue - Dashboard`
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router
