import { useEffect, useState } from 'react';

import classes from './Captcha.module.css';
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
    <>
      <div className={classes.captcha}>
        <div className={classes.captcha__svg}>
          <div dangerouslySetInnerHTML={{ __html: captchaImg }} />
          <button type="button" onClick={refreshCaptcha}>
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Captcha;
