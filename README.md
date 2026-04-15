# Project Description

Samplr is a react and typescript application that allows users to sample different songs based on genre, artist, and album. Users can add songs to a queue and pause songs that are currently playing. You cannot play or add a song to the queue if it contains explicit lyrics, doesn't have a preview, or is marked unreadable. Disclaimer: only 30 seconds of the song will play. That is a limitation from the API.

# Instructions to run

You can access the app with this link: https://walker-sarah-semester-project.vercel.app/

To run this project locally:

1. Install Node.js if you do not have it installed already
2. Clone the repository
3. In the terminal, navigate to the project root folder Walker_Sarah_Semester_Project
4. npm install
5. Install the Vercel CLI: npm install -g vercel
6. Then you can run the application: vercel dev

# APIS and Data

I used the Deezer API. To avoid CORS problems, I created an api/deezer.ts file to act as proxy that my application could call, and then the proxy calls the Deezer server.

Calls and Returns:

- HomePage: /genre returns a data object that contains an array of genre objects
- GenrePage: /genre/id/artists returns a data object that contains an array of artist objects
- ArtistPage:
  - /artist/:id returns an Artist object
  - /artist/:id/top returns a data object that contains an array of top track objects
  - /artist/:id/albums returns a data objects that contains an array of album objects
- AlbumPage: /album/:id returns an album object
- SearchPage: /search/artist?q=:query returns a data object that contains an array of artist objects

One flaw I encountered is that the genre/id/artist call returned the same list of artists each time

# Additional Features

In addition to users being able to browse different artists and albums, I added a player bar and a queue. A user can click the play button of any track and listen to a sample of it (if it is available). They can add songs to a queue and skip through them. The player bar and queue stay consistent throughout the pages.I also created a custom hook called useFetch. It handles API requests and returns a typed AsyncState<T> object so components can easily render loading, error, and success states.

# Animations

I added animation for the player bar so it will slide in when a song is playing and will slide down when the queue is empty and the song has ended. There is also a harder to notice crossfade between album artworks with the song switches.

# AI Usage

I used Claude as a mentor. I asked it to help me think of what needed to happen and to not generate code for me. I did use Claude Code for the styling. In addition to creating many styling sheets, Claude Code created TrackItem.tsx (without me asking) as well as add animations. Anything else I wrote with guidance from Claude.

# Future Additions

Liddle's Law is that you are never done with programming. In the future, I would like to add a playlist feature where a user can create playlists, add songs, and play that playlist. Having a shuffle feature on albums, artists, or playlists would be cool. I'd like to dust of my machine learning skills and figure out how to create an algorithm that suggest songs based on songs in a playlist or albums similar to the album the user clicks on.

# Photo Disclaimer

Some of the photos from the api aren't the most appropriate, so I tried changing some of them. However, the api refreshes its data every day and I can't guarantee that something wild won't pop up. I for sure have made Taylor Swift a safe artist to look at.
