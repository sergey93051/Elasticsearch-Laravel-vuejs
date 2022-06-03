import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'animation',
    path: "/animation",
    component: () => import('./components/Animating.vue')
  },
  {
    name: "login",
    path: '/login',
    component: () => import('./components/Login.vue'),
    beforeEnter:checkAuth
  },
  {
    name: "registr",
    path: '/register',
    component: () => import('./components/Registr.vue')
  },
  {
    name: "test",
    path: '/test',
    component: () => import('./components/Test.vue')
  },
  {
    name: "home",
    path: '/home',
    component: () => import('./components/Home.vue'),
    beforeEnter: checkAuth
  },
  {
    name: "main",
    path: '/',
    redirect: () => {
      return '/login'
    }
  },
  {
    name: "newProduct",
    path: '/new/Product',
    component: () => import('./components/CreateProd.vue'),
    beforeEnter: checkAuth,
  },
  {
    name: "product",
    path: '/show/Product/:id',
    component: () => import('./components/Product.vue'),
    beforeEnter: checkAuth,
  },
  {
    name: "cart",
    path: '/cart',
    component: () => import('./components/Cart.vue'),
    beforeEnter: checkAuth,

  },
  {
    path: "/:catchAll(.*)",
    name: "noFound",
    component: () => import('./components/NoPath.vue')
  },
]
function checkAuth(to, from, next) {
  if (to.name == 'home') {
    try {
     axios.get('/api/auth/sanctum').then((response) => {
        if (response.data == true) {
          sessionStorage.setItem('isAuth',true)
          return next()
        }
        sessionStorage.setItem('isAuth',false)
        return next({ name: 'login' })
      });
    }
    catch (error) {
      sessionStorage.setItem('isAuth',false)
      return next({ name: 'login' })
    }
  }
  else if (to.name == "login") {
     if (!JSON.parse(sessionStorage.getItem('isAuth'))) {
         return next();
     }
      return next({ name: "home" });
    
  } else {
    if (!JSON.parse(sessionStorage.getItem('isAuth'))) {
      return next({ name: "login" });
    }
    return next();
  }
}

export default createRouter({
  history: createWebHistory(),
  routes: routes,
})
