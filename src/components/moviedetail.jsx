import React from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
    const { id } = useParams()
    const [movie, setMovie] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    console.log(movie)

    async function fetchMovie() {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=08d3b8b7c6dccd46c1aa059858e48e19&append_to_response=credits`)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await res.json()
            setMovie(data)
        } catch (error) {
            setError('Failed to fetch movie data')
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        fetchMovie()
    }, [id])

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {movie && <div className="movie-detail">
                <h1>{movie.title}</h1>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `${import.meta.env.BASE_URL}/image.png`} alt={movie.title} />
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
                <h2>Overview</h2>
                <p>{movie.overview}</p>
                <h2>Cast</h2>
                <ul>
                    {movie.credits.cast.map(cast => (
                        <li key={cast.cast_id}>{cast.name} as {cast.character}</li>
                    ))}
                </ul>
                <h2>Crew</h2>
                <ul>
                    {movie.credits.crew.map(crew => (
                        <li key={crew.credit_id}>{crew.name} - {crew.job}</li>
                    ))}
                </ul>
            </div>}
        </div>
    )
}