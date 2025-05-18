import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyRoutes from './Routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyRoutes />
  </StrictMode>,
)
