const axios = require('axios');

export default class UserStore {
  constructor({ apiUrl }) {
    this.apiUrl = apiUrl;
  }

  getUser = async ({ id }, { token }) => {
    const result = await axios({
      method: 'GET',
      baseURL: this.apiUrl,
      url: `/users/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  };

  getUsers = async ({ discord_id }, { token }) => {
    const result = await axios({
      method: 'GET',
      baseURL: this.apiUrl,
      url: `/users`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  };

  createUser = async ({ username, discord_id, password }, { token }) => {
    const result = await axios({
      method: 'POST',
      baseURL: this.apiUrl,
      url: `/users`,
      headers: { Authorization: `Bearer ${token}` },
      data: { username, discord_id, password },
    });
    return result.data;
  }
};
