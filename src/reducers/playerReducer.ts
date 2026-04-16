import type { NowPlaying } from '../types/nowplaying'
import type { Track } from '../types/track'

export type PlayerAction =
    | { type: 'PLAY'; track: Track }
    | { type: 'PAUSE' }
    | { type: 'RESUME' }
    | { type: 'SKIP' }
    | { type: 'ADD_TO_QUEUE'; track: Track }
    | { type: 'CLEAR_NOTIFICATION'} // removes toast notification about song added to queue

function playerReducer(state: NowPlaying, action: PlayerAction): NowPlaying {
    switch (action.type) {
        case 'PLAY':
            return {
                current_track: action.track,
                is_playing: true,
                queue: state.queue,
                just_added: false
            }
        case 'PAUSE':
            return { ...state, is_playing: false }
        case 'RESUME':
            return { ...state, is_playing: true }
        case 'SKIP':
            return { 
                current_track: state.queue.length ? state.queue[0] : null, 
                is_playing: state.queue.length ? true: false, 
                queue: state.queue.slice(1),
                just_added: false
            }
        case 'ADD_TO_QUEUE':
            return {...state, queue:[...state.queue, action.track], just_added: true}
        case 'CLEAR_NOTIFICATION':
            return {...state, just_added: false}
        default:
            return state
    }
}

export default playerReducer;