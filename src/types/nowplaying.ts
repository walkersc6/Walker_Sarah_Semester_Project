// NowPlaying type that hold info about the song that is currently playing

import type { Track } from './track.ts'

export type NowPlaying = {
    current_track: Track | null;
    is_playing: boolean;
    queue: Track[];
    just_added: boolean; // if just added to the queue, the user will be notified that the adding worked
}