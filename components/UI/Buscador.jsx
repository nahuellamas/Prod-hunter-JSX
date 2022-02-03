import React, {useState} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import Router from 'next/router';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    border-radius: 5px;
    max-width: 150px;
    width: 100%;
    
    @media (max-width:768px){
        max-width: 50px;
`;

const InputSubmmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    right: 1rem;
    top: .7rem;
    background-color: white;
    border: none;
    text-indent: -9999px;
    &:hover {
        cursor: pointer;
    }
    
`;

const Buscar = () => {

    const [busqueda, setBusqueda] = useState('');

    const buscarProducto = e => {
        e.preventDefault();
        if(busqueda.trim() === '') return;
        //redireccionar
        Router.push({
            pathname: '/buscar',
            query: { q : busqueda }
        })
    }

    return ( 
        <form onSubmit={buscarProducto}
            css={css`
                position: relative;
            `}
        >
            <InputText type="text" placeholder="Buscar..." onChange={e => setBusqueda(e.target.value)}/>
            <InputSubmmit type="submit">buscar</InputSubmmit>
        </form>
     );
}
 
export default Buscar;