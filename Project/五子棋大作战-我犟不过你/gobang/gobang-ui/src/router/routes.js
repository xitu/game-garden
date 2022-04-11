const routes = [
    {
        name: 'home',
        path: '/home',
        component: () => import('@/components/ManMachineSgainst.vue')
    },
    {
        name: 'OnlinePlay',
        path: '/OnlinePlay',
        component: () => import('@/components/OnlinePlay.vue')
    }

];

export default routes