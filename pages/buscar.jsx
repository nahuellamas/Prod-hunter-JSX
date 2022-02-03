import React, {useEffect, useState} from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import DetallesProductos from '../components/layout/DetallesProductos';
import useProductos from '.././Hooks/useProductos';

export default function Buscar() {
  const router = useRouter();
  const { query: { q } } = router;
  console.log(q);

  const { productos } = useProductos('creado');
  const [ resultado, setResultado ] = useState([]);
  
  //filtramos los productos que coincidan con la busqueda
  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtro = productos.filter(producto => {
      return(
        producto.nombre.toLowerCase().includes(busqueda) || producto.descripcion.toLowerCase().includes(busqueda)
      )
    });
    setResultado(filtro);
  }, [q, productos]);


  return (
    <Layout>
      { productos.length === 0 ? ( 
        <h1>No hay productos</h1>
      ) : (
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {resultado.map(producto => (
                <DetallesProductos
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </ul>
          </div>
        </div>
      ) }
      </Layout>
  )
}