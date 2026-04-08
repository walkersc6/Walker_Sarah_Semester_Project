// search page
// shows results of user's search

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFetch } from "../hooks/useFetch"
import type { Artist } from "../types/artist"

function SearchPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = searchParams.get('q')
    const search_response = useFetch<{ data: Artist[] }>(query ? `/search/artist?q=${query}`: null)
    
    if (search_response.status === "loading") {
        return <div>Loading...</div>
    } else if (search_response.status === "error") {
        return <div>Error: {search_response.message}</div>
    } else if (search_response.status === "success") {
        
        return (
            <div>
                Success! 
                <div>
                    {search_response.data.data.map( data => 
                        <div key = {data.id} onClick={() => navigate(`/artist/${data.id}`)}>
                            {/* console.log(data) */}
                            {data.name}
                            <img src = {data.picture}></img>
                        </div>)}
                </div>
                
            </div>
        )
    } else {
        return null
    }

}


export default SearchPage