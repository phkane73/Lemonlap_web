const path = require('path');
const currentPath = __dirname;
const parentPath = path.resolve(currentPath, '../../..');
const config = {
  app: {
    port: process.env.PORT || 3000,
  },

  db: {
    uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Quanlybanhang",
  },

  secretString: {
    string: "thisismysecret",
  },

  JWT_KEY: "b2014568tranngocphuochoang",
  filepathadminpage: parentPath + "/Frontend/AdminPage/public/image/",
  filepathuserpage: parentPath + "/Frontend/UserPage/public/image/"
};
module.exports = config;
