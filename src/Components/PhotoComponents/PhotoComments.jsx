import React from 'react';
import styles from './PhotoComments.module.css';
import UserContext from '../../Contexts/UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';

function PhotoComments({ id, comments, single }) {
  const { login } = React.useContext(UserContext);
  const [commentsList, setCommentsList] = React.useState(() => comments);
  const commentsSection = React.useRef(null);

  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [commentsList]);

  return (
    <>
      <ul ref={commentsSection} className={`${styles.comments} ${single ? styles.single : ''}`}>
        {commentsList.map((comment) => {
          return (
            <li key={comment.comment_ID}>
              <b>{comment.comment_author}: </b>
              <span>{comment.comment_content}</span>
            </li>
          );
        })}
      </ul>
      {login ? (
        <PhotoCommentsForm single={single} id={id} setCommentsList={setCommentsList} />
      ) : null}
    </>
  );
}

export default PhotoComments;
