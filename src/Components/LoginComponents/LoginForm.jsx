import React from 'react';
import styles from './LoginForm.module.css';
import btnStyle from '../Form/ButtonForm.module.css';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../../Contexts/UserContext.jsx';
import useForm from '../../Hooks/useForm.jsx';
import InputForm from '../Form/InputForm.jsx';
import ButtonForm from '../Form/ButtonForm.jsx';
import Error from '../HelpersComponents/Error.jsx';
import Head from '../HelpersComponents/Head.jsx';

function LoginForm() {
  const { userLogin, error, loading, login } = React.useContext(UserContext);
  const username = useForm();
  const password = useForm();

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.validate() && !password.validate()) return;

    userLogin(username.value, password.value);
  }

  if (login === true) {
    return <Navigate to={'/conta'} />;
  }

  return (
    <section className='forms'>
      <Head title={'Login'} />
      <div className={`container anime ${styles.formContainer}`}>
        <h1 className='containerTitle'>Entrar</h1>

        <form className={styles.loginForm} method='post' onSubmit={handleSubmit}>
          <InputForm label={'Usuário'} name={'username'} type={'text'} {...username} />
          <InputForm label={'Senha'} name={'password'} type={'password'} {...password} />
          {loading ? (
            <ButtonForm disabled>Carregando...</ButtonForm>
          ) : (
            <ButtonForm>Entrar</ButtonForm>
          )}
          <Error error={error && 'Dados incorretos.'} />
        </form>

        <p className={styles.recovery}>
          Perdeu a senha? <Link to={'perdeu'}>Recuperar senha.</Link>
        </p>

        <div className={styles.register}>
          <h2>Cadastre-se</h2>

          <p>
            Ainda não possui conta?{' '}
            <Link className={btnStyle.buttonForm} to={'/criar'}>
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
