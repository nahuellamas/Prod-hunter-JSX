import React from 'react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Link from 'next/link';

const Producto = styled.li`
    padding: clamp(1rem, 2.5vw, 4rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`;

const Titulos = styled.div`
    width: 100%;
`;

const DescripcionProducto = styled.div`
    width: 100%;
    flex: 0;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-gap: 2rem;
    margin-top: 2rem;
    justify-content: center;
    justify-items: center;
    align-items: start;
    align-content: center;
`;

const Descripcion = styled.p`
    font-size: clamp(1.5rem, 2.5vw, 2rem);
`;

const Titulo = styled.h1`
    text-transform: uppercase;
    font-size: clamp(1.9rem, 2vw, 5rem);
    color: var(--naranja);
    margin: 0;
    padding: 0;
    font-weight: bold;
    transition: all .5s ease;
    :hover{
        color: var(--gris);
        cursor: pointer;
        transition: all .5s ease;
    }
`;

const Comentarios = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    div{
        display: flex;
        align-items: center;
        border-radius: 5px;
        padding: .2rem .5rem;
        margin-right: 1rem;
    }
    img{
        width: 2rem;
        margin-right: 1rem;
    }
    p{
        padding-left: 0;
        font-size: clamp(1.5rem, 2.5vw, 1.9rem);
        font-weight: bold;
        margin-right: 1rem;
        &:last-of-type{
            margin-right: 0;
        }
    }
`;

const Votos = styled.div`
    flex: 0 0 auto;
    width: auto;
    height: auto;
    text-align: center;
    border: 1px solid var(--naranja);
    border-radius: 100%;
    background-color: var(--naranja);
    padding: 1rem 3rem;
    div{
        font-size: clamp(1.5rem, 2.5vw, 1.9rem);;
    }
    p{
        margin: 0;
        font-size: clamp(1.8rem, 2.5vw, 2.5rem);;
        font-weight: bold;
    }
`;
const Imagen = styled.img`
    width: 100%;
    min-width: 8rem;
    max-width: 250px;
    height: auto;
    border-radius: 5px;
`;

const DetallesProductos = ({producto}) => {
    const {nombre, id, creado, empresa, url, urlImagen, votos, descripcion, comentarios} = producto;
    return ( 
        <Producto>
           <DescripcionProducto>
               <div>
                    {urlImagen === '' ? (
                        <Imagen src="/static/img/logo.png" alt='Sin Imagen' />
                    ) : (
                        <Imagen src={urlImagen} alt={nombre} />
                    )}
               </div>
               <Titulos>
                    <Link href="/productos/[id]" as={`/productos/${id}`}>
                    <Titulo>{nombre}</Titulo>
                    </Link>
                    <Descripcion>{descripcion}</Descripcion>
                    <Comentarios>
                        <div>
                            <img src="/static/img/comentario.png" alt="Comentarios" />
                            <p>{comentarios.length} Comentarios</p>
                        </div>
                    </Comentarios>
                    <Descripcion>Publicado hace: {formatDistanceToNow( new Date(creado), {locale: es})}</Descripcion>
               </Titulos>
               <Votos>
                    <div>&#9650;</div>
                    <p>{votos}</p>
               </Votos>
           </DescripcionProducto>
        </Producto>
     );
}
 
export default DetallesProductos;