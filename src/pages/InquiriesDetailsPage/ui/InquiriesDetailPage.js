import { SupportNavbar } from '../../../widgets';
import classes from './InquiriesDetailPage.module.css';

const InquiriesDetailPage = () => {
  

  return (
    <>
      <SupportNavbar />
      <div className={classes['inquiries-detail__header']}>
        <h3>서비스 제안</h3>
        <p>2024.02.18</p>
      </div>
      <div className={classes['news-detail__content']}>
        <p>아니 게임은 재밌는데 홈페이지 왜 이따구로 만듬!!</p>
        <p>아니 게임은 재밌는데 홈페이지 왜 이따구로 만듬!!</p>
        <p>아니 게임은 재밌는데 홈페이지 왜 이따구로 만듬!!</p>
        <p>아니 게임은 재밌는데 홈페이지 왜 이따구로 만듬!!</p>
        <p>아니 게임은 재밌는데 홈페이지 왜 이따구로 만듬!!</p>
        <p>아니 게임은 재밌는데 홈페이지 왜 이따구로 만듬!!</p>
      </div>
      <div className={classes['inquiry-Answers-detail__header']}>
        <h3>1 대 1 문의 답변입니다.</h3>
        <p>2024.02.18</p>
      </div>
      <div className={classes['inquiry-Answers-detail__content']}>
        <p>안녕하세요. 고객님. 불편을 드려 죄송합니다. 빠른 시일 내에 수정하도록 하겠습니다.</p>
        <p>안녕하세요. 고객님. 불편을 드려 죄송합니다. 빠른 시일 내에 수정하도록 하겠습니다.</p>
        <p>안녕하세요. 고객님. 불편을 드려 죄송합니다. 빠른 시일 내에 수정하도록 하겠습니다.</p>
        <p>안녕하세요. 고객님. 불편을 드려 죄송합니다. 빠른 시일 내에 수정하도록 하겠습니다.</p>
        <p>안녕하세요. 고객님. 불편을 드려 죄송합니다. 빠른 시일 내에 수정하도록 하겠습니다.</p>
      </div>
    </>
  );
};

export default InquiriesDetailPage;
