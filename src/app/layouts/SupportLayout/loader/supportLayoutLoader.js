import { redirect } from "react-router-dom";

const supportLayoutLoader = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('로그인이 필요한 페이지입니다.');

    return redirect('/login');
  }

  return null;
}

export default supportLayoutLoader;