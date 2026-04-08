// track type
import type { Artist } from './artist.ts'
import type { Album } from './album.ts'

export type Track = {
    track_id: number;
    track_readable: boolean; // is readable in player TODO: if false, disable play button?
    track_title: string;
    track_duration: number;
    track_position: number;
    track_release_date: Date;
    track_preview: string;
    track_artist: Artist;
    track_album: Album;
}