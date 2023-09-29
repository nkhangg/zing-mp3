import * as apis from '../../apis';
import actionType from './actionType';
export const getSinger = (sid) => async (dispatch) => {
    const responce = await apis.apiGetArtist(sid);
    try {
        if (responce.data.err === 0) {
            dispatch({
                type: actionType.GET__ARTIST,
                data: responce.data.data,
            });
        } else {
            dispatch({
                type: actionType.GET__ARTIST,
                data: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionType.GET__ARTIST,
            data: null,
        });
    }
};

export const setIsloadingSinger = (flag) => {
    return {
        type: actionType.LOADING,
        flag,
    };
};
