import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './SignupPage.module.css';
import { Captcha } from '../../entities';
import { API_URL } from '../../app/globals';

const SignupPage = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');

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
    if (!passwordConfirm) {
      setError('비밀번호 확인을 입력해 주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!captcha) {
      setError('자동 입력 방지 문자를 입력해 주세요.');
      return;
    }

    setError('');

    fetch(API_URL + '/auth/signup', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password, captcha }),
    })
      .then((res) => {
        if (res.status === 409) {
          setError('사용할 수 없는 아이디입니다.');
        }
        if (res.status === 422) {
          setError('자동 입력 방지 문자가 일치하지 않습니다.');
        }
        if (res.status === 201) {
          console.log('회원가입 성공');

          setId('');
          setPassword('');
          setPasswordConfirm('');
          setCaptcha('');

          // 로그인 페이지로 이동
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('회원가입 요청 중에 오류가 발생했습니다:', error);
      });
  };

  return (
    <>
      <form className={classes.signup__from} onSubmit={handleFormSubmit}>
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
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        <Captcha onChange={
          (value) => {
            setCaptcha(value);
          }
        }/>
        <input
            type="text"
            placeholder="자동 입력 방지 문자"
            onChange={(e) => {
              setCaptcha(e.target.value);
            }}
          />
        {error && <p>{error}</p>}
        <button className={classes.signup__from__button} type="submit">회원가입</button>
      </form>
    </>
  );
};

export default SignupPage;
