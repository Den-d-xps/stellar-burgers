import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RouterApp } from './routes/router-app';
import { Provider } from 'react-redux';
import { store } from '@store';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
