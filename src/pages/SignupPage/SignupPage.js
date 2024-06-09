import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <form
        className="flex flex-col w-full h-full gap-3 "
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          placeholder="아이디"
          value={id}
          className="w-full px-3 border border-gray-300 rounded-md h-11 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          className="w-full px-3 border border-gray-300 rounded-md h-11 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          className="w-full px-3 border border-gray-300 rounded-md h-11 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        <Captcha
          onChange={(value) => {
            setCaptcha(value);
          }}
        />
        <input
          type="text"
          placeholder="자동 입력 방지 문자"
          className="w-full px-3 border border-gray-300 rounded-md h-11 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
          onChange={(e) => {
            setCaptcha(e.target.value);
          }}
        />
        {error && <p className="font-bold text-red-500 ">{error}</p>}
        <button
          className="w-full text-xl font-bold text-white bg-black rounded-md h-11 hover:bg-blue-700"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignupPage;
