// artist page
// displays tracks and albums of artists
import { useParams, useNavigate } from 'react-router-dom'
import { useCallback, useContext } from 'react'
import { useFetch } from "../hooks/useFetch"
import type { Track } from "../types/track"
import type { Artist } from "../types/artist"
// import type { Album } from "../types/album"
import PlayerContext from '../context/PlayerContext'
import TrackItem from '../components/TrackItem'


function ArtistPage () {

    const { id } = useParams()
    const artist_state = useFetch< Artist >(`/artist/${id}`)
    const track_state = useFetch<{ data: Track[]}>(`/artist/${id}/top`)
    // const album_state = useFetch<{ data: Album[]}>(``)
    const navigate = useNavigate()
    

    // context for player bar
    const context = useContext(PlayerContext)
    const dispatch = context?.dispatch;   
    
    const handleClick = useCallback((data: Track) => {
        // take into consideration null dispatch
        if (!dispatch) return
        dispatch({type: 'PLAY', track: data})
    }, [dispatch])
    
    if (!context) {
        return null;
    }


    // determine what to display based on status
    if (artist_state.status === "loading" || track_state.status === "loading") {
        return <div>Loading...</div>
    } else if (artist_state.status === "error" || track_state.status === "error") {
        let error = ""
        // print the error message for which has an error
        if (artist_state.status === "error") {
            error = artist_state.message
        } else {
            error = "Error in code"
        }
        if (track_state.status === "error" ){
            error = track_state.message
        } else {
            error = "Error in code"
        }
         
        return <div>Error: {error}</div>
    } else if (artist_state.status === "success" && track_state.status === "success") {
        
        return (<div>
                <button onClick={() => navigate(-1)}>
                    ← Back
                </button>
                Success! 
                {/* display artist name and picture */}
                <div>
                    <h2>{artist_state.data.name}</h2>
                    <img src = {artist_state.data.picture}></img>
                </div>

                {/* display top tracks */}
                <div>
                    {track_state.data.data.map( data => 
                    <TrackItem key={data.id} track={data} onPlay={handleClick} />
                    )}
                </div>

                {/* display albums */}
                
            </div>)
    } else {
        return null
    }
}


export default ArtistPage 