import type { NowPlaying } from '../types/nowplaying'
import type { Track } from '../types/track'

export type PlayerAction =
  | { type: 'PLAY'; track: Track }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'STOP' }
  | { type: 'SKIP' }
  | { type: 'ADD_TO_QUEUE'; track: Track }

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
        case 'SKIP':
            return { current_track: state.queue.length ? state.queue[0] : null, is_playing: true, queue: state.queue.slice(1)}
        case 'ADD_TO_QUEUE':
            return {...state, queue:[...state.queue, action.track]}
        default:
            return state
    }
}

export default playerReducer;