// genre page
// page user is taken to when they click on a genre
import { useParams, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import type { Artist } from "../types/artist"

function GenrePage() {
    
    const { id } = useParams()
    const genre_state = useFetch<{ data: Artist[]}>(`/genre/${id}/artists`)
    const navigate = useNavigate()

    if (genre_state.status === "loading") {
        return <div>Loading...</div>
    } else if (genre_state.status === "error") {
        return <div>Error: {genre_state.message}</div>
    } else if (genre_state.status === "success") {
        
        return (<div>
                Success! 
                <div>
                    {genre_state.data.data.map( data => 
                        <div key = {data.id} onClick={() => navigate(`/artist/${data.id}`)}>
                            {/* console.log(data) */}
                            {data.name}
                            <img src = {data.picture}></img>
                        </div>)}
                </div>
                
            </div>)
    } else {
        return null
    }
}


export default GenrePage