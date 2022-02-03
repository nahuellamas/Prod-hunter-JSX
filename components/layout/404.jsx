import React from 'react';
import {css} from '@emotion/react';

const Errror404 = () => {
    return ( 
        <div css={css`margin-top: 5rem; text-align: center;`}>
            <h1 css={css`font-size: clamp(2.5rem, 3vw, 7rem);`}>¡ERROR 404!</h1>
            <h1 css={css`font-size: clamp(2rem, 3vw, 4rem);`}>Página no encontrada</h1>
            <p css={css`font-size: clamp(2rem, 3vw, 4rem);`}>La página o el producto que estas buscando no existe</p>
        </div>
     );
}
 
export default Errror404;