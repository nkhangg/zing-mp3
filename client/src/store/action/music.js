import { apiGetArtistSongs, apiGetChartHome, apiSearch } from '../../apis';
import actionType from './actionType';
// import * as apis from '../../apis';
export const setCurSongId = (sid) => {
    return {
        type: actionType.SET_CUR_SONG_ID,
        sid,
    };
};

export const play = (flag) => {
    return {
        type: actionType.PLAY,
        flag,
    };
};

export const playAlbum = (flag) => {
    return {
        type: actionType.SET_ALBUM,
        flag,
    };
};

export const setPlaylist = (songs) => {
    return {
        type: actionType.PLAY_LIST,
        songData: songs,
    };
};

export const loading = (flag) => {
    return {
        type: actionType.LOADING,
        flag: flag,
    };
};

export const setCurSongData = (data) => {
    return {
        type: actionType.SET_CUR_SONG_DATA,
        data,
    };
};

export const setCurAlbum = (pid) => {
    return {
        type: actionType.SET_CUR_ALBUM,
        pid,
    };
};
export const setRecent = (data) => {
    return {
        type: actionType.SET_RECENT,
        data,
    };
};

export const search = (keyword) => async (dispath) => {
    try {
        const responce = await apiSearch(keyword);

        if (responce?.data?.err === 0) {
            dispath({ type: actionType.SEARCH, data: responce.data.data, keyword });
        } else {
            dispath({ type: actionType.SEARCH, data: null });
        }
    } catch (error) {
        dispath({ type: actionType.SEARCH, data: null });
    }
};

export const getSeartchSongs = (singerId) => async (dispath) => {
    try {
        const responce = await apiGetArtistSongs(singerId);

        console.log(responce);
        if (responce?.data?.err === 0) {
            dispath({ type: actionType.PLAY_LIST, songData: responce.data.data.items });
        } else {
            dispath({ type: actionType.PLAY_LIST, songData: null });
        }
    } catch (error) {
        dispath({ type: actionType.PLAY_LIST, songData: null });
    }
};

export const getWeedRank = (id) => async (dispatch) => {
    const responce = await apiGetChartHome();
    try {
        if (responce?.data?.err === 0) {
            dispatch({
                type: actionType.WEEKRANK,
                data: Object.entries(responce?.data?.data?.weekChart)?.find((item) => item[1]?.link?.includes(id)),
                title: Object.entries(responce?.data?.data?.weekChart)?.map((item) => ({
                    title: item[0],
                    link: item[1].link,
                })),
            });
        } else {
            dispatch({ type: actionType.WEEKRANK, data: null, title: null });
        }
    } catch (error) {
        dispatch({ type: actionType.WEEKRANK, data: null, title: null });
    }
};

export const setVolum = (volum) => {
    return {
        type: actionType.VOLUM,
        volum,
    };
};

// export const fetchDetailPlaylist = (pid) => async (dispath) => {
//     try {
//         const responce = await apis.apiGetDetailPlaylist(pid);
//         if (responce?.data.err === 0) {
//             dispath({
//                 type: actionType.PLAY_LIST,
//                 songData: responce.data?.data?.song?.items,
//             });
//         }
//     } catch (error) {
//         dispath({
//             type: actionType.PLAY_LIST,
//             songData: null,
//         });
//     }
// };
