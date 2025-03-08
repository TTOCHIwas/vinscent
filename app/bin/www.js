const app = require("../app");
require('dotenv').config();

app.listen(process.env.PORT, (req, res) => {
  console.log(`express server running on port ${process.env.PORT}`)
})