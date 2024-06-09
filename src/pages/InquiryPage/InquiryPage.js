import { useState } from 'react';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';

import classes from './InquiryPage.module.css';
import { API_URL } from '../../app/globals';

const InquiryPage = () => {
  const [inquiryType, setInquiryType] = useState('');
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = useRouteLoaderData('root');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!inquiryType || inquiryType === '') {
      setError('문의 유형을 선택해 주세요.');
      return;
    }
    if (!inquiryTitle) {
      setError('문의 제목을 입력해 주세요.');
      return;
    }
    if (!inquiryContent) {
      setError('문의 내용을 입력해 주세요.');
      return;
    }

    setError('');

    fetch(API_URL + '/support/inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ inquiryType, inquiryTitle, inquiryContent }),
    }).catch((error) => {
      console.error('문의하기 요청 중에 오류가 발생했습니다:', error);
    });

    setInquiryType('');
    setInquiryContent('');

    navigate('/support/inquiries');
  };

  return (
    <>
      {token && (
        <>
          <form className={classes.inquiry} onSubmit={handleFormSubmit}>
            <div className={classes.inquiry__select}>
              <label>문의 유형</label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
              >
                <option value="" disabled hidden>
                  질문 유형을 선택해 주세요
                </option>
                <option value="이용 문의">이용 문의</option>
                <option value="오류 신고">오류 신고</option>
                <option value="서비스 제안">서비스 제안</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div className={classes.inquiry__title}>
              <label>문의 제목</label>
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                value={inquiryTitle}
                onChange={(e) => setInquiryTitle(e.target.value)}
              />
            </div>
            <div className={classes.inquiry__content}>
              <label>문의 내용</label>
              <textarea
                placeholder="내용을 입력해주세요"
                value={inquiryContent}
                onChange={(e) => setInquiryContent(e.target.value)}
              />
            </div>
            {error && <p className={classes.error}>{error}</p>}
            <div className={classes.inquiry__button}>
              <button type="submit">문의하기</button>
            </div>
          </form>
        </>
      )}
      {!token && (
        <p className={classes['inquiry__need-login']}>
          1대1 문의를 하려면 로그인이 필요합니다.
        </p>
      )}
    </>
  );
};
export default InquiryPage;
