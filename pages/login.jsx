import React,{useState} from 'react';
import {css} from '@emotion/react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import {Form, Campo , Submmit, Error} from '../components/UI/Formularios';
import validarIniciarSesion from '../validacion/validarIniciarSesion';
import useValidacion from '../Hooks/useValidacion';
import firebase from '../firebase';

let STATE_INICIAL = {
  email: '',
  password: ''
}

export default function Login() {

  const [error, guardarError] = useState(false);
  const [msgInicioSesion, setmsgIniciarSesion] = useState(null);
  const {valores, errores, handleSubmit, handleChange, handleBlur} = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);
  const {email, password} = valores;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      setmsgIniciarSesion('Iniciando sesión...');
      setTimeout(() => {
          Router.push('/');
        }, 500);
    } catch (error) {
      console.error('Hubo un error al autenticar tu cuenta', error.message);
      guardarError(error.message);
    }
    
  }

  return (
    <div>
      <Layout>
        <>
            <h1 css={css`text-align: center;margin-bottom: 5rem;`}>Iniciar Sesión</h1>
            <Form onSubmit={handleSubmit}>
            { msgInicioSesion ? <p css={css`text-align: center;margin-bottom: 5rem;`}>{msgInicioSesion}</p> : null }
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

                <Submmit type="submit" value="Iniciar Sesión" />

                {error && <Error>{error}</Error>}
            </Form>   
        </>
      </Layout>
    </div>
  )
}