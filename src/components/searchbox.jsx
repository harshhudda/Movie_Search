import React from "react"
import { Link } from "react-router-dom"

export default function SearchBox() {
    const [query, setQuery] = React.useState('')
    const [movies, setMovies] = React.useState([])
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [clicked, setClicked] = React.useState(false)
    const [suggestions, setSuggestions] = React.useState([])

    async function searchMovies(searchquery) {
        setSuggestions([])
        setClicked(false)
        setLoading(true)
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=08d3b8b7c6dccd46c1aa059858e48e19&query=${searchquery}`)
            if (!res.ok){
                throw new Error('Network response was not ok')
            }
            const data = await res.json()
            setMovies(data.results)
        } catch (error) {
            setError("Something went wrong!!!!")
        }
        setLoading(false)
        setClicked(true)
    }

    function suggestionMovie(movie) {
        setQuery(movie.title)
        searchMovies(movie.title)
    }

    async function fetchSuggestions() {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=08d3b8b7c6dccd46c1aa059858e48e19&query=${query}`)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await res.json()
            setSuggestions(data.results)
        } catch (error) {
            setError("Something went wrong")
        }
    }

    // console.log(query)

    return (
        <div className="main-block">
            <div className="search-bar">
                <input
                    type="text"
                    name="search"
                    placeholder="Search For a Movie"
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value)
                        setClicked(false)
                        fetchSuggestions()
                    }}
                    className="search-box"
                />
                <div
                    onClick={() => searchMovies(query)}
                    className="search-btn"
                >
                    Search
                </div>
            </div>
            {true && <div className="suggestions-block">
                {suggestions.map(movie => (
                    <div className="movie-suggestions" key={movie.id} onClick={() => {
                        suggestionMovie(movie)
                    }}>
                        {movie.title}
                    </div>
                ))}
            </div>}
            {loading && <pre className="loading">Loading...</pre>}
            {error && !loading && <div className="error">{error}</div>}
            <div>
                {movies.map(movie => (
                    <div key={movie.id} className="movie">
                        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : `${import.meta.env.BASE_URL}/images.png`} alt={movie.title} />
                        <div className="movie-info">
                            <h2>{movie.title}</h2>
                            <p>Release Year: {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                            <p>{movie.overview}</p>
                            <Link to={`/movie/${movie.id}`}>View More</Link>
                        </div>
                        
                    </div>
                ))}
            </div>
            {clicked && !error && !movies.length && <div className="nomovie">
                    No Movies with matching title
                </div>}
            
        </div>
    )
}

