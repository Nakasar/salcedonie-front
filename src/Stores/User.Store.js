const axios = require('axios');

export default class UserStore {
  constructor({ apiUrl }) {
    this.apiUrl = apiUrl;
  }

  getUser = async ({ id }, { token }) => {
    console.log(this.apiUrl);
    const result = await axios({
      method: 'GET',
      baseURL: this.apiUrl,
      url: `/users/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  };
};
