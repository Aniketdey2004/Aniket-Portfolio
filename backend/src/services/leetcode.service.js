const axios = require('axios');
const BASE = 'https://alfa-leetcode-api.onrender.com';
const U = () => process.env.LEETCODE_USERNAME || 'Aniketdey004';

const client = axios.create({ baseURL: BASE, timeout: 20000 });

exports.getProfile        = async ()      => (await client.get(`/${U()}/profile`)).data;
exports.getCalendar       = async (year)  => (await client.get(`/${U()}/calendar`, { params: { year } })).data;
exports.getAllCalendar     = async ()      => (await client.get(`/${U()}/calendar`)).data; // no year = all-time
exports.getContestHistory = async ()      => (await client.get(`/${U()}/contest/history`)).data;