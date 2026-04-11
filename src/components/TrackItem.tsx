import { memo } from 'react'
import type { Track } from '../types/track'
import styles from './TrackItem.module.css'

interface TrackItemProps {
    track: Track
    onPlay: (track: Track) => void
}

function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
}

const TrackItem = memo(function TrackItem({ track, onPlay }: TrackItemProps) {
    return (
        <div className={styles.row}>
            <button className={styles.playButton} onClick={() => onPlay(track)}>▶</button>
            <span className={styles.title}>{track.title}</span>
            <span className={styles.duration}>{formatDuration(track.duration)}</span>
        </div>
    )
})

export default TrackItem
