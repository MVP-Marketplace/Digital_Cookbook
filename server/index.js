const app = require('./app');
const port = process.env.NODE_ENV || 5000;
app.listen(port);
console.log(`Server listening to port ${port}`);