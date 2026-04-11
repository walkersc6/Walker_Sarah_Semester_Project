import { useParams, useNavigate } from 'react-router-dom'
import { useCallback, useContext } from 'react'
import { useFetch } from "../hooks/useFetch"
import type { Track } from "../types/track"
import type { Artist } from "../types/artist"
import PlayerContext from '../context/PlayerContext'
import TrackItem from '../components/TrackItem'
import styles from './ArtistPage.module.css'

function ArtistPage() {
    const { id } = useParams()
    const artist_state = useFetch<Artist>(`/artist/${id}`)
    const track_state = useFetch<{ data: Track[] }>(`/artist/${id}/top`)
    const navigate = useNavigate()

    const context = useContext(PlayerContext)
    const dispatch = context?.dispatch

    const handleClick = useCallback((data: Track) => {
        if (!dispatch) return
        dispatch({ type: 'PLAY', track: data })
    }, [dispatch])

    if (!context) return null;

    if (artist_state.status === "loading" || track_state.status === "loading") {
        return <div className={styles.loading}>Loading...</div>
    } else if (artist_state.status === "error" || track_state.status === "error") {
        const error = artist_state.status === "error"
            ? artist_state.message
            : track_state.status === "error"
                ? track_state.message
                : "Unknown error"
        return <div className={styles.error}>Error: {error}</div>
    } else if (artist_state.status === "success" && track_state.status === "success") {
        return (
            <div className={styles.page}>
                <div className={styles.nav}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
                </div>

                <div className={styles.hero}>
                    <img
                        src={artist_state.data.picture}
                        alt={artist_state.data.name}
                        className={styles.artistImage}
                    />
                    <div className={styles.artistInfo}>
                        <h2 className={styles.artistName}>{artist_state.data.name}</h2>
                        <div className={styles.artistSub}>Top Tracks</div>
                    </div>
                </div>

                <h3 className={styles.tracksHeading}>Top Tracks</h3>
                <div className={styles.trackList}>
                    {track_state.data.data.map(data =>
                        <TrackItem key={data.id} track={data} onPlay={handleClick} />
                    )}
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default ArtistPage
