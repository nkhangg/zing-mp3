import actionType from '../action/actionType';
const init = {
    curSongId: null,
    curSongData: null,
    isPlaying: false,
    atAlbum: false,
    songData: null,
    curAblumId: null,
    searchData: {},
    recentSongs: [],
    artistPlaylist: [],
    keyword: '',
    weekRankData: null,
    title: null,
    volums: 0,
};

const musicReducer = (state = init, action) => {
    switch (action.type) {
        case actionType.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null,
            };
        case actionType.PLAY:
            return {
                ...state,
                isPlaying: action.flag,
            };
        case actionType.SET_ALBUM:
            return {
                ...state,
                atAlbum: action.flag,
            };
        case actionType.PLAY_LIST:
            return {
                ...state,
                songData: action.songData || null,
            };
        case actionType.SET_CUR_SONG_DATA:
            return {
                ...state,
                curSongData: action.data || null,
            };
        case actionType.SET_CUR_ALBUM:
            return {
                ...state,
                curAblumId: action.pid || null,
            };
        case actionType.SET_RECENT:
            let songs = state.recentSongs;
            if (action.data) {
                if (state.recentSongs?.some((i) => i.sid === action.data.sid)) {
                    songs = songs.filter((i) => i.sid !== action.data.sid);
                }
                if (songs.length > 19) {
                    songs = songs.filter((i, index, self) => index !== self.length - 1);
                }
                songs = [action.data, ...songs];
            }
            return {
                ...state,
                recentSongs: songs,
            };
        case actionType.SEARCH:
            return {
                ...state,
                searchData: action.data || {},
                keyword: action.keyword || '',
            };
        case actionType.WEEKRANK:
            return {
                ...state,
                weekRankData: action.data || null,
                title: action.title || null,
            };
        case actionType.VOLUM:
            return {
                ...state,
                volums: action.volum,
            };

        default:
            return state;
    }
};

export default musicReducer;
