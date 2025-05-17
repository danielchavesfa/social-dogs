import React from 'react';
import styles from './PhotoCommentsForm.module.css';
import EnviarSVG from '../../assets/enviar.svg?react';
import { COMMENT_POST } from '../../helpers/URL';
import useFetch from '../../Hooks/useFetch';
import Error from '../HelpersComponents/Error';

function PhotoCommentsForm({ id, setCommentsList, single }) {
  const [comment, setComment] = React.useState('');
  const { error, request } = useFetch();

  function handleChange({ target }) {
    setComment(target.value);
  }

  async function handleSumit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });

    const { response, json } = await request(url, options);

    if (response.ok) {
      setComment('');
      setCommentsList((comments) => [...comments, json]);
    }
  }

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSumit}>
      <textarea
        className={styles.textarea}
        id='comment'
        name='comment'
        value={comment}
        placeholder='Comente...'
        onChange={handleChange}></textarea>
      <button className={styles.btn}>
        <EnviarSVG />
      </button>
      <Error error={error} />
    </form>
  );
}

export default PhotoCommentsForm;
