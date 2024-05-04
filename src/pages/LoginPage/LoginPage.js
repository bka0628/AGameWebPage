import { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { Captcha } from '../../entities';
import { API_URL } from '../../app/globals';

import classes from './LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCaptcha, setIsCaptcha] = useState(loaderData);
  const [captcha, setCaptcha] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!id || id === '') {
      setError('아이디를 입력해 주세요.');
      return;
    }
    if (!password) {
      setError('비밀번호를 입력해 주세요.');
      return;
    }
    if (isCaptcha && !captcha) {
      setError('자동 입력 방지 문자를 입력해 주세요.');
      return;
    }

    setError('');

    fetch(API_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password, captcha }),
    })
      .then((res) => {
        if (res.status === 422) {
          return res.json().then((data) => {
            setIsCaptcha(data.isCaptcha);
            setError(data.message);
          });
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('로그인 실패');
          return;
        }
        if (res.status === 200) {
          console.log('로그인 성공');
          return res.json();
        }

        return;
      })
      .then((resData) => {
        if (resData.token) {
          localStorage.setItem('token', resData.token);
          localStorage.setItem('userId', resData.userId);

          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 1);
          localStorage.setItem('expiration', expiration.toISOString());

          setId('');
          setPassword('');
          setError('');
          setIsCaptcha(false);
          setCaptcha('');

          navigate('/');
        }
      })
      .catch((error) => {
        console.error('로그인 요청 중에 오류가 발생했습니다:', error);
      });
  };

  return (
    <>
      <form className={classes.login__from} onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {isCaptcha && (
          <>
            <Captcha />
            <input
              type="text"
              placeholder="자동 입력 방지 문자"
              onChange={(e) => {
                setCaptcha(e.target.value);
              }}
            />
          </>
        )}
        {error && <p>{error}</p>}
        <button className={classes.login__from__button} type="submit">
          로그인
        </button>
      </form>
    </>
  );
};

export default LoginPage;
