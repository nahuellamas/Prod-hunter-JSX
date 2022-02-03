export default function validarIniciarSesion(valores) {
    let errores = {};
    if (!valores.email) {
        errores.email = 'El e-mail es invalido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valores.email)) {
        errores.email = 'Escribí bien tu e-mail';
    }
    if (!valores.password) {
        errores.password = 'La contraseña es obligatoria';
    } else if (valores.password.length < 6) {
        errores.password = 'Las contraseñas tienen al menos 6 caracteres';
    }
    return errores;
}