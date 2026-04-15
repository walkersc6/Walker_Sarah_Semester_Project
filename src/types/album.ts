// album type

import type { Artist } from './artist.ts'
import type { Track } from './track.ts'

export type Album = {
    id: number;
    title: string;
    cover: string;
    genres: {
        data: { name: string }[]
    }
    duration: number;
    release_date: string;
    record_type: string;
    tracks: {
        data: Track[]
    }
    artist: Artist
}