const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/checkpoint',
    name: 'Checkpoint',
    component: () => import('@/views/Checkpoint.vue'),
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('@/views/Play.vue'),
  },
]

export default routes
