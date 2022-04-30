import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name:'animation',
    path:"/animation",
    component:()=>import('./components/Animating.vue')
  },
  {
    name: "login",
    path: '/login',
    component: () => import('./components/Login.vue')
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
    component: () => import('./components/Home.vue')
  },
  {
    name: "newProduct",
    path: '/new/Product',
    component: () => import('./components/CreateProd.vue')
  },
  {
    name: "product",
    path: '/show/Product/:id',
    
    component: () => import('./components/Product.vue')
  },
  {
      name: "cart",
      path: '/cart',    
      component: () => import('./components/Cart.vue')
  },
  {
    path:"/:catchAll(.*)",
    name:"noFound",
    component: () => import('./components/NoPath.vue')
  }
  
]

export default createRouter({
  history: createWebHistory(),
  routes: routes,
})
