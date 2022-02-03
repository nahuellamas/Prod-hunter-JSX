import React,{useState} from 'react';
import {css} from '@emotion/react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import {Form, Campo , Submmit, Error} from '../components/UI/Formularios';
import validarCrearCuenta from '../validacion/validarCrearCuenta';
import useValidacion from '../Hooks/useValidacion';
import firebase from '../firebase';


const CrearCuenta = () => {

  const [error, guardarError] = useState(false);
  const [msgCreacion, setmsgCreacion] = useState(false);
  let STATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
  }
  const {valores, errores, handleSubmit, handleChange, handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, creaCuenta);
  const {nombre, email, password} = valores;

  async function creaCuenta(){
   try {
    await firebase.registrar(nombre, email, password);
    setmsgCreacion("Se creo tu cuenta correctamente");
    setTimeout(() => {
      Router.push('/');
    }, 500);
   } catch (error) {
     console.error('Hubo un error al crear el usuario', error.message);
     guardarError(error.message);
   }
  };

  return (
    <div>
      <Layout>
        <>
            <h1 css={css`text-align: center;margin-bottom: 5rem;`}>Crear Cuenta</h1>
            <Form onSubmit={handleSubmit}>
                { msgCreacion ? <p css={css`text-align: center;margin-bottom: 5rem;`}>{msgCreacion}</p> : null }
                <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={nombre} type="text" id="nombre" placeholder="Tu nombre" name="nombre"/>
                </Campo>
                {errores.nombre && <Error>{errores.nombre}</Error>}

                <Campo>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={email} type="email" id="email" placeholder="Tu email" name="email"/> 
                </Campo>
                {errores.email && <Error>{errores.email}</Error>}

                <Campo>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={password} type="password" id="password" placeholder="Tu password" name="password"/>
                </Campo>
                {errores.password && <Error>{errores.password}</Error>}

                <Submmit type="submit" value="Crear Cuenta" />

                {error && <Error>{error}</Error>}
            </Form>   
        </>
      </Layout>
    </div>
  )
}

export default CrearCuenta;