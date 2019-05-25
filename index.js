httpVueLoader.register(Vue, 'components/tree-item.vue');
const app = new Vue({
    el: '#app',
    data: {
        tree: {
            id: '2ef4ee9c44778c96fdb2fc13139105b1',
            t: 'All projects', 
            c: [
                {
                    id: 'd73336a16533767b3a467f59397e5cbe',
                    t: 'Website Burns Inc',
                    c: [
                        {
                            id: 'fd9627445d8c83a5f527781055a800a5',
                            t: 'SPIN',
                            c: [],
                        },
                        {
                            id: 'd301fb55d8c7ff3d55788552e70f87a5',
                            t: 'Use Cases',
                            c:[
                                {
                                    id: 'ea499c20837bb402aa4d0bef921588d1',
                                    t: 'Inform and play down',
                                    c: [],
                                },
                                {
                                    id: 'f4aee18aa952f07af7b0a82b6fc5a822',
                                    t: 'Recruitment',
                                    c: [],
                                },
                            ],
                        },
                        {
                            id: '8c36716832d983617c546d485e4ed070',
                            t: 'Components',
                            c: [
                                {
                                    id: 'faa90804bc85d272b0013b285e310263',
                                    t: 'CMS',
                                    c: [
                                        {
                                            id: 'a9e644184f4943f6842c98d884327a0f',
                                            t: 'Start page template',
                                            c: [],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: '6c1deaf665ebda9445af8f69e3c14606',
                            t: 'System Ctx',
                            c:[],
                        },
                        {
                            id: 'd1453291504902524bf62111eb383d60',
                            t: 'Sub-Projects',
                            c: [
                                {
                                    id: 'ca3b5d011734a561d9d1f605c4adff90',
                                    t: 'Content Creation',
                                    c: [
                                        {
                                            id: '00d3dadac0c8cb2d07f2b613acd6278c',
                                            t: 'Use Cases',
                                            c: [
                                                {
                                                    id: 'b9dac0f76a19727d5059733af7649f95',
                                                    t: 'Create landing page',
                                                    c: [],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        debriefs: [ // chrono order
            {
                id: '05494a90bcf62e86fae2d0336f974303',
                l: [
                    {
                        tid: 'ea499c20837bb402aa4d0bef921588d1',
                        t: 'Initial template created w/ text and one unsplash img as plain-HTML; styles are h1, p, p.twocol, img.rightside',
                        status: null, // none
                    },
                    {
                        tid: 'a9e644184f4943f6842c98d884327a0f',
                        t: null, // use prev
                        status: ['25%', 'progress', 'ontrack'],
                    }
                ],
            },
        ],
        symbols: {
            '0%': {
                s: '🌑',
                t: '0%',
            },
            '25%': {
                s: '🌒',
                t: '25%',
            },
            '50%': {
                s: '🌓',
                t: '50%',
            },
            '75%': {
                s: '🌔',
                t: '75%',
            },
            '100%': {
                s: '🌕',
                t: '100%',
            },
            'open': {
                s: '🗒',
                t: 'open',
            },
            'progress': {
                s: '🔧',
                t: 'in progress',
            },
            'done': {
                s: '✅',
                t: 'done',
            },
            'ontrack': {
                s: '🔸',
                t: 'on track',
            },
            'challenging': {
                s: '🔴',
                t: 'challenging',
            },
            'danger': {
                s: '⚠️',
                t: 'danger',
            },
            'important': {
                s: '❗',
                t: 'important',
            },
            'good': {
                s: '😀',
                t: 'good',
            },
            'bad': {
                s: '😫',
                t: 'bad',
            },
        },
    },
});