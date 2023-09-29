import actionType from '../action/actionType';
const init = {
    banner: [],
    friday: {},
    newEveryday: {},
    top100: {},
    xone: {},
    newRelease: {},
    newMusic: {},
    weekChart: [],
    event: {},
    chart: {},
    rank: [],
    singers: [],
    isLoading: false,
    scroll: false,
};

const appReducer = (state = init, action) => {
    switch (action.type) {
        case actionType.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find((item) => item.sectionId === 'hSlider')?.items || null,
                friday: action.homeData?.find((item) => item.sectionId === 'hAutoTheme1') || {},
                newEveryday: action.homeData?.find((item) => item.sectionId === 'hAutoTheme2') || {},
                top100: action.homeData?.find((item) => item.sectionId === 'h100') || {},
                xone: action.homeData?.find((item) => item.sectionId === 'hXone') || {},
                newMusic: { ...action.homeData?.find((item) => item.sectionId === 'hAlbum'), title: 'Nhạc Mới' } || {},
                newRelease: action.homeData?.find((item) => item.sectionType === 'new-release') || {},
                weekChart: action.homeData?.find((item) => item.sectionType === 'weekChart')?.items || [],
                event:
                    {
                        ...action.homeData?.find((item) => item.sectionType === 'event')?.items,
                        titleComponent: 'Sự Kiện',
                    } || {},
                chart: action.homeData?.find((item) => item.sectionId === 'hZC')?.chart || {},
                rank: action.homeData?.find((item) => item.sectionId === 'hZC')?.items || [],
                singers: action.homeData?.find((item) => item.sectionType === 'artistSpotlight')?.items || [],
            };
        case actionType.LOADING:
            return {
                ...state,
                isLoading: action.flag,
            };

        case actionType.SCROLL:
            return {
                ...state,
                scroll: action.flag,
            };

        default:
            return state;
    }
};

export default appReducer;
