import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFetch } from "../hooks/useFetch"
import type { Artist } from "../types/artist"
import Spinner from '../components/Spinner'
import styles from '../styles/SearchPage.module.css'

function SearchPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = searchParams.get('q')
    // null path prevents useFetch from firing if there is no query
    const search_response = useFetch<{ data: Artist[] }>(query ? `/search/artist?q=${query}` : null)

    if (search_response.status === "loading") {
        return <Spinner />
    } else if (search_response.status === "error") {
        return <div className={styles.error}>Error: {search_response.message}</div>
    } else if (search_response.status === "success") {
        return (
            <div className={styles.page}>
                <nav className={styles.nav}>
                    <div className={styles.navRow}>
                        <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
                        <span className={styles.resultsLabel}>Results for</span>
                    </div>
                    <h2 className={styles.heading}>
                        <span className={`${styles.highlight} ${styles.queryWrapper}`}>
                            <span className={styles.query}>"{query}</span>"
                        </span>
                    </h2>
                </nav>
                <div className={styles.grid}>
                    {search_response.data.data.map(data =>
                        <div key={data.id} className={styles.card} onClick={() => navigate(`/artist/${data.id}`)}>
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
                        </div>
                    )}
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default SearchPage
