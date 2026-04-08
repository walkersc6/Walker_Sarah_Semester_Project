import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import GenrePage from './pages/GenrePage'
import ArtistPage from './pages/ArtistPage'
import SearchPage from './pages/SearchPage'
import SearchBar from './components/SearchBar'

function App() {

  return (
    <>
      <div>
        <SearchBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:id" element={<GenrePage />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
  </>
  )
}

export default App
