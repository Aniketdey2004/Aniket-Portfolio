const axios = require('axios');
const U = () => process.env.GITHUB_USERNAME || 'Aniketdey2004';

exports.getProfile = async () => {
  const { data } = await axios.get(`https://api.github.com/users/${U()}`, { timeout: 15000 });
  return {
    username: data.login,
    name: data.name,
    avatar: data.avatar_url,
    bio: data.bio,
    publicRepos: data.public_repos,
    htmlUrl: data.html_url,
    createdAt: data.created_at,
  };
};

// jogruber proxy returns yearly contribution arrays without auth
exports.getContributions = async (year) => {
  const url = `https://github-contributions-api.jogruber.de/v4/${U()}?y=${year}`;
  const { data } = await axios.get(url, { timeout: 20000 });
  return data; // { total: {YYYY: n}, contributions: [{date, count, level}] }
};
