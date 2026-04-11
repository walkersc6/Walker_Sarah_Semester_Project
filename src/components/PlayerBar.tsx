// displays the song that is currently playing

// need a default for when no song is playing

import { useContext, useEffect, useRef } from 'react'
import PlayerContext from '../context/PlayerContext'

function PlayerBar() {
    const context = useContext(PlayerContext);
    const audioRef = useRef<HTMLAudioElement>(null);
    // obeys the hook rules and solves chicken and egg problem
    const playerState = context?.playerState

    // changes with track preview to play
    useEffect(() => {
        if (playerState?.is_playing == true) {
            audioRef.current?.play()
        } else {
            audioRef.current?.pause()
        }
    }, [playerState?.is_playing, playerState?.current_track])

    // check to see if context is null
    if (!context) {
        return null;
    }

    const { dispatch } = context;

    const handleClick = () => {
        if (playerState?.is_playing) {
            dispatch({ type: 'PAUSE' })
        } else {
            dispatch({ type: 'RESUME' })
        }
    }
    
    return (
        <div>
            {playerState?.current_track?.title}
            <br />
            {playerState?.current_track?.artist?.name}
            <br />
            <img src={playerState?.current_track?.album.cover} />
            <br />
            <button onClick={handleClick}>{playerState?.is_playing ? 'Pause' : 'Play'} </button>
            <audio ref={audioRef} src = {playerState?.current_track?.preview}></audio>

        </div>
    )

}

export default PlayerBar;