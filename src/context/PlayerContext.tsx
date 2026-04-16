import { createContext } from 'react'
import type { NowPlaying } from '../types/nowplaying'
import type { PlayerAction } from '../reducers/playerReducer'

type PlayerContextType = {
    playerState: NowPlaying
    dispatch: (action: PlayerAction) => void
}

// null default requires consumers to check for context before using it
const PlayerContext = createContext<PlayerContextType | null>(null)

export default PlayerContext;