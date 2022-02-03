import React from 'react';
import { useEffect, useContext, useState } from 'react';
import {firebaseContext} from '../firebase';

const useProductos = orden => {
    const [productos, guardarProductos] = useState([]);

    const {firebase} = useContext(firebaseContext);

    useEffect(() => {
    const obtenerProductos = () => {
        firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot);
    }
    obtenerProductos();
    }, []);

    const manejarSnapshot = snapshot => {
    const productos = snapshot.docs.map(doc => {
        return {
        id: doc.id,
        ...doc.data()
        }
    })
    guardarProductos(productos);
    };

    return {
        productos
    }
}

export default useProductos;


