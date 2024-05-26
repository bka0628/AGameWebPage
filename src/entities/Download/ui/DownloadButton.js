import classes from './DownloadButton.module.css';

const DownloadButton = ({ fileUrl, os }) => {
  if (!fileUrl) {
    return (
      <>
        <div className={classes.Download__button}>
          <p>지원하지 않는 운영체제입니다.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classes.download__container}>
        <a href={fileUrl}>
          <button className={classes.download__button}>{os}용 Download</button>
        </a>
      </div>
    </>
  );
};

export default DownloadButton;
