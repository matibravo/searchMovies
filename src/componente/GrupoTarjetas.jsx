import React from 'react'
import imagenNoDisponible from '../assets/no_disponible.png'

export const GrupoTarjetas = ({peliculas, mensaje}) => {

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
        {
            peliculas.length > 0 ? (
                peliculas.map(pelicula => (
                    <div key={pelicula.id} className="col">
                        <div className="card">
                            {
                                pelicula.poster_path === null ? (
                                    <img src={imagenNoDisponible} className="card-img-top" alt={pelicula.title} />
                                    ) : (
                                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} className="card-img-top" alt={pelicula.title} />
                                        )
                            }
                            <div className="card-body">
                                <h5 className="card-title">{pelicula.title}</h5>
                                <p className="card-text">{pelicula.overview ? pelicula.overview : 'Reseña no disponible'}</p>
                                <p className="card-text fw-bolder">Publicado: {pelicula.release_date}</p>
                                <p className="card-text fw-bolder">Puntación de usuarios: {parseFloat(pelicula.vote_average).toFixed(1)} ⭐</p>
                                <p className="card-text fw-bolder">Cantidad de votos: {pelicula.vote_count}</p>
                            </div>
                        </div>
                    </div>
                    ))                        
                    ) : (
                        <p className='lead text-danger'>{mensaje}</p>
                        )
            }
    </div>
  )
}
