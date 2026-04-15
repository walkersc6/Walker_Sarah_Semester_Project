import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFetch } from "../hooks/useFetch"
import type { Artist } from "../types/artist"
import Spinner from '../components/Spinner'
import styles from '../styles/SearchPage.module.css'

function SearchPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = searchParams.get('q')
    const search_response = useFetch<{ data: Artist[] }>(query ? `/search/artist?q=${query}` : null)

    if (search_response.status === "loading") {
        return <Spinner />
    } else if (search_response.status === "error") {
        return <div className={styles.error}>Error: {search_response.message}</div>
    } else if (search_response.status === "success") {
        return (
            <div className={styles.page}>
                <h2 className={styles.heading}>
                    Results for <span className={styles.highlight}>"{query}"</span>
                </h2>
                <div className={styles.grid}>
                    {search_response.data.data.map(data =>
                        <div key={data.id} className={styles.card} onClick={() => navigate(`/artist/${data.id}`)}>
                            <img 
                                className={styles.cardImage}
                                src={data.name === "Taylor Swift" 
                                    ? "/backup_taylor.jpg" 
                                    : data.name === "Megan Thee Stallion" 
                                        ? "stallion.jpg" 
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
