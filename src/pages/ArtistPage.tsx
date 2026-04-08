// artist page
// displays tracks and albums of artists
import { useParams } from 'react-router-dom'
import { useFetch } from "../hooks/useFetch"
import type { Track } from "../types/track"
import type { Artist } from "../types/artist"
// import type { Album } from "../types/album"



function ArtistPage () {

    const { id } = useParams()
    const artist_state = useFetch< Artist >(`/artist/${id}`)
    const track_state = useFetch<{ data: Track[]}>(`/artist/${id}/top`)
    // const album_state = useFetch<{ data: Album[]}>(``)
    // const navigate = useNavigate()

    if (artist_state.status === "loading" || track_state.status === "loading") {
        return <div>Loading...</div>
    } else if (artist_state.status === "error" || track_state.status === "error") {
        let error = ""
        if (artist_state.status === "error") {
            error = artist_state.message
        } else if (track_state.status === "error" ){
            error = track_state.message
        } else {
            error = "Error in code"
        }
         
        return <div>Error: {error}</div>
    } else if (artist_state.status === "success" && track_state.status === "success") {
        
        return (<div>
                Success! 
                {/* display artist name and picture */}
                <div>
                    <h2>{artist_state.data.name}</h2>
                    <img src = {artist_state.data.picture}></img>
                </div>

                {/* display top tracks */}
                <div>
                    {track_state.data.data.map( data => 
                        <div key = {data.id}>
                            {/* console.log(data) */}
                            {data.title}
                            <br />
                            {data.duration}
                            <br />
                        </div>)}
                </div>

                {/* display albums */}
                
            </div>)
    } else {
        return null
    }
}


export default ArtistPage 