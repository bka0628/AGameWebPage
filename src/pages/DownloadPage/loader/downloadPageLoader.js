import { API_URL } from '../../../app/globals';

const downloadPageLoader = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  let os = 'Unknown';

  if (userAgent.indexOf('win') !== -1) os = 'Windows';
  if (userAgent.indexOf('mac') !== -1) os = 'macOS';
  if (userAgent.indexOf('linux') !== -1) os = 'Linux';
  if (userAgent.indexOf('android') !== -1) os = 'Android';
  if (userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipad') !== -1)
    os = 'iOS';

  let fileUrl = null;

  switch (os) {
    case 'Windows':
      fileUrl = API_URL + '/download/client/whindo';
      break;
    case 'macOS':
      fileUrl = API_URL + '/download/client/max';
      break;
    case 'Linux':
    case 'Android':
    case 'iOS':
      break;
    default:
      break;
  }

  return {fileUrl, os};
};

export default downloadPageLoader;
