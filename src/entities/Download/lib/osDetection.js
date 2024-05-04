import { API_URL } from "../../../app/globals";

export const detectOS = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('win') !== -1) return 'Windows';
  if (userAgent.indexOf('mac') !== -1) return 'macOS';
  if (userAgent.indexOf('linux') !== -1) return 'Linux';
  if (userAgent.indexOf('android') !== -1) return 'Android';
  if (userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipad') !== -1) return 'iOS';
  return 'Unknown';
};

export const getDownloadUrl = (os) => {
  switch (os) {
    case 'Windows':
      return API_URL + '/download/client/whindo';
    case 'macOS':
      return API_URL + '/download/client/max';
    case 'Linux': case 'Android' : case 'iOS':
      return null;
    default:
      return null;
  }
};