import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FavoritosProvider } from './ProviderContext.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FavoritosProvider>
      <Routes>
        <Route path="/:id?" element={<App />} />
      </Routes>
    </FavoritosProvider>
  </BrowserRouter>
)