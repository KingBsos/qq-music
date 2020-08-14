import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index.vue';
import ILike from './components/ILike.vue';
import Song from './components/Song.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/ilike',
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
                path: 'ilike',
                redirect: 'ilike/song',
                component: ILike,
                children: [
                    {
                        path: 'song',
                        component: Song
                    },
                    {
                        path: 'songsheet'
                    },
                    {
                        path: 'album'
                    },
                    {
                        path: 'anchorstation'
                    },
                    {
                        path: 'video'
                    }
                ]
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
        return { x: 0, y: 0 }
    }
});

export default router;