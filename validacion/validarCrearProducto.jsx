export default function validarCrearCuenta(valores) {
    let errores = {};
    if (!valores.nombre) {
        errores.nombre = 'El nombre es requerido';
    }
    //validar empresa
    if (!valores.empresa) {
        errores.empresa = 'La empresa o compañia es Obligatorio';
    }
    //validar url
    if (!valores.url) {
        errores.url = 'Elige el nombre de la URL';
    } else if( !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(valores.url)){
        errores.url = 'La URL no es valida';
    }
    //validar img
    //validar descripcion
    if (!valores.descripcion || valores.descripcion.length < 25) {
        errores.descripcion = 'La descripcion tiene que contener al menos 25 caracteres';
    }
    return errores;
}