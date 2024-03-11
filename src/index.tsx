import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { AuthContext, AuthProvider, IAuthContext } from 'react-oauth2-code-pkce'
import App from './App'

import 'react-toastify/dist/ReactToastify.css'

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
}

const ContentWithAuth = () => {
  const { loginInProgress, token } = useContext<IAuthContext>(AuthContext)
  if (loginInProgress || !token) return <></>
  return <App />
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    {authEnabled ? (
      <AuthProvider authConfig={authConfig}>
        <ContentWithAuth />
      </AuthProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>
)
