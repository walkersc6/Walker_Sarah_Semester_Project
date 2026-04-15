import type { Genre } from "../types/genre.ts"
import { useFetch } from "../hooks/useFetch.ts"
import { useNavigate } from "react-router-dom"
import Spinner from '../components/Spinner'
import styles from '../styles/HomePage.module.css'

function Home() {
    const genre_response = useFetch<{ data: Genre[] }>("/genre")
    const navigate = useNavigate()

    if (genre_response.status === "loading") {
        return <Spinner />
    } else if (genre_response.status === "error") {
        return <div className={styles.error}>Error: {genre_response.message}</div>
    } else if (genre_response.status === "success") {
        return (
            <div className={styles.page}>
                <h1 className={styles.heading}>Browse by Genre</h1>
                <div className={styles.grid}>
                    {genre_response.data.data.map(data =>
                        <div key={data.id} className={styles.card} onClick={() => navigate(`/genre/${data.id}`)}>
                            <img 
                                className={styles.cardImage}
                                src={data.name === "Reggaeton" 
                                    ? "/reggae.jpg" 
                                    : data.name === "All" 
                                        ? "all.png"
                                        : data.picture} 
                                alt={data.name}
                            />
                            <div className={styles.cardName}>{data.name}</div>
                        </div>
                    )}
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Home
