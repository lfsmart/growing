import React from 'react';
import ReactDOM from 'react-dom/client';

// 使用路由组件
import Router from '@/router/index.old.router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
