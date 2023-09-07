import React from 'react'
import {
  ApplicationContext,
  DMSSProvider,
  UiPluginProvider,
} from '@development-framework/dm-core'
import App from './App'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from 'react-oauth2-code-pkce'
import plugins from './plugins'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const fullCurrentURL = () =>
  `${window.location.pathname}${window.location.search}${window.location.hash}`

const authEnabled = import.meta.env.VITE_AUTH_ENABLED === '1'
const authConfig = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  authorizationEndpoint: `https://login.microsoftonline.com/${
    import.meta.env.VITE_TENANT_ID
  }/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${
    import.meta.env.VITE_TENANT_ID
  }/oauth2/v2.0/token`,
  scope: import.meta.env.VITE_AUTH_SCOPE,
  redirectUri: import.meta.env.VITE_REDIRECT_URI,
  logoutEndpoint: `https://login.microsoftonline.com/${
    import.meta.env.VITE_TENANT_ID
  }/oauth2/logout`,
  preLogin: () => localStorage.setItem('preLoginPath', fullCurrentURL()),
  postLogin: () => {
    if (localStorage.getItem('preLoginPath') !== fullCurrentURL()) {
      // @ts-ignore
      window.location.href = localStorage.getItem('preLoginPath')
    }
  },
}

const APP_SETTINGS = {
  visibleDataSources: [import.meta.env.VITE_DATA_SOURCE],
  name: 'DemoApp',
  urlPath: 'http://localhost',
}

const container = document.getElementById('root')

const Content = () => {
  return (
    <DMSSProvider dmssBasePath={import.meta.env.VITE_DMSS_URL}>
      <ApplicationContext.Provider value={APP_SETTINGS}>
        <UiPluginProvider pluginsToLoad={plugins}>
          <App />
          <ToastContainer />
        </UiPluginProvider>
      </ApplicationContext.Provider>
    </DMSSProvider>
  )
}

const root = createRoot(container!)
root.render(
  <React.StrictMode>
    {authEnabled ? (
      <AuthProvider authConfig={authConfig}>
        <Content />
      </AuthProvider>
    ) : (
      <Content />
    )}
  </React.StrictMode>
)
