// genre type

// genre type
import type { Artist } from './artist.ts'

export type Genre = {
    genre_id: number,
    genre_name: string,
    genre_picture: URL,
    genre_artists: Artist[]
}