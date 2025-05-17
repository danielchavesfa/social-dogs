import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from '../helpers/URL';

function UserStorage({ children }) {
  const navigate = useNavigate();

  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const userLogout = React.useCallback(async function userLogout() {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem('token');
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();

    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    setError(null);
    setLoading(true);

    try {
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);

      if (!response.ok) throw new Error('Credencial inválida.');

      const { token } = await response.json();

      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (error) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);

          if (!response.ok) throw new Error('Token inválido.');

          await getUser(token);
        } catch (error) {
          setError(error.message);
          await userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }

    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider value={{ data, login, error, loading, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserStorage;
