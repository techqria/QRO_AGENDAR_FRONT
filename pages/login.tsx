import React from 'react'
import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <section className='d-md-flex'>
            <div className="bg-orange w-md-35 h-100vh">
                <div className="container d-flex flex-column align-items-center justify-content-center">
                    <img width={180} className='mt-5' src="/images/logo-qro-agendar.svg" alt="logo-qro-agendar.svg" />
                    <LoginForm />
                </div>
            </div>
            <div className="d-none d-md-flex w-75 flex-column justify-content-center align-items-center">
                <img width={100} className='mt-5' src="/images/logo-orange-qro-agendar.svg" alt="logo-qro-agendar.svg" />
                <h1 className='text-orange mt-3'>Confira nossas atualizações</h1>
                <video height={"50%"} src=""></video>
            </div>
        </section>
    );
}

export default Login;