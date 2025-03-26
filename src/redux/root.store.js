import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./reducers/root.reducer";
import { all } from 'redux-saga/effects';
import { watcheReduxApplication } from "./saga/postSaga";

// Persist Configuration
const persistConfig = {
    key: "root", // Meaningful key instead of "v1"
    version: 1,
    storage,
    whitelist: ["user", "cart"], // Only persist 'user' slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // 🔥 Important for Redux Persist
        }).concat(sagaMiddleware),
});

function* rootSaga() {
    yield all([watcheReduxApplication()]);
}

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;
