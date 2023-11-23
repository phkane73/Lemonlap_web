import { createRouter, createWebHistory } from 'vue-router'
import loginView from '../views/loginView.vue';
import listProductView from '../views/listProductsView.vue';
import addProductView from '../views/addProductView.vue';
import updateProductView from '../views/updateProductView.vue';
import listUserView from '../views/listUserView.vue';
import listOrders from '../views/listOrders.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginView
    },
    {
      path: '/listproducts',
      name: 'listproducts',
      component: listProductView
    },
    {
      path: '/addproduct',
      name: 'addproduct',
      component: addProductView
    },
    {
      path: '/updateproduct/:id',
      name: 'updateproduct',
      component: updateProductView,
      props: true
    },
    {
      path: '/listusers',
      name: 'listusers',
      component: listUserView
    },
    {
      path: '/listorders',
      name: 'listorders',
      component: listOrders
    }
  ]
})

export default router
