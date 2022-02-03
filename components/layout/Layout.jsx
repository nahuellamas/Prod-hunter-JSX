import React from "react";
import Header from './Header';
import { Global, css } from '@emotion/react';
import Head from 'next/head';
const Layout = (props) => {
    return ( 
        <>
            <Global
                styles={css`
                    :root{
                        --gris: #3d3d3d;
                        --gris2: #6f6f6f;
                        --gris3: #e1e1e1;
                        --naranja: #DA552F;
                    }
                    html{
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before, *:after{
                        box-sizing: inherit;
                    }
                    body{
                        font-size: 1.9rem;
                        line-height: 1.5;
                    
                    }
                    p, a{
                        font-family: 'Bebas Neue', cursive;
                        font-weight: 400;
                    }
                    h1, h2, h3{
                        margin: 0 0 2rem 0;
                        line-height: 1.5;
                    }
                    h1, h2{
                        font-family: 'Roboto Slab', serif;
                        font-weight: 800;
                    }
                    h3{
                        font-family: 'Bebas Neue', cursive;
                        font-weight: 400;
                    }
                    ul, li{
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                    a{
                        text-decoration: none;
                    }
                    img{
                        max-width: 100%;
                    }
                `}
            />
            <Head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                    <title>Product Hunt Firebase y Next.js</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Slab:wght@400;800&display=swap" rel="stylesheet"/>
                    <link href="/static/css/app.css" rel="stylesheet" />
            </Head>
            <Header />
            <main>
                {props.children}
            </main>
            
        </>
     );
}
 
export default Layout;