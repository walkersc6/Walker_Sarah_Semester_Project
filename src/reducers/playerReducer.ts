import type { NowPlaying } from '../types/nowplaying'
import type { Track } from '../types/track'

export type PlayerAction =
  | { type: 'PLAY'; track: Track }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'STOP' }

function playerReducer(state: NowPlaying, action: PlayerAction): NowPlaying {
    switch (action.type) {
        case 'PLAY':
            return {
                current_track: action.track,
                is_playing: true,
                queue: state.queue
            }
        case 'PAUSE':
            return { ...state, is_playing: false }
        case 'RESUME':
            return { ...state, is_playing: true }
        case 'STOP':
            return { current_track: null, is_playing: false, queue: [] }
        default:
            return state
    }
}

export default playerReducer;