import React from 'react';
import InputForm from '../Form/InputForm';
import ButtonForm from '../Form/ButtonForm';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import { PASSWORD_LOST } from '../../helpers/URL';
import Error from '../HelpersComponents/Error';
import Head from '../HelpersComponents/Head';

function LoginPasswordLost() {
  const login = useForm();
  const { data, error, loading, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar'),
      });

      await request(url, options);
    }
  }

  return (
    <section>
      <Head title={'Perdeu a senha'} />
      <div className='container anime'>
        <h1 className='containerTitle'>Perdeu a senha?</h1>

        {data ? (
          <p>Email enviado!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <InputForm label={'Email / Usuário'} type={'text'} name={'login'} {...login} />
            {loading ? (
              <ButtonForm disabled>Enviando...</ButtonForm>
            ) : (
              <ButtonForm>Enviar Email</ButtonForm>
            )}
          </form>
        )}
      </div>
      <Error error={error} />
    </section>
  );
}

export default LoginPasswordLost;
