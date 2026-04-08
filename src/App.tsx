import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import GenrePage from './pages/GenrePage'
import ArtistPage from './pages/ArtistPage'
import SearchPage from './pages/SearchPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/genre:/id" element={<GenrePage />} />
      <Route path="/artist/:id" element={<ArtistPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  )
}

export default App
