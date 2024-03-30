import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { Auth0Provider } from '@auth0/auth0-react'

const audience = process.env.REACT_APP_AUTH_USER_AUDIENCE
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
    clientId={process.env.REACT_APP_AUTH0_CLIENTID as string}
    authorizationParams={{
      audience,
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
)
