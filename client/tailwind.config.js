/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './public/index.html'],
    theme: {
        extend: {
            backgroundColor: {
                'main-100': '#E7ECEC',
                'main-200': '#DDE4E4',
                'main-300': '#CED9D9',
                'main-400': '#C0D8D8',
                'main-500': '#0E8080',
                'overlay-30': 'rgba(0,0,0,0.3)',
                'overlay-10': 'rgba(77,34,104,0.8)',
            },
            colors: {
                'main-100': '#E7ECEC',
                'main-200': '#DDE4E4',
                'main-300': '#CED9D9',
                'main-400': '#C0D8D8',
                'main-500': '#0E8080',
                'main-600': 'rgba(77,34,104,0.8)',
                ccc: '#ccc !important',
            },

            keyframes: {
                'slide-right': {
                    '0%': {
                        opacity: '0;',
                        transform: 'translateX(-500px);',
                    },
                    '100%': {
                        opacity: '1;',
                        transform: 'translateX(0);',
                    },
                },
                'slide-left': {
                    '0%': {
                        opacity: '0;',
                        transform: 'translateX(500px);',
                    },
                    '100%': {
                        opacity: '1;',
                        transform: 'translateX(0);',
                    },
                },
                'slide-left2': {
                    '0%': {
                        opacity: '0;',
                        transform: 'translateX(500px);',
                    },
                    '100%': {
                        opacity: '1;',
                        transform: 'translateX(0);',
                    },
                },
                cd: {
                    '0%': {
                        transform: 'rotate(0deg);',
                    },
                    '100%': {
                        transform: 'rotate(360deg)',
                    },
                },
                cdPause: {
                    '0%': {
                        'border-radius': '50%',
                        transform: 'rotate(0deg);',
                    },
                    '100%': {
                        'border-radius': '50%',
                        transform: 'rotate(360deg)',
                    },
                },

                toSquare: {
                    '0%': {
                        'border-radius': '50%',
                    },
                    '100%': {
                        'border-radius': '6px',
                    },
                },
                toCircle: {
                    '0%': {
                        'border-radius': '6px',
                    },
                    '100%': {
                        'border-radius': '50%',
                    },
                },
                mainHoverOn: {
                    '0%': {
                        transform: 'scale(1);',
                    },
                    '100%': {
                        transform: 'scale(1.05);',
                    },
                },
                mainHoverLeave: {
                    '0%': {
                        transform: 'scale(1.05);',
                    },
                    '100%': {
                        transform: 'scale(1);',
                    },
                },
            },
            animation: {
                'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                cd: 'toCircle .3s linear forwards, cd 14s .1s linear infinite',
                'cd-pause': 'cdPause .5s 1 linear both , toSquare .2s .8s linear forwards',
                'main-hover-leave': 'mainHoverLeave 0.4s linear forwards ',
                'main-hover-on': 'mainHoverOn 0.4s linear forwards',
            },
            screens: {
                1600: '1600px',
            },
            flex: {
                4: '4 4 0%',
                6: '6 6 0%',
                3: '3 3 0%',
                7: '7 7 0%',
            },
        },
    },
    plugins: [],
};
