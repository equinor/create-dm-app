import {
  ApplicationContext,
  DMSSProvider,
  FSTreeProvider,
  UiPluginProvider,
} from '@development-framework/dm-core'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createRoot } from 'react-dom/client';

import plugins from './plugins'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const APP_SETTINGS = {
  visibleDataSources: ['DemoApplicationDataSource'],
  name: 'DemoApp',
  urlPath: 'http://localhost',
}

const container = document.getElementById('root');

const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <DMSSProvider>
      <ApplicationContext.Provider value={APP_SETTINGS}>
        <UiPluginProvider pluginsToLoad={plugins}>
          <App />
          <ToastContainer />
        </UiPluginProvider>
      </ApplicationContext.Provider>
    </DMSSProvider>
  </React.StrictMode>
)
