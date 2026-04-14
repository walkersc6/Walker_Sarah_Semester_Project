# Project Description

Samplr is a react and typescript application that allows users to sample different songs based on genre, artist, and album. Users can add songs to a queue and pause songs that are currently playing. Disclaimer: only 30 seconds of the song will play. That is a limitation from the API.

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

In addition to users being able to browse different artists and albums, I added a player bar and a queue. A user can click the play button of any track and listen to a sample of it (if it is available). They can add songs to a queue and skip through them. The player bar and queue stay consistent throughout the pages.

# AI Usage

I used Claude as a mentor. I asked it to help me think of what needed to happen and to not generate code for me. I did use Claude Code for the styling. In addition to creating many styling sheets, Claude Code created TrackItem.tsx. Anything else I wrote with guidance from Claude
