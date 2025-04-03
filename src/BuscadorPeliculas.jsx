import React, { useState } from 'react'
import { Spinner } from './componente/Spinner';
import { GrupoTarjetas } from './componente/GrupoTarjetas';

export const BuscadorPeliculas = () => {

    const urlBase = 'https://api.themoviedb.org/3';
    const apiKey = import.meta.env.VITE_API_KEY;
    const [buscar, setbuscar] = useState('');
    const [peliculas, setPeliculas] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setbuscar(e.target.value);
        //console.log(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let inputValue = e.target[0].value.trim();
        
        (inputValue.length > 0) ? getMovies() : setMensaje('Debe ingresar un nombre de película para poder buscar');        
    }

    const getMoviesTrailer = async (idMovie) => {
        try {
            const response = await fetch(`${urlBase}/movie/${idMovie}&api_key=${apiKey}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getMovies = async () => {
        let arregloId = []

        try {
            setLoading(true)
            const response = await fetch(`${urlBase}/search/movie?query=${buscar}&api_key=${apiKey}`);
            const data = await response.json();

            console.log(data.results);
            if (data.results.length === 0) setMensaje('No existen películas asociadas a su búsqueda.')
            arregloId = data.results.map(pelicula => pelicula.id)
            console.log(arregloId);
            setPeliculas(data.results);
            setLoading(false)

        } catch (error) {
            console.log(error);
            setMensaje(error)
            setLoading(false)            
        }
    }

  return (
    <div className="container">
        <h1 className="h1 my-5">Search Movies 🎥</h1>
        <form className="d-flex justify-content-center gap-3 mb-5" onSubmit={handleSearch}>
            <input 
                type="text"
                className="form-control"
                placeholder="Buscar película..."
                value={buscar}
                onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-dark">Search</button>
        </form>
        {
            loading && (
                <Spinner />
            )
        }
        <GrupoTarjetas peliculas={peliculas} mensaje={mensaje} />
        
    </div>
  )
}
