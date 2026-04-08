// artist type

import type { Track } from './track.ts'

export type Artist = {
    artist_id: number,
    artist_name: string,
    artist_picture: string,
    artist_number_of_albums: number,
    artist_tracklist: string,
    artist_top_tracks: Track[]
}