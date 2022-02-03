import React, {useEffect, useContext, useState} from 'react';
import { useRouter } from "next/router";
import { firebaseContext } from '../../firebase';
import Layout from '../../components/layout/Layout';
import Errror404 from '../../components/layout/404';
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import {Campo, Submmit} from '../../components/UI/FormularioS';
import Button from '../../components/UI/Button';
const Contenedor = styled.div`
    @media (min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const CreadorProducto = styled.p`
    padding: .5rem 1rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
    margin-top: 0;
    border-radius: 5px;
    font-size: 1.5rem;
    vertical-align: middle;
`; 

const Producto = () => {
    // routing para obtener ID actual del producto
    const router = useRouter();
    const { id } = router.query;
    //state del producto de product
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    //state de comentarios
    const [comentario, guardarComentario] = useState({});
    const [consutaDB, guardarConsultaDB] = useState(true); //para que se ejecute la consulta de la base de datos

    //context firebase context
    const { firebase, usuario } = useContext(firebaseContext);

    // useEffect para obtener producto actual
    useEffect(() => {
        // obtenerProducto(id);
        if(id && consutaDB) {
            const obtenerProducto = async () => {
                const productQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productQuery.get();
                if(producto.exists){
                    guardarProducto(producto.data());
                    guardarConsultaDB(false);
                } else {
                    guardarError(true);
                    guardarConsultaDB(false);
                }
            }
            obtenerProducto();
        }
    }, [id]);
    //el producto tarda en cargarse por lo tanto podemos poner un spinner o una imagen de carga
    if(Object.keys(producto).length === 0 && !error) return 'Cargando...';

    const {nombre, creado, creador, empresa, url, urlImagen, votos, descripcion, haVotado, comentarios} = producto;


    //funcion para añadir un voto
    const votarProducto = () => {
        if(!usuario){
            return router.push('/login');
        }
        //obtener y sumar un nuevo voto
        const nuevoVoto = votos + 1;
        //verificamos si el usuario ya voto
        if(haVotado.includes(usuario.uid)){
            return;
        }
        //guardar el id del usuario que voto
        const nuevoHaVotado = [...haVotado, usuario.uid];
        
        //actualizar el producto en la base de datos
        firebase.db.collection('productos').doc(id).update({
            votos: nuevoVoto,
            haVotado: nuevoHaVotado
        });
        //actualizar el state
        guardarProducto({
            ...producto,
            votos: nuevoVoto
        });

        guardarConsultaDB(true);

    }

    //funcion para agregar un comentario
    const comentarioChange = e => {
        guardarComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    //identificamos el comentario con el ID de la base de datos
    const esCreador = id => {
        if(creador.id === id){
            return true;
        }
        return false;
    }

    //agregando el comentario
    const agregarComentario = e => {
        e.preventDefault();
        //verificar que el usuario esta autenticado
        if(!usuario){
            return router.push('/login');
        }
        //info estra del usuario del comenbtario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;
        comentario.fecha = Date.now();
        //tomamos una copia y agregamos el comentario
        const nuevosComentarios = [...comentarios, comentario];
        //actualizar state y base de datos
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        });
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        });
        //resetear formulario

        guardarConsultaDB(true);
    }

    //revisamos si el usuario es el mismo que esta autenticado para borrar producto
    const puedeBorrar = () => {
        if(!usuario){
            return false;
        }
        if(esCreador(usuario.uid)){
            return true;
        }
    };

    const borrarProducto = async () => {
        try {
            if(!usuario){
                return router.push('/login');
            }
            if(!esCreador(usuario.uid)){
                return router.push('/');
            }
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return ( 
        <Layout>
                {error && <Errror404/> }    {/* si hay error muestra el componente de error 404 */}
                {!error && (
                    <>
                        <div className="contenedor">
                            <h1 css={css`text-align: center;margin-top: 5rem;`}>{nombre}</h1>
                            <Contenedor>
                                <div>
                                    <div css={css`display: flex;flex-direction: row;
                                            flex-wrap: nowrap;
                                            align-content: center;
                                            justify-content: space-between;
                                            align-items: center; `}>
                                        <p>Publicado hace: {formatDistanceToNow( new Date(creado), {locale: es})}</p>
                                        <p>Publicado por: {creador.nombre} de {empresa} </p>        
                                    </div>
                                    
                                    {urlImagen === '' ? (
                                        <img src="/static/img/logo.png" alt='Sin Imagen' />
                                    ) : (
                                        <img src={urlImagen} alt={nombre} />
                                    )}
                                    <p>{descripcion}</p>
                                    
                                    {usuario && (
                                        <>
                                            <div css={css`display: flex;flex-direction: row;
                                            flex-wrap: nowrap;
                                            align-content: center;
                                            justify-content: space-between;
                                            align-items: center; `}>
                                                <h2>Agrega tu Comentario</h2>
                                                <p>Votos {votos}</p>
                                            </div>
                                    
                                            <form  onSubmit={agregarComentario}>
                                                <Campo>
                                                    <input type="text" name="mensaje" placeholder="Comentarios..." onChange={comentarioChange}/>

                                                </Campo>
                                                <Submmit
                                                    type="submit"
                                                    value="Agregar Comentario"
                                                />
                                             </form>
                                    </>
                                    )}

                                    <h2 css={css`margin: 5rem 0;`}>Comentarios</h2>

                                    {comentarios.length === 0 ? "Aún no hay comentarios" : (
                                        <ul css={css`border: 2px solid #e1e1e1;padding: 1.8rem;border-radius: 5px;`}>
                                            {comentarios.map(comentario => (
                                            <li key={comentario.id}
                                                css={css`border-top: 1px solid #e1e1e1; padding: 1.5rem;`}
                                                >
                                                <p css={css`display: inline-block; margin-right: 20px;`}>{comentario.mensaje}</p>
                                                {esCreador(comentario.usuarioId) && (<CreadorProducto>Propietario</CreadorProducto>)}
                                                <p css={css`font-size:clamp(1.5rem, 2vw, 1.8rem);`} >Escrito por:<span css={css`font-weight: bold;`}>{' ' + comentario.usuarioNombre}</span> - Comentado hace {formatDistanceToNow( new Date(comentario.fecha), {locale: es})}</p>
                                                
                                            </li>
                                            ))}
                                        </ul>
                                    )}

                                    
                                </div>

                                <aside>
                                    <Button css={css`margin-top: 7rem;`}
                                        target="_blank"
                                        bgcolor="true"
                                        href={url}>
                                        Visitar Url
                                    </Button>

                                    {usuario && (
                                        <Button
                                            onClick={votarProducto}>
                                        Votar
                                        </Button>) 
                                    }
                                    
                                </aside>
                            </Contenedor>
                            {puedeBorrar() && (
                                <Button onClick={borrarProducto}>Borrar Porducto</Button>
                            )}
                        </div>
                    </>
                )}
        </Layout>
     );
}
 
export default Producto;