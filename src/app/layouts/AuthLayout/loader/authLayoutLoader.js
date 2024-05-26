import { redirect } from 'react-router-dom';

const authLayoutLoader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    alert('이미 로그인되어 있습니다.');

    return redirect('/');
  }

  return null;
};

export default authLayoutLoader;
