import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

//import './index.css'
import "./styles/HomePage.css";
import './styles/Header.css'
import './styles/Teamcard.css'
import './styles/SearchBar.css'
import './styles/writeButton.css'
import './styles/Paging.css'
import './styles/BoardList.css'
import './styles/BoardRegister.css'
import './styles/Modify.css'
import './styles/Delete.css'
import './styles/join.css'
import './styles/login.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)