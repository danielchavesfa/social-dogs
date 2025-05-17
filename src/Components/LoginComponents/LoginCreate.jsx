import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './LoginCreate.module.css';
import { USER_POST } from '../../helpers/URL';
import InputForm from '../Form/InputForm';
import useForm from '../../Hooks/useForm';
import ButtonForm from '../Form/ButtonForm';
import UserContext from '../../Contexts/UserContext';
import useFetch from '../../Hooks/useFetch';
import Error from '../HelpersComponents/Error';
import Head from '../HelpersComponents/Head';

function LoginCreate() {
  const username = useForm();
  const email = useForm('email');
  const password = useForm();

  const { userLogin, data } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && email.validate() && password.validate()) {
      const bodyData = { username: username.value, email: email.value, password: password.value };
      const { url, options } = USER_POST(bodyData);
      const { response } = await request(url, options);

      if (!response.ok) {
        return;
      }

      userLogin(username.value, password.value);
    }
  }

  if (data) {
    return <Navigate to={'/conta'} />;
  }

  return (
    <section className={`forms ${styles.registerContainer}`}>
      <Head title={'Crie sua conta'} />
      <div className={`container anime ${styles.register}`}>
        <h1 className='containerTitle'>Cadastre-se</h1>

        <form className={styles.formRegister} onSubmit={handleSubmit}>
          <InputForm label={'Usuário'} name={'username'} type={'text'} {...username} />
          <InputForm label={'E-mail'} name={'email'} type={'email'} {...email} />
          <InputForm label={'Senha'} name={'password'} type={'password'} {...password} />
          {loading ? (
            <ButtonForm disabled>Cadastrando...</ButtonForm>
          ) : (
            <ButtonForm>Cadastrar</ButtonForm>
          )}
          <Error error={error} />
        </form>

        <p>
          Já possui conta? <Link to={'/login'}>Entrar</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginCreate;
