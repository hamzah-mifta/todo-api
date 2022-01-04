const config = require('./config/config');
const app = require('./app');

const port = config.port || 3030;

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
