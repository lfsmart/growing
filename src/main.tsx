import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';
import '@/assets/css/index.less';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={ store }>
      <React.StrictMode>
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
);
