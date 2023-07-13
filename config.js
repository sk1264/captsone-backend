const DATABASE_URL = `mongodb+srv://sk1264:Balderdash1!@sei.uiuevhe.mongodb.net/?retryWrites=true&w=majority`

"use strict";

const PORT = process.env.PORT || 8080;

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET;


module.exports = {
  DATABASE_URL,
  PORT,
  JWT_KEY_SECRET,
};