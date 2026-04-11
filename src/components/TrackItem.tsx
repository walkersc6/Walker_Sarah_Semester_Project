// helps keep track of which item is playing
import { memo } from 'react'
import type { Track } from '../types/track'

interface TrackItemProps {
    track: Track
    onPlay: (track: Track) => void
}

const TrackItem = memo(function TrackItem({ track, onPlay }: TrackItemProps) {
    return (
        <div>
            {track.title}
            <br />
            {track.duration}
            <br />
            <button onClick={() => onPlay(track)}>|7</button>
        </div>
    )
})

export default TrackItem