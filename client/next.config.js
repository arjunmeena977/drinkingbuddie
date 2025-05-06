// client/next.config.js
const path = require('path');

module.exports = {
  experimental: {
    appDir: true, // if using app/ directory
  },
  // Set the root directory
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  dir: path.resolve(__dirname, 'src'),
};
