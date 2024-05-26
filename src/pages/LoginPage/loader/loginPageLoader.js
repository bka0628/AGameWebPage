import { API_URL } from '../../../app/globals';

const loginPageLoader = async () => {
  const response = await fetch(API_URL + '/captcha/isCaptcha');

  if (!response.ok) {
    const error = new Error(
      'Failed to fetch captcha status. Please try again later.',
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { isCaptcha } = await response.json();

  return isCaptcha;
}

export default loginPageLoader;