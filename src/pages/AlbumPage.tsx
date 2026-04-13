import type { Album } from '../types/album'
import type { Track } from "../types/track"
import TrackItem from '../components/TrackItem'
import { useParams, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useCallback, useContext } from 'react'
import PlayerContext from '../context/PlayerContext'
import styles from '../styles/AlbumPage.module.css'


function AlbumPage() {
    const { id } = useParams()
    const album_response = useFetch<Album>(`/album/${id}`)
    const navigate = useNavigate()

    const context = useContext(PlayerContext)
    const dispatch = context?.dispatch

    const handleClick = useCallback((data: Track) => {
        if (!dispatch) return
        dispatch({ type: 'PLAY', track: data })
    }, [dispatch])

    if (album_response.status === "loading") {
        return <div className={styles.loading}>Loading album...</div>
    } else if (album_response.status === "error") {
        return <div className={styles.error}>Error: {album_response.message}</div>
    } else if (album_response.status === "success") {
        const album = album_response.data
        return (
            <div className={styles.page}>
                <div className={styles.nav}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
                </div>
                <div className={styles.hero}>
                    {album.cover && (
                        <img className={styles.albumCover} src={album.cover} alt={album.title} />
                    )}
                    <div className={styles.albumInfo}>
                        <h1 className={styles.albumTitle}>{album.title}</h1>
                        {album.artist && (
                            <div className={styles.albumSub}>{album.artist.name}</div>
                        )}
                    </div>
                </div>
                {/* <h2 className={styles.tracksHeading}>Tracks</h2> */}
                <div className={styles.trackList}>
                    {album.tracks.data.map(data =>
                        <TrackItem key={data.id} track={data} onPlay={handleClick} />
                    )}
                </div>
            </div>
        )
    }
}

export default AlbumPage
