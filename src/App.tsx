import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import GenrePage from './pages/GenrePage'
import ArtistPage from './pages/ArtistPage'
import SearchPage from './pages/SearchPage'
import SearchBar from './components/SearchBar'
import { useReducer } from 'react'
import playerReducer from './reducers/playerReducer'
import PlayerContext from './context/PlayerContext'
import PlayerBar from './components/PlayerBar'

function App() {
  const [playerState, dispatch] = useReducer(playerReducer, 
    { current_track: null,
      is_playing: false,
      queue: []
    })

  return (
    <PlayerContext.Provider value={{ playerState, dispatch }}>
      <div>
        <SearchBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:id" element={<GenrePage />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <PlayerBar />
  </PlayerContext.Provider>
  )
}

export default App
