import React, {useContext} from 'react';
import Buscar from '../UI/Buscador';
import Navegacion from './Navegacion';
import Link from 'next/link';
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import Button from '../UI/Button';
import firebaseContext from '../../firebase/context';
import Router from 'next/router';

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px){
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 800;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
    z-index: 1;
`;


const Header = () => {

    const {usuario, firebase } = useContext(firebaseContext);

    return ( 
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    <Buscar/>
                    <Navegacion/>
                </div>

                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                    `}
                >
                {usuario ? (
                        <>
                            <p
                            css={css`
                                color: var(--naranja);
                                font-size: 1.8rem;
                                margin-right: 2rem;
                            `}
                            >Hola: {usuario.displayName}</p>
                            <Button
                            href="/"
                            bgColor="true"
                            onClick={() => firebase.cerrarSesion()}
                            >Cerrar Sesión</Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button
                                bgColor="true"
                                >Login</Button>
                            </Link>
                            <Link href="/crear-cuenta">
                                <Button>Crear Cuenta</Button>
                            </Link>
                        </>
                ) }
                </div>
            </ContenedorHeader>
        </header>
     );
}
 
export default Header;