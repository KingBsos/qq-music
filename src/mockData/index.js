import Mock from 'mockjs';
import './custom';
import music1 from '../assets/music/花澤香菜 - 恋爱サーキュレーション -Instrumental-.mp3';
import music2 from '../assets/music/花澤香菜 - 心生七面 善恶难辨.mp3';
import music3 from '../assets/music/花たん - 心做し.mp3';
import music4 from '../assets/music/a_hisa - Town of Windmill.mp3';
import music5 from '../assets/music/DAOKO,米津玄師 - 打上花火.mp3';
import pic5 from '../assets/pic/QQ截图20200818193559.png';
import music6 from '../assets/music/EpicMusicVn - Last Reunion.mp3';
import pic6 from '../assets/pic/QQ截图20200818190146.png';
import music7 from '../assets/music/Jack Stauber - buttercup.mp3';
import music8 from '../assets/music/Kayaz - Sansa Lala.mp3';
import music9 from '../assets/music/milet - Drown.mp3';
import music10 from '../assets/music/supercell - 君の知らない物語.mp3';
import music11 from '../assets/music/さユり - ミカヅキ -street弾き語りver.-.mp3';

const musicDetailTemplate = {
    id: '@GUID',
    singer: '@NAME',
    album: '@CUSTOMALBUM',
    like: true
};
Mock.mock('/data/likesong', [
    {
        name: '花澤香菜 - 恋爱サーキュレーション -Instrumental-',
        url: music1,
        poster: '@dataImage(50x50)',
        ...musicDetailTemplate
    },
    {
        name: '花澤香菜 - 心生七面 善恶难辨',
        url: music2,
        poster: '@dataImage(50x50)',
        ...musicDetailTemplate
    },
    {
        name: '花たん - 心做し',
        url: music3,
        poster: '@dataImage(50x50)',
        ...musicDetailTemplate
    },
    {
        name: 'a_hisa - Town of Windmill',
        url: music4,
        poster: '@dataImage(50x50)',
        ...musicDetailTemplate
    },
    {
        name: 'DAOKO,米津玄師 - 打上花火',
        url: music5,
        poster: pic5,
        ...musicDetailTemplate
    },
    {
        name: 'EpicMusicVn - Last Reunion',
        url: music6,
        poster: pic6,
        ...musicDetailTemplate
    },
    {
        name: 'Jack Stauber - buttercup',
        url: music7,
        poster: '@dataImage(50x50)',
        ...musicDetailTemplate
    },
    {
        name: 'Kayaz - Sansa Lala',
        url: music8,
        poster: '@dataImage(50x50)',
        ...musicDetailTemplate
    },
    {
        name: 'milet - Drown',
        url: music9,
        poster: '@dataImage(50x50)',
        ...musicDetailTemplate
    },
    {
        name: 'supercell - 君の知らない物語',
        url: music10,
        poster: '@dataImage(50x50)',
        ...musicDetailTemplate
    },
    {
        name: 'さユり - ミカヅキ -street弾き語りver',
        url: music11,
        poster: '@dataImage(50x50)',
        ...musicDetailTemplate
    }
]);
const listTemplate = {
    name: '@CTITLE(3,6)',
    poster: '@DATAIMAGE(200x200)',
    url: '@URL',
    audience: '@NATURAL(0, 10000)'
};
const temp = [
    {
        ...listTemplate, anchor: '@NAME', date: '@DATE'
    }
];
Mock.mock('/data/carefullySelected', {
    data: {
        'carouselData|10': [
            {
                tag: '@CUSTOMTAG',
                poster: '@DATAIMAGE(200x100)',
                url: '@URL'
            }
        ],
        'officalSongList|6': [listTemplate],
        'recommendedSongList|6': [
            {
                ...listTemplate, anchor: '@NAME'
            }
        ],
        "recommendedVideo|6": [
            {
                ...listTemplate, anchor: '@NAME', poster: '@DATAIMAGE(200x120)'
            }
        ],
        latestIssue: {
            '最新|15': temp,
            '内地|15': temp,
            '港台|15': temp,
            '欧美|15': temp,
            '韩国|15': temp,
            '日本|15': temp
        }
    }
});

Mock.mock('/data/ranking', {
    data: {
        rankingList: [],
        regional: [],
        featureList: [],
        globalList: []
    }
});

Mock.mock('/data/singer', {
    data: {
        singers: []
    }
});

Mock.mock('/data/classifiedsonglist', {
    data: {
        carefullySelectedSongList: []
    }
});

Mock.mock('/data/digitalAlbum', {
    data: {
        carousel: [],
        newArrival: [],
        hortestOfWeek: [],
        musicianAlbum: [],
        newVoicePowerBlooming2019: [],
        mainlandAlbumRemonmendation2019: [],
        koreanAlbumRecommendation2019: [],
        moviesAndTVOSTRecommendation2019: []
    }
});

Mock.mock('data/audioProgram', {
    data: {
        recommendedStations: [],
        recommendedPrograms: [],
        programRankings: [],
        popularAuchor: []
    }
})

Mock.mock('data/excusiveuseformobilephone', {
    data: {
        listenTogether: [],
        feturesOfMobile: [],
        wonderfulMusicnews: [],

    }
})