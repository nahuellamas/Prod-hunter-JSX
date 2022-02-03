import React, {useState, useEffect} from 'react';

const useValidacion = (initialState, validar, fn) => {

    const [valores, setValores] = useState(initialState);
    const [errores, setErrores] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm){
            const noErrors = Object.keys(errores).length === 0;
            if(noErrors){
                fn(); //le pasamos la funcion que queramos al custom hook
            }
            setSubmitForm(false);
        }
    }, [errores]);

    //funcion que ejecuta conforme el usuario escriba en los inputs
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    };

    //funcion que ejecuta conforme el usuario haga click en el boton
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true);
    };

    //cuando se ejecuta uel evento BLUR (Cuanddo el usuario escribe y sale del campo)
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
    };

    return {
        valores,
        errores,
        submitForm,
        handleChange,
        handleSubmit,
        handleBlur
    }
}
 
export default useValidacion;