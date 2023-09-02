import React from 'react'
import {
  ApplicationContext,
  DMSSProvider,
  UiPluginProvider,
} from '@development-framework/dm-core'
import App from './App'
import { createRoot } from 'react-dom/client'

import plugins from './plugins'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const APP_SETTINGS = {
  visibleDataSources: [import.meta.env.VITE_DATA_SOURCE],
  name: 'DemoApp',
  urlPath: 'http://localhost',
}

const container = document.getElementById('root')

const root = createRoot(container!)
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
