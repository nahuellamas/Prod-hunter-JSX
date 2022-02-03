import '../styles/globals.css';
import App from 'next/app';
import firebase, {firebaseContext} from '../firebase';
import useAuth from '../Hooks/useAuth';

const MyApp = props => {
  const usuario = useAuth();
  const {Component, pageProps} = props;

  return (
    <firebaseContext.Provider value={{firebase, usuario}}>
      <Component {...pageProps} />
    </firebaseContext.Provider>
    
  )
}

export default MyApp


