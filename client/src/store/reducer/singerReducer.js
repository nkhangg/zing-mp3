import actionType from '../action/actionType';
const init = {
    artist: null,
    songs: null,
    single: null,
    collection: null,
    appear: null,
    likes: null,
    mv: null,
    isLoading: false,
};

const singerReducer = (state = init, action) => {
    switch (action.type) {
        case actionType.GET__ARTIST:
            return {
                ...state,
                artist: action.data || null,
                songs: action.data?.sections?.find((item) => item.sectionType === 'song') || null,
                likes: action.data?.sections?.find((item) => item.sectionType === 'artist').items || null,
                mv: action.data?.sections?.find((item) => item.sectionType === 'video') || null,
                single: action.data?.sections?.find((item) => item.title === 'Single & EP') || null,
                collection: action.data?.sections?.find((item) => item.title === 'Tuyển tập') || null,
                appear: action.data?.sections?.find((item) => item.title === 'Xuất hiện trong') || null,
            };
        case actionType.LOADING:
            return {
                ...state,
                isLoading: action.flag,
            };
        default:
            return state;
    }
};

export default singerReducer;
