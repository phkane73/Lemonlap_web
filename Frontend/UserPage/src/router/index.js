import { createRouter, createWebHistory } from 'vue-router'
import registerView from '../views/registerView.vue';
import loginView from '../views/loginView.vue';
import homeView from '../views/homeView.vue';
import productsView from '../views/productView.vue';
import productDetailView from "../views/productDetail.vue";
import cartView from "../views/cartView.vue";
import aboutView from "../views/aboutView.vue";
import contactView from "../views/contactView.vue";
import serviceView from "../views/serviceView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: registerView
    },
    {
      path: '/login',
      name: 'login',
      component: loginView
    },
    {
      path: '/',
      name: 'home',
      component: homeView
    },
    {
      path: '/about',
      name: 'about',
      component: aboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: contactView
    },
    {
      path: '/service',
      name: 'service',
      component: serviceView
    },
    {
      path: '/products',
      name: 'products',
      component: productsView
    },
    {
      path: '/carts',
      name: 'carts',
      component: cartView
    },
    {
      path: '/products/:id',
      name: 'productDetail',
      component: productDetailView,
      props: true
    },
  ]
})

export default router
