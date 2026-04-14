import { useContext, useEffect, useRef } from 'react'
import PlayerContext from '../context/PlayerContext'
import styles from '../styles/PlayerBar.module.css'

function PlayerBar() {
    const context = useContext(PlayerContext);
    const audioRef = useRef<HTMLAudioElement>(null);
    const playerState = context?.playerState

    useEffect(() => {
        if (playerState?.is_playing) {
            audioRef.current?.play()
        } else {
            audioRef.current?.pause()
        }
    }, [playerState?.is_playing, playerState?.current_track])

    if (!context) return null;

    const { dispatch } = context;

    const handleClick = () => {
        if (playerState?.is_playing) {
            dispatch({ type: 'PAUSE' })
        } else {
            dispatch({ type: 'RESUME' })
        }
    }

    const handleSkip = () => {
        setTimeout(() => { dispatch({ type: 'SKIP'}) }, 1500)
        
    }

    return (
        <div className={`${styles.bar} ${playerState?.current_track ? '' : styles.barHidden}`}>
            {playerState?.current_track ? (
                <>
                    {playerState.current_track.album?.cover
                        ? <img
                            key={playerState.current_track.id}
                            className={styles.albumArt}
                            src={playerState.current_track.album.cover}
                            alt="album art"
                          />
                        : <div key={playerState.current_track.id} className={styles.albumArtPlaceholder}>♪</div>
                    }
                    <div className={styles.trackInfo}>
                        <div className={styles.trackTitle}>{playerState.current_track.title}</div>
                        <div className={styles.artistName}>{playerState.current_track.artist?.name}</div>
                    </div>
                    <div className={styles.controls}>
                        <button className={styles.playButton} onClick={handleClick}>
                            {playerState.is_playing ? '⏸' : '▶'}
                        </button>
                        <button className={styles.skipButton} disabled={playerState.queue.length == 0} onClick={handleSkip}>⏭</button>
                    </div>
                </>
            ) : (
                <div className={styles.idle}>
                    <span className={styles.idleIcon}>🎵</span>
                    Drop the needle — pick a track to play
                </div>
            )}
            <audio ref={audioRef} src={playerState?.current_track?.preview} onEnded={handleSkip} />
        </div>
    )
}

export default PlayerBar;
