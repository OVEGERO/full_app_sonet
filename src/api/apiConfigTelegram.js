const axios = require('axios');
require ('dotenv').config();

const apiTelegram = axios.create({
    baseURL: `https://api.telegram.org/bot${process.env.TELEGRAM_API}`
});

module.exports = apiTelegram;