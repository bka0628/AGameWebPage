import { API_URL } from "../../../app/globals";

const newsDetailsLoader = async ({ params }) => {
  const response = await fetch(
    `${API_URL}/news/${params.id}`
  );

  if (!response.ok) {
    const error = new Error(
      'An error occurred while fetching the news details'
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export default newsDetailsLoader;