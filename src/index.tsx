import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './components/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();
