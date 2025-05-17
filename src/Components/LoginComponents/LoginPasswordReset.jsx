import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../Form/InputForm';
import ButtonForm from '../Form/ButtonForm';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import { PASSWORD_RESET } from '../../helpers/URL';
import Error from '../HelpersComponents/Error';
import Head from '../HelpersComponents/Head';

function LoginPasswordReset() {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({ login, key, password: password.value });
      const { response } = await request(url, options);

      if (response.ok) navigate('/login');
    }
  }

  return (
    <section>
      <div className='container anime'>
        <Head title={'Resete a senha'} />
        <h1 className='containerTitle'>Resete a senha</h1>
        <form action='' onSubmit={handleSubmit}>
          <InputForm label={'Nova Senha'} type={'password'} name={'password'} {...password} />
          {loading ? (
            <ButtonForm disabled>Resentando...</ButtonForm>
          ) : (
            <ButtonForm>Resetar</ButtonForm>
          )}
        </form>
        <Error error={error} />
      </div>
    </section>
  );
}

export default LoginPasswordReset;
