import React, { useState, useEffect} from 'react'
import imagenNoDisponible from '../assets/no_disponible.png'
import { Modal } from './Modal';

export const GrupoTarjetas = ({peliculas, mensaje}) => {
    const urlBase = 'https://api.themoviedb.org/3';
    const token = import.meta.env.VITE_TOKEN;
    const [baseUrlWatch, setBaseUrlWatch] = useState(null);
    const [showModal, setShowModal] = useState(false);
    let urlVideo = '';
    
    const getTrailer = async (idPelicula) => {
        
        try {
            const response = await fetch(`${urlBase}/movie/${idPelicula}/videos`, {
                headers: { "Authorization": `Bearer ${token}`,
                           "Content-Type": "application/json" }
            });
            const data = await response.json();
            
            if (data?.results[0]) {
                if (data.results[0].site === 'YouTube') return setBaseUrlWatch(`https://www.youtube.com/embed/${data.results[0].key}`);
            } else {
                setBaseUrlWatch('no tiene video')
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleWatchTrailer = (idPelicula) => {
        urlVideo = getTrailer(idPelicula);
        setShowModal(true);   
            
    }

    const close = () => {
        setShowModal(false)
    }
    
  return (
    <>
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
                                            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} 
                                                className="card-img-top"
                                                
                                                alt={pelicula.title} />
                                            )
                                }
                                <div className="card-body">
                                    <h5 className="card-title">{pelicula.title}</h5>
                                    <p className="card-text">{pelicula.overview ? pelicula.overview : 'Reseña no disponible'}</p>
                                    <p className="card-text fw-bolder">Publicado: {pelicula.release_date}</p>
                                    <p className="card-text fw-bolder">Puntación de usuarios: {parseFloat(pelicula.vote_average).toFixed(1)} ⭐</p>
                                    <p className="card-text fw-bolder">Cantidad de votos: {pelicula.vote_count}</p>
                                    <button type="button" className="btn btn-dark" onClick={() => {handleWatchTrailer(pelicula.id)}}>Watch Trailer</button>
                                </div>
                            </div>
                        </div>
                        ))                        
                        ) : (
                            <p className='lead text-danger'>{mensaje}</p>
                            )
                }
        </div>
        {
            baseUrlWatch && (
                <Modal show={showModal} close={close} urlVideo={baseUrlWatch}/>
            )
        }
        
    </>
  )
}
