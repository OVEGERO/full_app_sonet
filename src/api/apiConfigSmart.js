const axios = require('axios');
require ('dotenv').config();

const apiSmartolt = axios.create({
    baseURL: process.env.SMARTOLT_API,
    headers: {
        'X-Token': process.env.SMARTOLT_TOKEN
    }
});

module.exports = apiSmartolt;