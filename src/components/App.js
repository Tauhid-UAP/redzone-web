import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import tokenReducer from '../reducers/token';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, tokenReducer);

const myStore = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const myPersistor = persistStore(myStore);

export default class App extends Component {
    render() {
        return (
            <Provider store={myStore}>
                <PersistGate loading={<p>loading...</p>} persistor={myPersistor}>
                    <div>
                        <HomePage />
                    </div>
                </PersistGate>
            </Provider>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);