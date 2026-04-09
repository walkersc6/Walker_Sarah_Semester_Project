// displays the song that is currently playing

// need a default for when no song is playing

import { useContext } from 'react'
import PlayerContext from '../context/PlayerContext'

function PlayerBar() {
    const context = useContext(PlayerContext);

    // check to see if context is null
    if (!context) {
        return null;
    }

    const { playerState, dispatch } = context;
    const handleClick = () => {
        if (playerState.is_playing) {
            dispatch({ type: 'PAUSE' })
        } else {
            dispatch({ type: 'RESUME' })
        }
    }
    
    return (
        <div>
            {playerState.current_track?.title}
            <br />
            {playerState.current_track?.artist?.name}
            <br />
            <img src={playerState.current_track?.album.cover} />
            <br />
            <button onClick={handleClick}>{playerState.is_playing ? 'Pause' : 'Play'} </button>
            

        </div>
    )

}

export default PlayerBar;