import { API_URL } from '../../../app/globals';

const inquiriesPageLoader = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const response = await fetch(API_URL + '/support/inquiries/count', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    const error = new Error(
      'An error occurred while fetching the news total count'
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  } else {
    const { totalInquiriesCount } = await response.json();
    return totalInquiriesCount;
  }
}

export default inquiriesPageLoader;