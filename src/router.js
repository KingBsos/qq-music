import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: Index,
        children: [
            {
                path: 'musichall'
            },
            {
                path: 'video'
            },
            {
                path: 'radiostation'
            },
            {
                path: 'ilike'
            },
            {
                path: 'localanddownload'
            },
            {
                path: 'playhistory'
            },
            {
                path: 'auditionlist'
            },
            {
                path: 'createdsonglist'
            },
            {
                path: 'songlistcollection'
            }
        ]
    }
];

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior() {
        return {x: 0, y: 0}
    }
});

export default router;