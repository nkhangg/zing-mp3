import rootReducer from './store/reducer/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

const reduxConfig = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const persisttor = persistStore(store);
    return { store, persisttor };
};

export default reduxConfig;
