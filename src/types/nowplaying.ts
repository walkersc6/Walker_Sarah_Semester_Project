// NowPlaying type that hold info about the song that is currently playing

import type { Track } from './track.ts'

type NowPlaying = {
    current_track: Track | null;
    is_playing: boolean;
    queue: Track[]
}