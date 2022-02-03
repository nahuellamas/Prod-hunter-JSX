import React,{useState, useContext} from 'react';
import {css} from '@emotion/react';
import Router, { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import {Form, Campo , Submmit, Error} from '../components/UI/Formularios';
import validarCrearProducto from '../validacion/validarCrearProducto';
import useValidacion from '../Hooks/useValidacion';
import {firebaseContext} from '../firebase';
import FileUploader from 'react-firebase-file-uploader';
import Error404 from '../components/layout/404';

let STATE_INICIAL = {
  nombre: '',
  empresa: '',
  //imagen: '',
  url: '',
  descripcion: ''
}

export default function NuevoProducto() {
  //STATE DE IMGENES
  const [nombreImagen, guardarNombreImagen] = useState('');
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlImagen, guardarUrlImagen] = useState('');

  const [error, guardarError] = useState(false);
  const [msgCreacion, setmsgCreacion] = useState(false);

  const {valores, errores, handleSubmit, handleChange, handleBlur} = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);
  const {nombre, empresa, imagen, url, descripcion} = valores;
  // context del firebaseContext
  const {usuario, firebase} = useContext(firebaseContext);
  //para redireccionar
  const router = useRouter();


  async function crearProducto(){
    //si no esta autenticado
    if(!usuario){
      return router.push('/login');
    }
    //crear el objeto con los datos
    const producto = {
      nombre,
      empresa,
      url,
      urlImagen,
      descripcion,
      votos: 0,
      creado: Date.now(),
      comentarios: [],
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotado: []
     }
     //insertarlo en la base de datos
     firebase.db.collection('productos').add(producto);
     //para redireccionar
      router.push('/');
  };

  //copiamos las funciones de la DOC de react-firebase-file-uploader
  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  }
  const handleProgress = progreso => {
    guardarProgreso({progreso});
  }
  const handleUploadError = error => {
    guardarSubiendo(error);
    console.error(error);
  };
  const handleUploadSuccess = nombre => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombreImagen(nombre);
    firebase.storage.ref('productos').child(nombre).getDownloadURL()
    .then(url => {
      console.log(url);
      guardarUrlImagen(url);
    })
  };


  return (
    <div>
      <Layout>
        {!usuario ? <Error404 /> : (
          <>
            <h1 css={css`text-align: center;margin-bottom: 5rem;`}>Agregar Nuevo Producto</h1>
            <Form onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>Información General</legend>
              
                { msgCreacion ? <p css={css`text-align: center;margin-bottom: 5rem;`}>{msgCreacion}</p> : null }
                <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={nombre} type="text" id="nombre" placeholder="Nombre del Producto" name="nombre"/>
                </Campo>
                {errores.nombre && <Error>{errores.nombre}</Error>}

                <Campo>
                    <label htmlFor="empresa">Empresa</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={empresa} type="text" id="empresa" placeholder="Tu Empresa" name="empresa"/>
                </Campo>
                {errores.empresa && <Error>{errores.empresa}</Error>}
                
                <Campo>
                    <label htmlFor="imagen">Foto del Producto</label>
                    <FileUploader accept="image/*" randomizeFilename type="file" id="imagen" name="imagen"
                      storageRef={firebase.storage.ref("productos")}
                      onUploadStart={handleUploadStart}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                      onProgress={handleProgress} //Metodos de firebase-UPLOADER
                    />
                </Campo>

                <Campo>
                    <label htmlFor="url">Nombre de la URL</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={url} type="url" placeholder="URL del Producto" id="url" name="url"/>
                </Campo>
                {errores.url && <Error>{errores.url}</Error>}                
              </fieldset>
              <fieldset>
                <legend>Sobre tu Producto</legend>
                <Campo>
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea onChange={handleChange} onBlur={handleBlur} value={descripcion} id="descripcion" name="descripcion"/>
                </Campo>
                {errores.descripcion && <Error>{errores.descripcion}</Error>}
              </fieldset>
                <Submmit type="submit" value="Crear Producto" />

                {error && <Error>{error}</Error>}
            </Form>   
        </>
        )  }
      </Layout>
    </div>
  )
}