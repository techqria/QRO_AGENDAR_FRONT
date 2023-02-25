import Head from "next/head";
import Script from "next/script";

const MainContainer = ({ children }) => {
    return (
        <>
            <Head>
                <title>QRO AGENDAR</title>
                <meta name="description" content="QRO AGENDAR. Agendar ficou muito mais fácil." />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />
                <link rel="shortcut icon" href="favicon.svg" type="image/x-icon" />
            </Head>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" />

            <main>{children}</main>

            
        </>
    );
}

export default MainContainer;