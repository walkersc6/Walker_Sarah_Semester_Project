// search bar component

import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [query, setQuery] = useState<string>("");
    const navigate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        navigate(`/search?q=${query}`)
    }

    return (
        <div>
            <form>
                <input type="text" value={query} onChange={handleChange}>
                </input>
                <button type="submit" onClick={handleSearch}>Search</button>
            </form>
        </div>
    )

}

export default SearchBar;