import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
// import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
// import { fetchShopCollectionsStart } from "./shop/shop.sagas";
import rootSaga from "./root.sagas";

import createSagaMiddleware from "redux-saga";

import rootReducer from "./root.reducer";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

middleware.push(logger);

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
