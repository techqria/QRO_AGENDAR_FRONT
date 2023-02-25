import React from 'react'
import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <section className='container h-100vh d-flex flex-column justify-content-center align-items-center'>
            <img width={180} src="/images/logo-qro-agendar.svg" alt="logo-qro-agendar.svg" />
            <LoginForm />
        </section>
    );
}

export default Login;