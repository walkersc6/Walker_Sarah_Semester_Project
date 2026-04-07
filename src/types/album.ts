// album type

import type { Artist } from './artist.ts'
import type { Track } from './track.ts'

export type Album = {
    album_id: number;
    album_title: string;
    album_cover: URL;
    album_genre_id: number;
    album_duration: number;
    album_release_date: Date;
    album_record_type: string;
    album_tracks: Track[];
    album_artist: Artist
}