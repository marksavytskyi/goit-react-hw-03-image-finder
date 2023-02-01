import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY_API = '31678159-88f5618da94fdea3c5da1a6bf';
export const getImage = async (searchValue, page) => {
  const response = await axios.get(
    `?q=${searchValue}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
