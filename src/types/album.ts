// album type

// import type { Artist } from './artist.ts'
// import type { Track } from './track.ts'

export type Album = {
    id: number;
    title: string;
    cover: string;
    genre_id: number;
    duration: number;
    release_date: Date;
    record_type: string;
    // album_tracks: Track[];
    // artist: Artist
}