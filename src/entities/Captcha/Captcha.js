import { useEffect, useState } from 'react';

import { API_URL } from '../../app/globals';

const Captcha = () => {
  const [captchaImg, setCaptchaImg] = useState('');

  // 백엔드에서 CAPTCHA 이미지 가져오기
  const fetchCaptcha = async () => {
    try {
      const response = await fetch(API_URL + '/captcha');
      const data = await response.text();
      setCaptchaImg(data);
    } catch (error) {
      console.error('Captcha를 가져오는데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  // CAPTCHA 새로고침 기능
  const refreshCaptcha = () => {
    fetchCaptcha();
  };

  return (
    <div className="flex items-center w-full p-1 border border-gray-300 rounded-md h-11">
      <div dangerouslySetInnerHTML={{ __html: captchaImg }} />
      <button type="button" onClick={refreshCaptcha} className="flex items-center justify-center w-full h-full border-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-300 cursor-pointer hover:text-gray-700 focus:outline-none focus:text-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </div>
  );
};

export default Captcha;
