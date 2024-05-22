import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

const getToken = () => {
  return Cookies.get(TokenKey);
};

const setToken = token => {
  return Cookies.set(TokenKey, token);
};

const removeToken = () => {
  return Cookies.remove(TokenKey);
};
export { getToken, setToken, removeToken };
