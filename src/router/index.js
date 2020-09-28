import Vue from 'vue';
import Router from 'vue-router';
import FullScreenPlayPanel from '../components/FullScreenPlayPanel.vue';
import Index from '../components/Index.vue';
import MusicHall from '../components/MusicHall.vue';
import MusicHallChildren from './musichallChildren';
import ILike from '../components/ILike.vue';
import Song from '../components/Song.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/index/ilike',
    },
    {
        path: '/index',
        component: Index,
        beforeEnter(to, from, next) {
            //console.log('beforeEnter')
            next();
        },
        children: [
            {
                path: 'musichall',
                component: MusicHall,
                redirect: 'musichall/carefullyselected',
                children: MusicHallChildren
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
                        component: Song,
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
    },
    {
        path: '/fullscreenplaypanel',
        component: FullScreenPlayPanel
    }

];

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
});

router.beforeEach(function(to, from, next) {
    //console.log('beforeEach');
    next();
});
router.beforeResolve(function(to, from, next) {
    //console.log('beforeResolve');
    next();
});
router.afterEach(function() {
    //console.log('afterEach');
});

export default router;