// artist page displays the artist name, top songs, and albums
// Claude: generated carousel

import { useParams, useNavigate } from 'react-router-dom'
import { useCallback, useContext, useRef, useState, useEffect } from 'react'
import { useFetch } from "../hooks/useFetch"
import type { Track } from "../types/track"
import type { Artist } from "../types/artist"
import type { Album } from "../types/album"
import Spinner from '../components/Spinner'
import PlayerContext from '../context/PlayerContext'
import TrackItem from '../components/TrackItem'
import styles from '../styles/ArtistPage.module.css'

function ArtistPage() {
    const { id } = useParams()
    const artist_state = useFetch<Artist>(`/artist/${id}`)
    const track_state = useFetch<{ data: Track[] }>(`/artist/${id}/top`)
    const album_response = useFetch<{data: Album[]}>(`/artist/${id}/albums`)
    const navigate = useNavigate()

    const context = useContext(PlayerContext)
    const dispatch = context?.dispatch
    const carouselRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const updateScrollButtons = useCallback(() => {
        const el = carouselRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 0)
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
    }, [])

    useEffect(() => {
        if (album_response.status === 'success') updateScrollButtons()
    }, [album_response.status, updateScrollButtons])

    const scrollLeft = () => carouselRef.current?.scrollBy({ left: -330, behavior: 'smooth' })
    const scrollRight = () => carouselRef.current?.scrollBy({ left: 330, behavior: 'smooth' })

    const handleClick = useCallback((data: Track) => {
        if (!dispatch) return
        dispatch({ type: 'PLAY', track: data })
    }, [dispatch])

    const handleAddToQueue = useCallback((data: Track) => {
        if (!dispatch) return
        dispatch({ type: 'ADD_TO_QUEUE', track: data})
    }, [dispatch])

    if (!context) return null;

    if (artist_state.status === "loading" || track_state.status === "loading" || album_response.status === "loading") {
        return <Spinner />
    } else if (artist_state.status === "error" || track_state.status === "error" || album_response.status === "error") {
        const error = artist_state.status === "error"
            ? artist_state.message
            : track_state.status === "error"
                ? track_state.message
                : album_response.status === "error" 
                    ? album_response.message 
                    : "Unknown error"
        return <div className={styles.error}>Error: {error}</div>
    } else if (artist_state.status === "success" && track_state.status === "success" && album_response.status === "success") {
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
                        <TrackItem key={data.id} track={data} onPlay={handleClick} onAddToQueue={handleAddToQueue}/>
                    )}
                </div>

                <div className={styles.albumsSection}>
                    <h3 className={styles.albumsHeading}>Albums</h3>
                    <div className={styles.carouselWrapper}>
                        {album_response.data.data.length >= 7 && (
                            <button className={styles.carouselArrowLeft} onClick={scrollLeft} disabled={!canScrollLeft}>&#8249;</button>
                        )}
                        <div className={styles.carousel} ref={carouselRef} onScroll={updateScrollButtons}>
                            {album_response.data.data.map(data =>
                                <div key={data.id} className={styles.albumCard} onClick={() => navigate(`/album/${data.id}`)}>
                                    <img src={data.cover} alt={data.title} className={styles.albumCover} />
                                    <div className={styles.albumName}>{data.title}</div>
                                </div>
                            )}
                        </div>
                        {album_response.data.data.length >= 7 && (
                            <button className={styles.carouselArrowRight} onClick={scrollRight} disabled={!canScrollRight}>&#8250;</button>
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default ArtistPage
