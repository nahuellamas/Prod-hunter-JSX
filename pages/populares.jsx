import Layout from '../components/layout/Layout';
import DetallesProductos from '../components/layout/DetallesProductos';
import useProductos from '.././Hooks/useProductos';

export default function Populares() {

  const {productos} = useProductos('votos');

  return (
    <div>
      <Layout>
      { productos.length === 0 ? ( 
        <h1>No hay productos</h1>
      ) : (
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {productos.map(producto => (
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
    </div>
  )
}