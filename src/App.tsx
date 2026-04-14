import './App.css'
import styles from './App.module.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/HomePage'
import GenrePage from './pages/GenrePage'
import ArtistPage from './pages/ArtistPage'
import SearchPage from './pages/SearchPage'
import SearchBar from './components/SearchBar'
import { useReducer } from 'react'
import playerReducer from './reducers/playerReducer'
import PlayerContext from './context/PlayerContext'
import PlayerBar from './components/PlayerBar'
import AlbumPage from './pages/AlbumPage'

function App() {
  const [playerState, dispatch] = useReducer(playerReducer,
    { current_track: null,
      is_playing: false,
      queue: []
    })

  const navigate = useNavigate()

  return (
    <PlayerContext.Provider value={{ playerState, dispatch }}>
      <div className={styles.app}>
        <header className={styles.header}>
          <div className={styles.brand} onClick={() => navigate('/')}>
            <span className={styles.brandName}>♫ Samplr</span>
            <span className={styles.brandSub}>Music Discovery</span>
          </div>
          <SearchBar />
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/genre/:id" element={<GenrePage />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
        <PlayerBar />
      </div>
    </PlayerContext.Provider>
  )
}

export default App
