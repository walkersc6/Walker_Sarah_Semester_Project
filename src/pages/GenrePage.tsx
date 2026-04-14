import { useParams, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import type { Artist } from "../types/artist"
import styles from '../styles/GenrePage.module.css'

function GenrePage() {
    const { id } = useParams()
    const genre_state = useFetch<{ data: Artist[] }>(`/genre/${id}/artists`)
    const navigate = useNavigate()

    if (genre_state.status === "loading") {
        return <Spinner />
    } else if (genre_state.status === "error") {
        return <div className={styles.error}>Error: {genre_state.message}</div>
    } else if (genre_state.status === "success") {
        return (
            <div className={styles.page}>
                <div className={styles.nav}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
                    <h2 className={styles.heading}>Artists</h2>
                </div>
                <div className={styles.grid}>
                    {genre_state.data.data.map(data =>
                        <div key={data.id} className={styles.card} onClick={() => navigate(`/artist/${data.id}`)}>
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

export default GenrePage
