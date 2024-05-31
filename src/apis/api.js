import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchArtists = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const fetchAlbums = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/albums`, {
    params: { userId },
  });
  return response.data;
};

export const fetchAlbumPhotos = async (albumId) => {
  const response = await axios.get(`${API_BASE_URL}/albums/${albumId}/photos`);
  return response.data;
};

export const fetchTweets = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/comments`, {
    params: { postId: userId },
  });
  return response.data;
};

export const createTweet = async (tweet) => {
  const response = await axios.post(`${API_BASE_URL}/comments`, tweet);
  return response.data;
};

export const updateTweet = async (tweetId, tweet) => {
  const response = await axios.put(
    `${API_BASE_URL}/comments/${tweetId}`,
    tweet
  );
  return response.data;
};

export const deleteTweet = async (tweetId) => {
  const response = await axios.delete(`${API_BASE_URL}/comments/${tweetId}`);
  return response.data;
};
