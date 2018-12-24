const axios = require('axios');

export default class Store {
    signIn = async ({ username, password }) => {
        const result = await axios.post('http://localhost:5000/auth', { username, password });
        return result.data;
    };
};
