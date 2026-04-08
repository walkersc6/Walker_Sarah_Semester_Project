// landing page
// holds search bar, now playing, and genre list


import type { Genre } from "../types/genre.ts"
import { useFetch } from "../hooks/useFetch.ts"
import { useNavigate } from "react-router-dom"

function Home () {

    const genre_state = useFetch<{ data: Genre[] }>("/genre")
    const navigate = useNavigate()

    // narrow to figure out what exactly was returned
    if (genre_state.status === "loading") {
        return <div>Loading...</div>
    } else if (genre_state.status === "error") {
        return <div>Error: {genre_state.message}</div>
    } else if (genre_state.status === "success") {
        
        return (<div>
                Success! 
                <div>
                    {genre_state.data.data.map( data => 
                        <div key = {data.id} onClick={() => navigate(`/genre/${data.id}`)}>
                            {/* console.log(data) */}
                            {data.name}
                            <img src = {data.picture}></img>
                        </div>)}
                </div>
                
            </div>)
    } else {
        return null
    }
    
    // return (
    //     <div>
    //         Home
    //     </div>
    // )
}


export default Home
