import { getTokenDuration } from '../../../../shared/index';

const rootLayoutLoader = () => {
  const tokenDuration = getTokenDuration();

  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
};

export default rootLayoutLoader;
