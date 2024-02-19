import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '@/shared/components/App';

import { createBaseApi } from '@/shared/base';
import { getApiUrl } from '@/shared/utils/urls';
import { store } from './configureStore';

createBaseApi(getApiUrl(), store).then(() => {
  ReactDOM.createRoot(document.getElementById('react-app')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>,
  );
});
