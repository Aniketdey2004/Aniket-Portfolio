require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { seedAll } = require('./src/utils/seed');

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  await seedAll();
  app.listen(PORT, () => console.log(`[server] listening on http://localhost:${PORT}`));
})();
