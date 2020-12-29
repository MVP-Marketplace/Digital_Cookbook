const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
} catch (error) {
    console.log(error.toString());
}