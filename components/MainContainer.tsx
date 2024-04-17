import Head from "next/head";
import Toast from "./Toast";

const MainContainer = ({ children }) => {
    return (
        <>
            <Head>
                <title>QRO AGENDAR</title>
                <meta name="description" content="QRO AGENDAR. Agendar ficou muito mais fácil." />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" />
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"  async />
            </Head>

            <main>
                <Toast />
                {children}
            </main>


        </>
    );
}

export default MainContainer;