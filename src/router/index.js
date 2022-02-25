import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView_copy.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '/',
        // component: HomeView
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/DashboradView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/AdminProducts.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/AdminCoupon.vue')
      }
    ]
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
  // 重新導向
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: {
  //     name: HomeView
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active' // bootstrap
})

export default router
