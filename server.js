if(process.env.NODE_ENV !== 'production') require('dotenv').config();
const app = require('./server/app.js');
const port = process.env.NODE_ENV || 5000;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

