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
    const artist_response = useFetch<Artist>(`/artist/${id}`)
    const track_response = useFetch<{ data: Track[] }>(`/artist/${id}/top`)
    const album_response = useFetch<{data: Album[]}>(`/artist/${id}/albums`)
    const navigate = useNavigate()

    const context = useContext(PlayerContext)
    const dispatch = context?.dispatch

    // Claude Code: 27-43
    // puts albums into a carousel that is controlled by left and right buttons that are disabled when they reach the start or the end
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
        dispatch({ type: 'ADD_TO_QUEUE', track: data}) // add to queue and display toast
        setTimeout(() => {
            dispatch({type: 'CLEAR_NOTIFICATION'}) // clear away notification after 2 seconds
        }, 2000)
    }, [dispatch])

    if (!context) return null;

    if (artist_response.status === "loading" || track_response.status === "loading" || album_response.status === "loading") {
        return <Spinner />
    } else if (artist_response.status === "error" || track_response.status === "error" || album_response.status === "error") {
        const error = artist_response.status === "error"
            ? artist_response.message
            : track_response.status === "error"
                ? track_response.message
                : album_response.status === "error" 
                    ? album_response.message 
                    : "Unknown error"
        return <div className={styles.error}>Error: {error}</div>
    } else if (artist_response.status === "success" && track_response.status === "success" && album_response.status === "success") {
        return (
            <div className={styles.page}>
                <nav className={styles.nav}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
                </nav>

                <section className={styles.hero} aria-label={artist_response.data.name}>
                    <img
                        className={styles.artistImage}
                        src={artist_response.data.name === "Taylor Swift" 
                            ? "/backup_taylor.jpg"
                            : artist_response.data.name === "Megan Thee Stallion"
                                ? "/stallion.jpg"
                                : artist_response.data.name === "Sabrina Carpenter"
                                    ? "/sabrina.jpg"
                                    : artist_response.data.name === "SZA"
                                        ? "/sza.jpg"
                                        : artist_response.data.picture}
                        alt={artist_response.data.name}
                    />
                    <div className={styles.artistInfo}>
                        <h2 className={styles.artistName}>{artist_response.data.name}</h2>
                        {/* <div className={styles.artistSub}>Top Tracks</div> */}
                    </div>
                </section>

                <h3 className={styles.tracksHeading}>Top Tracks</h3>
                <ul className={styles.trackList}>
                    {track_response.data.data.map(data =>
                        <li key={data.id}>
                            <TrackItem track={data} onPlay={handleClick} onAddToQueue={handleAddToQueue}/>
                        </li>
                    )}
                </ul>

                <div className={styles.albumsSection}>
                    <h3 className={styles.albumsHeading}>Albums</h3>
                    <div className={styles.carouselWrapper}>
                        {album_response.data.data.length >= 7 && (
                            <button className={styles.carouselArrowLeft} onClick={scrollLeft} disabled={!canScrollLeft} aria-label="Scroll left">&#8249;</button>
                        )}
                        <div className={styles.carousel} ref={carouselRef} onScroll={updateScrollButtons}>
                            {album_response.data.data.map(data =>
                                <button key={data.id} className={styles.albumCard} onClick={() => navigate(`/album/${data.id}`)}>
                                    <img 
                                        className={styles.albumCover} 
                                        src={data.title === "The Life of a Showgirl"
                                            ? "/green_showgirl.png"
                                            : data.title === "The Life of a Showgirl + Acoustic Collection"
                                                ? "/pink_showgirl.png"
                                                : data.title === "The Life of a Showgirl (Track by Track Version)"
                                                    ? "/orange_showgirl.png"
                                                    : data.title === "THE TORTURED POETS DEPARTMENT"
                                                        ? "/ttpd.png"
                                                        : data.cover} 
                                        alt={data.title} 
                                    />
                                    <div className={styles.albumName}>{data.title}</div>
                                </button>
                            )}
                        </div>
                        {album_response.data.data.length >= 7 && (
                            <button className={styles.carouselArrowRight} onClick={scrollRight} disabled={!canScrollRight} aria-label="Scroll right">&#8250;</button>
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
