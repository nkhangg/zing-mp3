import appReducer from './appReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import musicReducer from './musicReducer';
import singerReducer from './singerReducer';

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whitelist: ['curSongId', 'curSongData', 'curAblumId', 'recentSongs', 'volums'],
};

const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(musicConfig, musicReducer),
    singer: singerReducer,
});

export default rootReducer;
