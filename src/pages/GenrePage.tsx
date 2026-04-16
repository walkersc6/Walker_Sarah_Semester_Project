import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import type { Artist } from "../types/artist"
import styles from '../styles/GenrePage.module.css'

function GenrePage() {
    const { id } = useParams()
    const genre_response = useFetch<{ data: Artist[] }>(`/genre/${id}/artists`)
    const navigate = useNavigate()
    const location = useLocation()
    const genre_name = location.state?.name // name is passed by route state from home page

    if (genre_response.status === "loading") {
        return <Spinner />
    } else if (genre_response.status === "error") {
        return <div className={styles.error}>Error: {genre_response.message}</div>
    } else if (genre_response.status === "success") {
        return (
            <div className={styles.page}>
                <nav className={styles.nav}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
                    <h2 className={styles.heading}>Top { !genre_name ? "" : genre_name} Artists</h2>
                </nav>
                <ul className={styles.grid}>
                    {genre_response.data.data.map(data =>
                        <li key={data.id}>
                            <button className={styles.card} onClick={() => navigate(`/artist/${data.id}`)}>
                                <img 
                                    className={styles.cardImage}
                                    src={data.name === "Taylor Swift" 
                                        ? "/backup_taylor.jpg" 
                                        : data.name === "Megan Thee Stallion" 
                                            ? "/stallion.jpg" 
                                            : data.name === "Sabrina Carpenter"
                                                ? "/sabrina.jpg"
                                                : data.name === "SZA"
                                                    ? "/sza.jpg"
                                                    : data.picture} 
                                    alt={data.name}
                                />
                                <div className={styles.cardName}>{data.name}</div>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        )
    } else {
        return null
    }
}

export default GenrePage
