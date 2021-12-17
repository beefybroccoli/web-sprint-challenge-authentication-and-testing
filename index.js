const server = require('./api/server.js');
const { SERVER_PORT } = require("./env");

const PORT = process.env.PORT || SERVER_PORT;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
