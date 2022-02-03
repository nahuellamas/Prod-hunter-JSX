import React, {useState, useEffect} from 'react';
import firebase from '../firebase';

function useAuth() {
    const [usuarioAutenticado, setusuarioAutenticado] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                setusuarioAutenticado(usuario);
            } else {
                setusuarioAutenticado(null);
            }
        });
        return () => {
            unsuscribe();
        }       
    }, []);

    return usuarioAutenticado;
}

export default useAuth;