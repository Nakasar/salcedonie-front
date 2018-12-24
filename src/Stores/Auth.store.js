const axios = require('axios');

export default class AuthStore {
    constructor({ apiUrl }) {
        this.apiUrl = apiUrl;
    }

    signIn = async ({ username, password }) => {
        const result = await axios({
            method: 'POST',
            baseURL: this.apiUrl,
            url: '/auth',
            data: { username, password }
        });
        return result.data;
    };
};
