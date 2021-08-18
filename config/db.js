const mongoose = require('mongoose')

// const DB_USER = 'mongodb://localhost:27017/ac-counter';
const DB_USER = process.env.MONGO_URI || 'mongodb://localhost:27017/ac-counter';

mongoose.connect(DB_USER,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
).then(() => console.log('Mongodb connected'))
 .catch((err) => console.log('Connection error:', err));