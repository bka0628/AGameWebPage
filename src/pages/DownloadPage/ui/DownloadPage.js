import { useLoaderData } from 'react-router-dom';

import { DownloadButton } from '../../../entities/index';
import { PageTitle } from '../../../shared/index';

const DownloadPage = () => {
  const { fileUrl, os } = useLoaderData();

  return (
    <>
      <PageTitle>다운로드</PageTitle>
      <DownloadButton fileUrl={fileUrl} os={os} />
    </>
  );
};

export default DownloadPage;
