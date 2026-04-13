import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from '../styles/SearchBar.module.css'

function SearchBar() {
    const [query, setQuery] = useState<string>("")
    const navigate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault()
        navigate(`/search?q=${query}`)
    }

    return (
        <form className={styles.form} onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search artists..."
                className={styles.input}
            />
            <button type="submit" className={styles.button}>Search</button>
        </form>
    )
}

export default SearchBar
