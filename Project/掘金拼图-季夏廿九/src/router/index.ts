import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const DynamicRoutes = [
	{
		path: '/',
		component: () => import('@/views/puzzle/puzzle.vue'),
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: DynamicRoutes
});

router.beforeEach((to: any, from: any, next: any) => {
	NProgress.start();
	next();
});
router.afterEach((to: any, from: any, next: any) => {
	NProgress.done();
});

export default router;
