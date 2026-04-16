// This page displays the album details and tracks returned from the album/id api

import type { Album } from '../types/album'
import type { Track } from "../types/track"
import TrackItem from '../components/TrackItem'
import Spinner from '../components/Spinner'
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

    const handleAddToQueue = useCallback((data: Track) => {
        if (!dispatch) return
        dispatch({ type: 'ADD_TO_QUEUE', track: data})// add to queue and display toast
        setTimeout(() => {
            dispatch({type: 'CLEAR_NOTIFICATION'}) // clear away notification after 2 seconds
        }, 2000)
    }, [dispatch])

    if (album_response.status === "loading") {
        return <Spinner />
    } else if (album_response.status === "error") {
        return <div className={styles.error}>Error: {album_response.message}</div>
    } else if (album_response.status === "success") {
        const album = album_response.data
        return (
            <div className={styles.page}>
                <nav className={styles.nav}>
                    {/* go back just one page to prevent a full page reload and preserve audio state */}
                    <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button> 
                </nav>
                <section className={styles.hero} aria-label={album.title}>
                    {album.cover && (
                        <img 
                            className={styles.albumCover} 
                            src={album.title === "The Life of a Showgirl"
                                ? "/green_showgirl.png"
                                : album.title === "The Life of a Showgirl + Acoustic Collection"
                                    ? "/pink_showgirl.png"
                                    : album.title === "The Life of a Showgirl (Track by Track Version)"
                                        ? "/orange_showgirl.png"
                                        : album.title === "THE TORTURED POETS DEPARTMENT"
                                            ? "/ttpd.png"
                                            : album.cover}  
                            alt={album.title} 
                        />
                    )}
                    <div className={styles.albumInfo}>
                        <div className={styles.albumSub}>{album.record_type}</div>
                        <h1 className={styles.albumTitle}>{album.title}</h1>
                        {album.artist && (
                            <div className={styles.albumSub}>
                                {album.artist.name} | {new Date(album.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | {album.genres.data[0].name}
                            </div>
                        )}
                    </div>
                </section>
                <ol className={styles.trackList}>
                    {album.tracks.data.map(data =>
                        <li key={data.id}>
                            <TrackItem track={data} onPlay={handleClick} onAddToQueue={handleAddToQueue} />
                        </li>
                    )}
                </ol>
            </div>
        )
    }
}

export default AlbumPage
