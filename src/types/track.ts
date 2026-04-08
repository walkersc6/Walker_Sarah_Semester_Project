// track type
// import type { Artist } from './artist.ts'
// import type { Album } from './album.ts'

export type Track = {
    id: number;
    readable: boolean; // is readable in player TODO: if false, disable play button?
    title: string;
    duration: number;
    position: number;
    release_date: Date;
    preview: string;
    // artist: Artist;
    // album: Album;
}