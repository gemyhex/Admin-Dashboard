export default [
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/UserPage.vue'),
    meta: {
      name: 'Users',
    }
  },
]
