import { createContext } from 'react'
// import  playerReducer  from "../reducers/playerReducer"
import type { NowPlaying } from '../types/nowplaying'
import type { PlayerAction } from '../reducers/playerReducer'

type PlayerContextType = {
    playerState: NowPlaying
    dispatch: (action: PlayerAction) => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export default PlayerContext;