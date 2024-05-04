const { useEffect } = require('react');
const { useNavigate } = require('react-router-dom');
const { getTokenDuration } = require('../../../../shared/index');

const useTokenValidation = (token) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expiration');
      navigate(0);
      return;
    }

    const tokenDuration = getTokenDuration();

    const timeoutId = setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expiration');
      navigate(0);
    }, tokenDuration);

    return () => clearTimeout(timeoutId); 
  }, [token, navigate]);
};

export default useTokenValidation;