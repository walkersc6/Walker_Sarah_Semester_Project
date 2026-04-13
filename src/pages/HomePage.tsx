import type { Genre } from "../types/genre.ts"
import { useFetch } from "../hooks/useFetch.ts"
import { useNavigate } from "react-router-dom"
import styles from '../styles/HomePage.module.css'

function Home() {
    const genre_state = useFetch<{ data: Genre[] }>("/genre")
    const navigate = useNavigate()

    if (genre_state.status === "loading") {
        return <div className={styles.loading}>Loading genres...</div>
    } else if (genre_state.status === "error") {
        return <div className={styles.error}>Error: {genre_state.message}</div>
    } else if (genre_state.status === "success") {
        return (
            <div className={styles.page}>
                <h1 className={styles.heading}>Browse by Genre</h1>
                <div className={styles.grid}>
                    {genre_state.data.data.map(data =>
                        <div key={data.id} className={styles.card} onClick={() => navigate(`/genre/${data.id}`)}>
                            <img src={data.picture} alt={data.name} className={styles.cardImage} />
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
