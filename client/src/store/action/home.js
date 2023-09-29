import actionType from './actionType';
import * as apis from '../../apis';

export const getHome = () => async (dispatch) => {
    const responce = await apis.getHome();
    try {
        if (responce?.data.err === 0) {
            dispatch({
                type: actionType.GET_HOME,
                homeData: responce.data.data.items,
            });
        } else {
            dispatch({
                type: actionType.GET_HOME,
                homeData: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionType.GET_HOME,
            homeData: null,
        });
    }
};

export const setScroll = (flag) => {
    return {
        type: actionType.SCROLL,
        flag,
    };
};
