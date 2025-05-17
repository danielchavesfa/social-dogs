import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserPhotoPost.module.css';
import { PHOTO_POST } from '../../helpers/URL';
import InputForm from '../Form/InputForm';
import ButtonForm from '../Form/ButtonForm';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Error from '../HelpersComponents/Error';
import Head from '../HelpersComponents/Head';

function UserPhotoPost() {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);

    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({ raw: target.files[0], preview: URL.createObjectURL(target.files[0]) });
  }

  return (
    <section>
      <Head title={'Post sua foto'} />
      <div className={`container ${styles.photoPost} anime`}>
        <form action='' onSubmit={handleSubmit}>
          <InputForm label={'Nome'} type={'text'} name={'nome'} {...nome} />
          <InputForm label={'Peso'} type={'number'} name={'peso'} {...peso} />
          <InputForm label={'Idade'} type={'number'} name={'idade'} {...idade} />
          <input
            className={styles.inputImg}
            type='file'
            name='img'
            id='img'
            onChange={handleImgChange}
          />
          {loading ? (
            <ButtonForm disabled>Carregando...</ButtonForm>
          ) : (
            <ButtonForm>Enviar</ButtonForm>
          )}
          <Error error={error} />
        </form>
        {img.preview ? (
          <div className={styles.preview} style={{ backgroundImage: `url(${img.preview})` }}></div>
        ) : null}
      </div>
    </section>
  );
}

export default UserPhotoPost;
