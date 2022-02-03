import React, {useContext} from 'react'
import Link from 'next/link';
import styled from '@emotion/styled';
import firebaseContext from '../../firebase/context';

const Nav = styled.nav`
    padding-left: 2rem;
    a {
        font-size: clamp(1.6rem, 2.5vw, 2.5rem);
        margin-left: 2rem;
        color: var(--gris2);
        text-decoration: none;
        &:hover {
            color: var(--naranja);
        }
        &:last-of-type {
            margin-right: 0;
        }
    }
`;

const Navegacion = () => {

    const {usuario} = useContext(firebaseContext);
    return ( 
        <Nav>
            <Link href="/">Inicio</Link>
            <Link href="/populares">Populares</Link>
            {usuario && (<Link href="/nuevo-producto">Nuevo Producto</Link>) }
        </Nav>
     );
}
 
export default Navegacion;