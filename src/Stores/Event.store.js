const axios = require('axios');

export default class EventStore {
  constructor({ apiUrl }) {
    this.apiUrl = apiUrl;
  }

  getEvent = async ({ id }, { token }) => {
    const result = await axios({
      method: 'GET',
      baseURL: this.apiUrl,
      url: `/events/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  };

  getEvents = async (_params, { token }) => {
    const result = await axios({
      method: 'GET',
      baseURL: this.apiUrl,
      url: `/events`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  };

  createEvent = async ({ title, description, text, owner, active = true }, { token }) => {
    const result = await axios({
      method: 'POST',
      baseURL: this.apiUrl,
      url: `/events`,
      headers: { Authorization: `Bearer ${token}` },
      data: { title, description, text, owner, active },
    });
    return result.data;
  }
};
