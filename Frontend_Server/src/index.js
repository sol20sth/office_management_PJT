import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/stroe';
import { PersistGate } from 'redux-persist/integration/react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// pwa적용을 위한 serviceWorkerRegistration 설정
serviceWorkerRegistration.register();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
    </Provider>
);
