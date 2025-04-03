import React from 'react'
import imagenNoDisponibleVideo from '../assets/no_disponible_video.png'

export const Modal = ({show, close, urlVideo}) => {
    
    if (!show) return;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Watch Trailer</h5>
                    <button type="button" className="btn-close" onClick={close}></button>
                </div>
                <div className="modal-body">
                    {
                        urlVideo !== 'no tiene video' ? (
                            <iframe
                                width="100%"
                                height="500"
                                src={`${urlVideo}`}
                                title="Video"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="text-center">
                                <img src={imagenNoDisponibleVideo} maxWidth="100px" alt="No hay video disponible." />                                
                                <p className="text-danger mt-3">No hay video disponible.</p>
                            </div>
                        )}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={close}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>

  )
}
